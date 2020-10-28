import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar  一个进度条的插件
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie


NProgress.configure({ showSpinner: false }) // NProgress Configuration  是否有转圈效果

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/complextable' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name;
      console.log(hasGetUserInfo);
      if (hasGetUserInfo) {
        console.log("有用户信息");
        next();
      } else {
        console.log("无用户信息")
        try {
          // 获得用户信息
          await store.dispatch('user/getInfo');
          //实际是请求用户信息后返回，这里是模拟数据，直接从store中取
          const roles=store.getters.roles;
          store.dispatch('permission/GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            router.options.routes=store.getters.routers;
            next({ ...to, replace: true });// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })

          // next()
        } catch (error) {
          // 删除token，进入登录页面重新登录
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免费登录白名单，直接去
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})