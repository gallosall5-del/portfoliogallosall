# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```# 👋 Gallo SALL — Portfolio

> Étudiant en **Développement d'Applications Mobiles** au CFPT Sénégal-Japon  
> Passionné par Flutter, le développement mobile et les outils modernes du développeur.

---

## 🧑‍💻 À propos

| | |
|---|---|
| **Nom** | Gallo SALL |
| **Formation** | BTS — Développement d'Applications Mobiles |
| **École** | CFPT Sénégal-Japon (Centre de Formation Professionnelle et Technique) |
| **Année** | 2024 / 2025 |
| **Localisation** | Dakar, Sénégal |

---

## 🚀 Projets

### 📱 Teranga Food — App Flutter de livraison
> Application mobile Flutter de livraison de nourriture au Sénégal

- **Technologies :** Flutter, Dart, Firebase
- **Plateforme :** Android & iOS
- **Fonctionnalités :** Commande de repas, suivi en temps réel, interface utilisateur moderne
- **Dossier :** `StudioProjects/terangagescrim/`

---

### 🔐 GESCRIM — Gestion des accès utilisateurs
> Système de gestion des utilisateurs et des accès

- **Technologies :** Flutter, Dart
- **Fonctionnalités :** Gestion des rôles, authentification, contrôle des permissions
- **Dossier :** `StudioProjects/`

---

### 🌐 Projet Web Angular
> Application web développée avec Angular

- **Technologies :** Angular, TypeScript, HTML/CSS
- **Dossier :** `projet1/`

---

### 📅 Système de gestion des emplois du temps — CFPT
> Projet intégrateur BTS — Mise en place d'un système intelligent de gestion des emplois du temps

- **Technologies :** Flutter, Dart
- **Objectif :** Automatiser la planification, optimiser les ressources (salles, formateurs, matières)
- **Utilisateurs :** Administrateurs, Chefs de département, Formateurs, Apprenants

---

### 🗂️ App Flutter — Projet `gall`
> Application Flutter personnelle

- **Technologies :** Flutter ^3.11.5, Dart
- **Dossier :** `gall/`

---

## 🛠️ Compétences techniques

### Langages
![Dart](https://img.shields.io/badge/Dart-0175C2?style=flat&logo=dart&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Frameworks & Outils
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)
![Android Studio](https://img.shields.io/badge/Android_Studio-3DDC84?style=flat&logo=android-studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)

### Déploiement
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazon-aws&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat&logo=github-pages&logoColor=white)

### Modélisation & Documentation
- UML (Diagramme de cas d'utilisation, Diagramme de classes)
- Mermaid — diagrammes de flux et de séquence
- Documentation API REST
- Markdown / README

---

## 📚 Formation

**CFPT Sénégal-Japon**  
*BTS — Développement d'Applications Mobiles*  
2024 / 2025

**Modules étudiés :**
- Développement mobile Flutter
- Déploiement sur App Store iOS & Google Play (TestFlight, Firebase App Distribution)
- Documentation technique (Mermaid, API REST, GitHub Pages)
- Gestion de projet & modélisation UML
- Développement web (Angular, HTML/CSS)
- Bases de données & backend

---

## 📊 Diagramme de compétences

```
Flutter/Dart     ████████████████████  95%
Android Studio   ████████████████░░░░  80%
Angular          ████████████░░░░░░░░  60%
Firebase         ██████████████░░░░░░  70%
Git/GitHub       ████████████████░░░░  80%
UML              ████████████████░░░░  80%
```

---

## 📫 Contact

| | |
|---|---|
| **École** | CFPT Sénégal-Japon |
| **Site** | [www.cfptsj.sn](https://www.cfptsj.sn) |
| **Localisation** | Dakar, Sénégal |

---

<div align="center">

*Réalisé par **Gallo SALL** — CFPT Sénégal-Japon — BTS Développement d'Applications Mobiles — 2024/2025*

</div>
