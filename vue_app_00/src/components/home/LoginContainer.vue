<template>
    <div class="app-login">
       <h1>用户登录</h1>
       <form action="#">
          用户名：<input type="text" name="uname" v-model="unameval"/><br />
          密码：<input type="password" name="upwd" v-model="upwdval"/><br />
          <input type="button" id="btn" value="登录" @click="getButton"><br />
       </form>
    </div>
</template>

<script>
    import {Toast} from "mint-ui";
    export default {
        data(){
            return {
               unameval:"",
               upwdval:""
            }
        },
        methods:{
            getButton(){
               this.$http.get("login?uname="+this.unameval+"&upwd="+this.upwdval).then(result=>{
                   if(result.body.code==1){
                       Toast(result.body.msg)
                       this.$router.push("/");
                   }else{
                       Toast("用户名或密码错误");
                   }
               })
            }
        },
        created(){
        }
    }
</script>

<style>
    
</style>