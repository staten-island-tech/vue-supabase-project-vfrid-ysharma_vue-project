import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css'
import Card from 'primevue/card'

const app = createApp(App)
app.use(PrimeVue);
app.use(createPinia())
app.use(router)
app.component('Card',Card)
app.mount('#app')
