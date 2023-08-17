import { createSSRApp } from "vue";
import uviewPlus from 'uview-plus';
import 'virtual:uno.css'

import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(uviewPlus);

  uni.$u.setConfig({
    // 修改$u.config对象的属性
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: 'rpx'
    },
    // 修改$u.props对象的属性
    props: {
      // 组件属性配置
    }
  });
  return {
    app,
  };
}
