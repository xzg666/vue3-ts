import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import {setupStore} from '@/store'


import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import 'normalize.css'
import './assets/css/index.less'


import * as ElementPlusIconsVue from '@element-plus/icons-vue'




const app = createApp(App);

// 全局注册element-plus icon图标组件
Object.keys(ElementPlusIconsVue).forEach((key) => {
  app.component(key, ElementPlusIconsVue[key]);
})

//国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { globalRegister } from "./global";

app.use(ElementPlus, {
  locale: zhCn,
})


app.use(ElementPlus);
app.use(globalRegister)
app.use(store);
setupStore()
app.use(router);

app.mount("#app");


