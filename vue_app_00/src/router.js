import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"


//1.引入自定义组件
import TestContainer from "./components/testContainer.vue";
import ListContainer from "./components/listContainer.vue";
import HomeContainer from "./components/tabbar/HomeContainer.vue";
import newsListContainer from "./components/news/newsListContainer.vue";
import newsInfoContainer from "./components/news/newsInfoContainer.vue";
import ShopContainer from "./components/tabbar/ShopContainer";
import GoodList from "./components/goods/GoodList";
import GoodInfo from "./components/goods/GoodInfo";
import List from "./components/list/ListContainer";
import PhotoContainer from "./components/photo/PhotoContainer";
import LoginContainer from "./components/home/LoginContainer";
Vue.use(Router)
//2.配置访问自定义组件路径
export default new Router({
  routes: [
    {path:'/',redirect:"/home"},
    {path:'/test',component:TestContainer},
    {path:'/list',component:ListContainer},
    {path:'/home',component:HomeContainer},
    {path:'/home/newslist',component:newsListContainer},
    {path:'/home/newsInfo',component:newsInfoContainer},
    {path:'/shop',component:ShopContainer},
    {path:'/home/goodslist',component:GoodList},
    {path:'/home/goodsinfo',component:GoodInfo},
    {path:'/home/list',component:List},
    {path:'/home/photo',component:PhotoContainer},
    {path:"/home/login",component:LoginContainer}
  ]
})
