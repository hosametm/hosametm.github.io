import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { vReveal, vSpotlight } from './directives.js'

const app = createApp(App)
app.directive('reveal', vReveal)
app.directive('spotlight', vSpotlight)
app.mount('#app')
