# Invicti Appsec Indicator

[![Node](https://img.shields.io/badge/Node->=14.18-green)](https://nodejs.org/docs/v14.18.0/)

---

### Prerequisites

- [Node](https://nodejs.org/en/download/) v14.18+ installed
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) Extension added to VS Code.
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) Extension added to VS Code.
- This project uses Handlebars [partials](https://handlebarsjs.com/guide/partials.html#partials) and [partials context](https://handlebarsjs.com/guide/partials.html#partial-contexts) with Vite for html templating.
- Clamping tool for more fluid typography and sizing: https://utopia.fyi/type/calculator/

---

### Getting Started

1. Clone this repository to your local.
2. In the root directory, run `yarn install` to install required dependencies.
3. In the root directory, run `yarn dev` to begin compiling SCSS/JS on file changes.
3. To build site for production deployment run `yarn build` in the root directory.

---

### Project Folder Structure
```
invicti-appsec-2023/ # → Root of project
├── dist/ # → Built assets. Not tracked in git.
├── src/
│ ├── js # → Contains JS files for project
│ ├── partials/
│   ├── part # → Handlebars partials that are repeated design elements
│   ├── section # → Handlebars partials that contain each block
│   └── svg # → Handlebars partials that are repeated SVGs to minimize markup
│ ├── public # → Static images and fonts
│ └── scss # → Contains SCSS files for project
└── index.html # → Contains base project markup outside of sections
```
