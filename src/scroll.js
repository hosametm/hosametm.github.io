// Shared scroll progress (0..1). Written by App.vue on scroll and read every
// frame by the WebGL scene, so it is a plain object rather than a reactive ref.
export const scrollState = { p: 0 }
