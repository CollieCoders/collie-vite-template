// Collie config for Vite.
// Templates are compiled in-memory by @collie-lang/vite.
export default {
  "css": {
    "strategy": "global",
    "diagnostics": {
      "unknownClass": "warn"
    }
  },
  "projects": [
    {
      "type": "react-vite",
      "input": "src/**/*.collie"
    }
  ]
};
