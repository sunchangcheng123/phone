<template>
    <div class="app-comment">
        <h1>评论子组件</h1>
        <hr />
        <!--发表评论区域-->
        <textarea placeholder="请吐槽最多120个字" maxlength="120" v-model="msg">
        </textarea>
        <mt-button size="large" @click="postComment">发表评论</mt-button>
        <!--显示评论的区域-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in list" :key="item.id">
                <div class="cmt-info">第{{i+1}}楼 用户:{{item.user_name}}  发表时间:{{item.ctime | datetimeFilter}}</div>
                <div class="cmt-body">{{item.content}}</div>
            </div>
        </div>
        <mt-button size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    //单独引入Toast组件
    import {Toast} from "mint-ui"
    export default {
        data(){
            return {
               msg:"",   //双向绑定用户评论
               pageIndex:0,
               pageSize:5,
               list:[],
            }
        },
        methods:{
            getMore(){
                this.pageIndex++;
                var p=this.pageIndex;
                var s=this.pageSize;
                var id=this.id;
                var url="getComment";
                //console.log(p+":"+s+":"+id);
                var url="getComment?id="+id+"&pno="+p+"&pageSize="+s;
                this.$http.get(url).then(result=>{
                    this.list=this.list.concat(result.body.data);
                    //console.log(result.body.data);
                })
            },
            postComment(){
                //1.获取新闻编号
                var nid=this.id;
                //2.获取评论内容
                var pmsg=this.msg;
                //3.判断新闻评论内容不能为空
                if(pmsg.trim().length==0){
                    Toast("评论内容不能为空！")
                    return;
                }
                //4.发送post请求
                var url="http://127.0.0.1:3000/postcomment";
                this.$http.post(url,{nid:nid,msg:pmsg}).then(result=>{
                    //console.log(result);
                    //5.获取服务器程序返回
                    //6.提示用户 "评论成功"
                    Toast("发表成功");
                    this.pageIndex = 0;
                    this.list = [];
                    this.getMore();
                });
            }
        },
        created(){
           this.getMore();
        },
        props:["id"]
    }
</script>

<style>
    .app-comment h1{
        font-size:18px;
    }
    .app-comment textarea{
        font-size:14px;
        height:85px;
        margin:0;
    }
    .app-comment .cmt-list{
        margin:5px 0;
    }
    .app-comment .cmt-list .cmt-info{
        line-height:30px;
        background:#ccc;
    }
    .app-comment .cmt-list .cmt-body{
        line-height:35px;
        text-indent:2em;  
    }
</style>