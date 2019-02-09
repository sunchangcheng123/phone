<template>
    <div class="app-shop">
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swiper-box :list="imglist"></swiper-box>
					</div>
				</div>
		</div>
        <div class="mui-card">
			<div class="mui-card-header">商品列表</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                            <li class="mui-table-view-cell mui-media" v-for="item in cartlist" :key="item.id">
                                <a href="javascript:;">
                                    <img class="mui-media-object mui-pull-left" src="">
                                    <div class="mui-media-body">
                                        {{item.title}}
                                        <p class='mui-ellipsis'>
                                            <span class="price">￥{{item.price}}</span>
                                            <span class="button">
                                                <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                                                        <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub(item.id)">-</button>
                                                        <input id="test" class="mui-input-numbox" type="number" :value="item.count" />
                                                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd(item.id)">+</button>
                                                </div>
                                            </span>
                                        </p>
                                    </div>
                                </a>
                            </li>
                    </ul>
				</div>
			</div>
			<div class="mui-card-footer">小计：￥{{getSubTotal}}</div>
		</div>
    </div>
</template>

<script>
     import swiper from "../sub/swiper.vue";
     export default {
         data(){
             return {
                 imglist:[],
                 info:{},
                 cartlist:[]
             }
         },
         methods:{
                getGoodInfo(){
                   this.$http.get("goodsinfo").then(result=>{
                      this.info=result.body;
                      console.log(result.body);
                    })
                },
                goodAdd(id){
                    for(var item of this.cartlist){
                        if(item.id==id){
                            item.count++;
                            break;
                        }
                    }
                },
                goodSub(id){
                    for(var item of this.cartlist){
                        if(item.id==id && item.count>1){
                            item.count--;
                            break;
                        }
                    }
                },
                getImage(){
                    //var url="http://127.0.0.1:3000/imagelist";
                    this.$http.get("imagelist").then(result=>{
                        //console.log(result.body);
                        this.imglist=result.body;
                  })
                },
                getShop(){
                    this.$http.get("shopCart").then(result=>{
                        this.cartlist=result.body;
                        //console.log(this.cartlist);
                    })
                }
         },
         created(){
             //console.log(this.$route.query.id);
             //console.log(this.$route.params.id);
             this.getImage();
             this.getGoodInfo();
             this.getShop();
         },
         computed:{
            getSubTotal(){
                var sum=0;
                for(var item of this.cartlist){
                   sum+=item.price*item.count;
                }
                return sum;
            }
         },
         components:{
            "swiper-box":swiper
         }
     }
</script>

<style>
    .app-shop .mui-ellipsis{
        display:flex;
        justify-content:space-between;
    }
</style>