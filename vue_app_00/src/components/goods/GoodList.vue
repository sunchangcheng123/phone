<template>
    <div class="app-goodslist">
        <div class="goods-item" v-for="item in list" :key="item.id">
           <img :src="item.img_url" @click="jumpShop(item.id)"/>
           <h3 class="title">{{item.title}}</h3>
           <div class="info">
                <p class="price">
                   <span class="now">￥{{item.p_now}}</span>
                   <span class="old">￥{{item.p_old}}</span>
                </p>
                <p class="sell">
                   <span>热卖中</span>
                   <span>剩 {{item.sell}} 件</span>
                </p>
           </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return  {
                list:[]
            }
        },
        methods:{
            jumpShop(id){
                this.$router.push("/home/goodsinfo?id="+id)
            },
            getGoodslist(){
                this.$http.get("list").then(result=>{
                    this.list=result.body;
                    //console.log(result.body);
                })
            }
        },
        created(){
            this.getGoodslist();
        }
    }
</script>

<style>
    .app-goodslist{
        display:flex;
        flex-wrap:wrap;
        justify-content:space-between;
        padding:7px;
    }
    .app-goodslist .goods-item{
        width:49%;
        border:1px solid #ccc;
        box-shadow:0 0 8px #ccc;
        margin:4px 0;
        padding:2px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        min-height:293px;
    }
    .app-goodslist .goods-item img{
        width:100%;
    }
    .app-goodslist .goods-item .title{
        font-size:14px;
    }
    .app-goodslist .goods-item .info{
        background-color:#eee;
    }
    .app-goodslist .goods-item .info p{
         margin:0;
         padding:5px; 
    }
    .app-goodslist .goods-item .info .price .now{
         color:red;
         font-weight:bold;
         font-size:16px;
    }
    .app-goodslist .goods-item .info .price .old{
        text-decoration:line-through;
        font-size:12px;
    }  
    .app-goodslist .goods-item .info .sell{
        display:flex;
        font-size:12px;
        justify-content:space-between;
    }
</style>