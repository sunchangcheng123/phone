<template>
    <div class="app-HomeContainer">
            <mt-header fixed title="学子商城"></mt-header>
            <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in list" :key="item.id">  
                        <img :src="item.img_url">                    
                    </mt-swipe-item>
            </mt-swipe>
            <!--<mt-swipe :auto="2000">
                    <mt-swipe-item v-for="item in list">  
                        <img :src="item.img_url">                    
                    </mt-swipe-item>
            </mt-swipe> -->
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                        <img src="../../img/menu1.png" />
                        <div class="mui-media-body">新闻资讯</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <img src="../../img/menu2.png" />
                        <div class="mui-media-body">点餐</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <!--<a @click.stop.prevent="jumpShop()">-->
                        <router-link to="/home/goodslist">
                            <img src="../../img/menu3.png" />
                            <div class="mui-media-body">商品</div>
                        </router-link>
                    <!--</a>-->
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photo">
                        <img src="../../img/menu4.png" />
                        <div class="mui-media-body">图片列表</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <img src="../../img/menu5.png" />
                        <div class="mui-media-body">成功</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/list">
                        <img src="../../img/menu6.png" />
                        <div class="mui-media-body">列表</div></router-link></li>
            </ul>  
    </div>   
</template>

<script>
    export default {
        data(){
            return {  
               list:[]           
            }
        },
        methods:{
            jumpShop(){
                //this.$router.push("/home/shop?id=15")
                this.$router.push("/home/shop/19")
            },
            getImage(){
                var url="http://127.0.0.1:3000/imagelist";
                this.$http.get(url).then(result=>{
                    //console.log(result.body);
                    this.list=result.body;
                })
            }
        },
        created(){
             this.getImage();
        }
       /*data(){
            return {
                list:{}
            }
        },
        mounted(){
            this.axios.get("http://127.0.0.1:3000/index/image")
            .then((res)=>{
                this.list=res.data;
                console.log(res.data);
            })
        }*/
    }
</script>

<style>
     .app-HomeContainer .mint-swipe{
         height:150px;
     }
     .app-HomeContainer .mint-swipe img{
         width:100%;
     }

     .app-HomeContainer .mui-grid-view.mui-grid-9{
         background:#fff;
         border:0;
     }
     .app-HomeContainer .mui-grid-view.mui-grid-9 img{
         width:60px;
         height:60px;
     }
     .app-HomeContainer .mui-grid-view.mui-grid-9 .mui-media-body{
         font-size:13px !important;
     }
</style>