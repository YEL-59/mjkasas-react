# React Project Structure

This is a modern React project powered by Vite and integrated with several essential libraries and tools to support scalable frontend development.

## 🔧 Tech Stack

- **React 19**
- **Vite** – Fast dev/build tool
- **Tailwind CSS** – Utility-first CSS framework
- **ShadCN UI** – Component library based on Radix UI
- **TanStack React Query** – Powerful async state management
- **React Router v7** – Client-side routing
- **AOS** – Animate on scroll library
- **Lucide Icons** – Icon library
- **React Hot Toast** – Toast notifications
- **ESLint** – Linting for clean code

---

## 📁 Project Structure

```
.
├── public/               # Static assets
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable components
│   ├── layout/           # Layout components (headers, sidebars)
│   ├── lib/              # Utility functions, API clients
│   ├── pages/            # Route-level pages
│   ├── routes/           # App routes config
│   ├── shared/           # Shared UI like buttons, inputs
│   ├── App.css           # Global styles
│   ├── index.css         # Tailwind base + custom styles
│   └── main.jsx          # App entry point
├── components.json       # ShadCN configuration
├── vite.config.js        # Vite configuration
├── eslint.config.js      # Linting rules
├── jsconfig.json         # Path aliases and IntelliSense support
├── index.html            # Main HTML entry
└── package.json          # Dependencies and scripts
```

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Run Dev Server

```bash
npm run dev
```

---

### 3. Build for Production

```bash
npm run build
```

---

### 4. Preview Production Build

```bash
npm run preview
```
