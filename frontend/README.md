# Frontend

React 19 + Vite SPA. Architecture and run instructions are in the
[root README](../README.md).

Quick reference:

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc + vite build
npm run lint
```

Layer rules (FSD):

```
app → pages → widgets → features → entities → shared
```

Each layer can only import from the layers to its right.
