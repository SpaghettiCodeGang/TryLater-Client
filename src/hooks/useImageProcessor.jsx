import { useCallback } from 'react';

const useImageProcessor = ({ targetWidth, targetHeight }) => {
    const processImage = useCallback((file, cropData = null) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext('2d');

                    if (!ctx) return reject('Canvas context fehlt');

                    if (cropData) {
                        ctx.drawImage(
                            img,
                            cropData.x,
                            cropData.y,
                            cropData.width,
                            cropData.height,
                            0,
                            0,
                            targetWidth,
                            targetHeight
                        );
                    } else {
                        const side = Math.min(img.width, img.height);
                        const sx = (img.width - side) / 2;
                        const sy = (img.height - side) / 2;
                        ctx.drawImage(
                            img,
                            sx,
                            sy,
                            side,
                            side,
                            0,
                            0,
                            targetWidth,
                            targetHeight
                        );
                    }

                    canvas.toBlob((blob) => {
                        if (!blob) return reject('Fehler beim Erstellen des Bildes');

                        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
                        resolve(file);
                    }, 'image/jpeg');
                };

                img.onerror = () => reject('Bild konnte nicht geladen werden');
                img.src = reader.result.toString();
            };

            reader.onerror = () => reject('Datei konnte nicht gelesen werden');
            reader.readAsDataURL(file);
        });
    }, [targetWidth, targetHeight]);

    return { processImage };
}

export default useImageProcessor;