<template>
    <div class="app-newsinfo">
        <h3>{{newsdetails.title}}</h3>
        <div>{{newsdetails.content}}</div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
    import comment from "../sub/comment.vue";
    export default {
        data(){
            return {
               newsdetails:{},
               id:this.$route.query.id
            }
        },
        methods:{
            details(){
                var url="http://127.0.0.1:3000/newsinfo"
                this.$http.get(url).then(result=>{
                    this.newsdetails=result.body;
                })
            }
            //console.log(this.$route.query.id);
        },
        created(){
            this.details();
        },
        components:{
            "comment-box":comment
        }
    }
</script>

<style>
    
</style>