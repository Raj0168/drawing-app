**Drawing App README**

---

## Overview

A simple React + TypeScript drawing app built with Vite and Yarn.
Draw rectangles, circles, and lines.
Select shapes to change stroke color, fill, line width, and style.
Drag shapes around.
Save and load your drawing from localStorage.

## Setup

```bash

git clone https://github.com/Raj0168/drawing-app
cd my-drawing-app

# Install dependencies
yarn
```

---

## Available Scripts

- **`yarn dev`**
  Starts the development server at `http://localhost:5173`

- **`yarn build`**
  Builds an optimized production bundle into `dist/`

- **`yarn preview`**
  Serves the production build locally

## How to Use

1. **Select a tool** (rectangle, circle, or line) in the toolbar.
2. **Click on the canvas** to place a shape. The new shape is auto‑selected.
3. **Edit properties** in the sidebar (colors, width, style).
4. **Drag shapes** by clicking and holding on them, then moving your mouse.
5. **Delete a shape** by clicking “Delete Shape” in the sidebar.
6. **Save** your work with the “Save” button; reload with the “Load” button.
