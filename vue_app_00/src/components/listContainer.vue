<template> 
    <div class="app-listContainer">
        <h1>用户列表</h1>
        <ul>
             <li  v-for="item in list">{{item.id}}:{{item.name}}:{{item.age}}</li>
        </ul>
    </div>
</template> 

<script>
    export default {
       data(){
           return  {
               list:[
                   {id:1,name:"dongdong",age:24},
                   {id:1,name:"weihua",age:21}
               ]
           }
       } 
    }
</script>

<style>
    .app-listContainer>ul{
        list-style:none;
    }
</style>