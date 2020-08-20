
// 一个 简单的 登录鉴权

const { default: router } = require("./router");

router.beforeEach((to, from, next) => {
    // console.log(to, from)
    if( to.path!== '/login' ){
        if (sessionStorage.getItem("token")) {
            next()
        } else {
            next("/login")
        }
    } else {
        next();
    }
})