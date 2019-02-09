<template>
    <div class="app-goodsinfo">
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swiper-box :list="imglist"></swiper-box>
					</div>
				</div>
		</div>

        <div class="mui-card">
			<div class="mui-card-header">{{info.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p class="price">
                            市场价：<del>￥{{info.old}}</del>
                            销售价：<span class="now">￥{{info.now}}</span>
                        </p>
                        <p>
                            购买数量：
                        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="goodSub">-</button>
                            <input id="test" class="mui-input-numbox" type="number" value="1" v-model="val"/>
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="goodAdd">+</button>
                        </div>
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button> 
                            <mt-button type="danger" size="small" @click="addCartTo">加入购物车</mt-button> 
                        </p>
					</div>
				</div>
			<div class="mui-card-footer"></div>
		</div>

        <div class="mui-card">
			<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>商品货号:{{info.pid}}</p>
                        <p>商品颜色:山里红</p>
                        <p>商品运费:0</p>
					</div>
				</div>
			<div class="mui-card-footer"></div>
		</div>
    </div>
</template>

<script>
    import swiper from "../sub/swiper.vue";
    import {Toast} from "mint-ui";
    export default {
        data(){
            return  {
                imglist:[],
                val:1,
                info:{}           
            }
        },
        methods:{
            addCartTo(){
                //console.log("添加购物车");
                var id=this.$route.query.id;
                var val=this.val;
                this.$http.get("addCart?pid="+id+"&count="+val).then(result=>{
                    if(result.body.code==1){
                      this.$store.commit("increment",val);
                        Toast(result.body.msg);
                    }else{
                        Toast(result.body.msg);
                    }
                })
            },
            getGoodInfo(){
                var id=this.$route.query.id;
                this.$http.get("goodsinfo?id="+id).then(result=>{
                    this.info=result.body;
                    console.log(result.body);
                })
            },
            goodAdd(){
                if(this.val<=998)
                this.val++;
            },
            goodSub(){
                if(this.val>1)
                this.val--;
            },
            getImage(){
                //var url="http://127.0.0.1:3000/imagelist";
                this.$http.get("imagelist").then(result=>{
                    //console.log(result.body);
                    this.imglist=result.body;
                })
            }
        },
        created(){
           //console.log(this.$route.query.id);      
            this.getImage();
            this.getGoodInfo();
        },
        components:{
            "swiper-box":swiper
        }
    }
</script>

<style>
    
</style>