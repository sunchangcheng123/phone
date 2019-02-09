<template>
    <div class="app-photo">
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<ul class="photo-list">
                           <li v-for="item in imglist">
                              <img v-lazy="item.img_url">
                           </li>
                        </ul>
					</div>
				</div>
		</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
               imglist:{}
            }
        },
        methods:{
            getImage(){
                 //var url="http://127.0.0.1:3000/imagelist";
                 this.$http.get("imagelist").then(result=>{
                 //console.log(result.body);
                 this.imglist=result.body;
               })
            }
        },
        created(){
          this.getImage()
        }
    }
</script>

<style>
    .photo-list{
        list-style:none;
        background:#333;
        padding-left:0;
    }
    .photo-list li img{
        width:100%;
    }
    .photo-list li img[lazy=loading]{
        width:100%;
        height:100px;
        margin:auto;
    }
</style>