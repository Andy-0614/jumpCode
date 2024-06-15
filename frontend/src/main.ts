import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
const app = createApp(App);
//
export const lang_text = {
  en: {
    Edit: "Edit",
  },
  zh_tw: {
    Edit: "編輯",
  },
};
export const lang_lists = ["cpp", "py", "c", "js", "ino"];
//
app.config.globalProperties.$langText = lang_text;
app.mount("#app");
