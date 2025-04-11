# IMPORTANT NOTE FOR DEPLOY IT ON SERVER RUN COMMAND ON SERVER :- npm run deploy

# 🚀 React + TypeScript + Vite + Tailwind CSS Boilerplate

This is a high-performance boilerplate setup using:

- ⚛️ React 18
- 🧠 TypeScript
- ⚡️ Vite
- 🎨 Tailwind CSS
- 🌐 Redux + Redux Persist
- 🛡️ ESLint + CircleCI + Encryption
- 🔧 Utility files for build automation
- 📱 PWA Support

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone <repo-url>
cd <project-directory>
```

### 2. Ensure Node.js ≥ 18 is Installed

You can verify your version with:

```bash
node -v
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## 🧹 Project Structure & Features

### 📂 Routing
- `src/RouteTree.tsx`: Centralized route definitions with authentication checks.

### 🧠 State Management
- Global state with `Redux Toolkit` + `Redux Persist` (stored **securely with encryption**).
- Lightweight context API usage for small state cases.
- `Reselect` used for efficient memoized selectors to avoid unnecessary re-renders.

### 📋 Forms
- Built with `react-hook-form` for performant form handling and validation.

### 🍞 Cookies
- `js-cookie` is used for handling browser cookies.

### ⚙️ Build & Deploy
- `runserver.tsx`: Runs the production build on a local server.
- `BuildScript.tsx`: Utility for enhanced build handling and backups.

### 🔐 Security
- Encrypted Redux Persist state using a `secretKey` stored inside `src/Redux/ConfigureStore.tsx`.

### 🔮 ESLint Configuration
- ESLint is configured for clean code, including warnings for unused variables.
- Supports advanced type-aware linting via `typescript-eslint`.

### 🌍 Environment Variables
- Environment configurations managed inside `src/Global/Environment/Environment.tsx`
- `.env` support included with a sample config.

### 📱 PWA Support
- Vite PWA plugin integrated to make your app installable like a native app.

### 🔄 Continuous Integration
- **CircleCI** setup is included at `/.circleci/config.yml` for automated deployments and CI pipelines.

---

## 🧪 ESLint: TypeScript-Aware Setup

To enable type-aware rules for production-grade applications, configure like this:

```ts
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

### Suggested Upgrades

- Replace `tseslint.configs.recommended` with:
  - `tseslint.configs.recommendedTypeChecked` or
  - `tseslint.configs.strictTypeChecked`
- Optionally add: `...tseslint.configs.stylisticTypeChecked`

### React-Specific Linting

```ts
import react from 'eslint-plugin-react';

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

---

## 💡 Plugins Used

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) – Babel-based HMR
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) – SWC-based HMR (alternative)
- [react-hook-form](https://react-hook-form.com/)
- [redux-toolkit](https://redux-toolkit.js.org/)
- [js-cookie](https://github.com/js-cookie/js-cookie)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)

---

## ✍️ Contribution

Feel free to fork this repo, make changes, and raise a pull request.

---

## 📄 License

MIT License – free to use and customize.

---
 

