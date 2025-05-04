# TryLater-Clientanwendung
Die **TryLater-Clientanwendung** stellt das Userinterface der TryLater-App bereit.

---

## 🔗 Project-Links
- **[Project-Wiki](https://github.com/SpaghettiCodeGang/TryLater-Server/wiki)**
- **[Project-Board](https://github.com/orgs/SpaghettiCodeGang/projects/1)**
- **[Figma-Design](https://www.figma.com/design/iyOAVOSewnzKnI8AFwVOEF/TryLater-App?node-id=0-1&p=f&t=LpERV3a0oO4hfuo2-0)**

---

## 🧰 Voraussetzungen

- Docker (empfohlen)
- Node.js (nur wenn **ohne Docker** gearbeitet wird)
> Empfohlene Version: **Node 22+**

---

## ⚙️ Setup
- Projekt clonen
> 💡 **Hinweis:** Die Ausführung mit Docker wird empfohlen, um sicherzustellen, dass alle Entwickler mit der gleichen Node-Version und Umgebung arbeiten.  
> Docker muss dazu installiert und gestartet sein:
>
> - **Linux:** Docker einfach über den Paketmanager installieren (`apt`, `pacman`, `dnf`, etc.)
> - **macOS & Windows:** [Docker Desktop](https://www.docker.com/products/docker-desktop/) installieren und vor dem Start des Projekts öffnen
### Variante 1: Mit Docker (empfohlen)
```bash
# Docker starten (Container im Hintergrund ausführen)
docker-compose up -d
# In den Container wechseln
docker exec -it -w /app trylater-client-app-1 /bin/sh
# NPM Pakete installieren
npm install
# Vite starten
npm run dev
```

### Variante 2: Ohne Docker
```bash
# NPM Pakete installieren
npm install
# Vite starten
npm run dev
```

---

## 🛠️ Entwicklung
- Den aktuellen `main`-Branch pullen
- Einen neuen `feature`-Branch aus `main` erstellen
- Implementieren, testen, committen
- Regelmäßig pushen
- ✅ Pull Request stellen, wenn fertig
- 🧃 Spaß haben (stay hydrated 😉)

---

## 🛢️ Datenbank (lokal)
- http://localhost:8080/h2-console
> 💡 **Hinweis:** Die Datenbank ist in die TryLater-Serveranwendung (Backend) integriert.  
> Um auf die H2-Konsole zugreifen zu können, muss das Backend gestartet sein.

---

## 🌐 API-Anbindung

Die Client-Anwendung kommuniziert über `/api/...` mit dem Backend.
Eine vollständige Übersicht aller verfügbaren Routen, Parameter und Datenformate befindet sich im [TryLater-Server Wiki](https://github.com/SpaghettiCodeGang/TryLater-Server/wiki).
