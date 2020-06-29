// import Vue from 'Vue'
import App from './App'
import router from './router';
import store from './store';
import pager from "./plugins/pager"   
pager.subscribe(v => {                     // 在主应用注册呼机监听器，这里可以监听到其他应用的广播
  console.log(`监听到子应用${v.from}发来消息：`, v)
  store.dispatch('app/setToken', v.token)  // 这里处理主应用监听到改变后的逻辑
})

// 导入qiankun内置函数
import {
  registerMicroApps, // 注册子应用
  runAfterFirstMounted, // 第一个子应用装载完毕
  setDefaultMountApp, // 设置默认装载子应用
  start // 启动
} from "qiankun";

let app = null;
/**
 * 渲染函数
 * appContent 子应用html
 * loading 如果主应用设置loading效果，可不要
 */
function render ({ appContent, loading } = {}) {
  if (!app) {
    // eslint-disable-next-line no-undef
    app = new Vue({
      el: "#container",
      router,
      store,
      data () {
        return {
          content: appContent,
          loading
        };
      },
      render (h) {
        return h(App, {
          props: {
            content: this.content,
            loading: this.loading
          }
        });
      }
    });
  } else {
    app.content = appContent;
    app.loading = loading;
  }
}

/**
* 路由监听
* @param {*} routerPrefix 前缀
*/
function genActiveRule (routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

// 调用渲染主应用
render();

// 定义传入子应用的数据
let msg = {
  data: store.getters,                     // 从主应用仓库读出的数据
    // components: LibraryUi,                   // 从主应用读出的组件库
    // utils: LibraryJs,                        // 从主应用读出的工具类库
    // emitFnc: childEmit,                      // 从主应用下发emit函数来收集子应用反馈
  pager                                    // 从主应用下发应用间通信呼机
}

// 注册子应用
registerMicroApps(
  [
    {
      name: "vue-aaa",
      entry: "//localhost:7771",
      render,
      activeRule: genActiveRule("/aaa"),
      props: msg // 将定义好的数据传递给子应用
    },
    // {
    //   name: "vue-bbb",
    //   entry: "//localhost:7772",
    //   render,
    //   activeRule: genActiveRule("/bbb")
    // },
  ],
  {
    beforeLoad: [
      app => {
        console.log("before load", app);
      }
    ], // 挂载前回调
    beforeMount: [
      app => {
        console.log("before mount", app);
      }
    ], // 挂载后回调
    afterUnmount: [
      app => {
        console.log("after unload", app);
      }
    ] // 卸载后回调
  }
)

// 设置默认子应用,参数与注册子应用时genActiveRule("/aaa")函数内的参数一致
setDefaultMountApp("/aaa");

// 第一个子应用加载完毕回调
runAfterFirstMounted(() => { });

// 启动微服务
start();
