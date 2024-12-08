import { useToastStore } from '../stores/toastStore';
import { App } from 'vue'

export default {
  install(app: App) {
    const toastStore = useToastStore();

    app.config.globalProperties.$toast = {
      show(message: { message: string, icon: string }) {
        toastStore.showToast(message);
      },
    }
  }
}