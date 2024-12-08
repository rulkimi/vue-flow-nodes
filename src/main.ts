import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routers'
import { createPinia } from 'pinia'
import toast from './plugins/toast';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(far)
library.add(fas)

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(toast);

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
