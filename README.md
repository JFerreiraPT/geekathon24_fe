# Install

```bash
npm install
```

# Run

```bash
npm run dev
```

# Instructions

1. Add Input Boxes: Click the plus button in the toolbar to add input boxes to the board.
2. Add Actions: Click the plus button in the toolbar to add actions to the board.
3. Link Inputs to Actions:
   3.1. Double-click an input box, then double-click the action box you want to link it to.
   3.2 When an input box is selected, it cannot be moved, and a red border will appear around it.
4. Run an Action: Click the run button on an action box to dispatch the action. Wait for the output box to appear.
5. Link Actions to Other Actions: You can link one action box to another. However, the run button must be clicked on the parent action box first.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
