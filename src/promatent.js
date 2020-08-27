
// 一个 简单的 登录鉴权

const { default: router } = require("./router");

router.beforeEach((to, from, next) => {
    var userInfo = window.localStorage.getItem('token');//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页咯
        next();
    } else {
        if(to.path=='/login'){ //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
        }
    }
    if (to.meta.title) {
        document.title = to.meta.title;
    }
})