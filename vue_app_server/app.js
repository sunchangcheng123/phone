//app.js
//1:加载模块
const express = require("express");
const pool  = require("./pool");
//2:创建express对象
var app = express();
//服务器node.js 允许跨域访问配置项
//2.1:引入跨域模块   
const cors = require("cors");
//2.2:配置允许哪个程序跨域访问 脚手架   11:16
app.use(cors({
  origin:[
    "http://127.0.0.1:3001","http://localhost:3001"],
  credentials:true
}))

//3:指定静态目录
//服务器指定目录 绝对路径 出错
app.use(express.static(__dirname+"/public"));

//4:绑定监听端口
app.listen(3000);
//功能一:学子商城首页图片轮播
//GET /imagelist   json
app.get("/imagelist",(req,res)=>{
  var obj = [
 {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
 {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
 {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
 {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"},
];
  res.send(obj)
});


//分页显示:新闻分页
app.get("/newslist",(req,res)=>{
  //1:参数  当前页码  页大小(一页显示几行数据)
  var pno = req.query.pno;            //2
  var pageSize = req.query.pageSize;  //5
  //2:sql
  //2.1:查找总记录数->转换总页数  15->3
  var sql = "SELECT count(id) as c FROM xz_news";


  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度
  pool.query(sql,(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,title,img_url,ctime,point";
     sql += " FROM xz_news";
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  })
  //3:结果格式
  //res.send({code:"ok"})
});


app.get("/newsinfo",(req,res)=>{
   var obj={
     title:"北京房价下降，白菜价",
     content:"16万/平  快快买啊！！！！"
   };
   res.send(obj);
});


const qs=require("querystring");
app.post("/postcomment",(req,res)=>{
    //为req对象绑定事件data客户数据发送成功
    //触发事件
    req.on("data",(buf)=>{
      var str=buf.toString();
      var obj=JSON.parse(str);
      var msg=obj.msg;
      var nid=parseInt(obj.nid);
      var sql="INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES(?,'匿名',now(),?)";
      pool.query(sql,[msg,nid],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:"添加成功"});
      })
    })
})

app.get("/getComment",(req,res)=>{
  var nid=parseInt(req.query.id); 
  var pno = req.query.pno;          
  var pageSize = req.query.pageSize; 
 
  var sql = " SELECT count(id) as c FROM xz_comment";
      sql +=" WHERE nid=?";
  var obj = {};      
  var progress = 0;  
  pool.query(sql,[nid],(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,content,ctime,user_name";
     sql += " FROM xz_comment";
     sql += " WHERE nid = ?";
     sql += " ORDER BY id DESC";
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  }) 
});


app.get("/list",(req,res)=>{
  var obj=[
      {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png",title:"魅族6",p_old:"3000.00",p_now:"2100.00",sell:1},
      {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png",title:"360 N7",
      p_old:"1100.00",p_now:"333.00",sell:1},
      {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png",title:"小米",
      p_old:"2100.00",p_now:"1333.00",sell:1},
      {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png",title:"Iphone",
      p_old:"8100.00",p_now:"5533.00",sell:2}
  ];
  res.send(obj);
})


app.get("/goodsinfo",(req,res)=>{
   var id=req.query.id;
   var obj={id:id,title:"华为2000",now:9999,old:88888,pid:"9527"};
   res.send(obj);
})


app.get("/shopCart",(req,res)=>{
  var obj=[];
  obj.push({id:1,title:"华为p10",price:3999,count:2})
  obj.push({id:2,title:"华为p11",price:4999,count:1})
  obj.push({id:3,title:"华为p12",price:5999,count:1})
  res.send(obj);
})


app.get("/addCart",(req,res)=>{
    var pid=req.query.pid;
    var count=req.query.count;
    var reg=/^[0-9]{1,}$/;
    if(!reg.test(pid)){
      res.send({code:-1,msg:"参数有误"});
      return;
    }

    if(!reg.test(count)){
      res.send({code:-2,msg:"商品信息参数有误"});
      return;
    }

    res.send({code:1,msg:"添加成功"});
})

app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd=req.query.upwd;

  var sql=" SELECT count(id) as c FROM xz_user1";
      sql+=" WHERE uname=? AND upwd = md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err
    if(result[0].c==0){
      res.send({code:-1,msg:"登录失败"});
    }else{
      res.send({code:1,msg:"登陆成功"});
    }
  })
})

app.get("/test01",(req,res)=>{
  var id=req.query.id;
  var age=req.query.age;
  res.send(id+1+age);
})

app.get("/newslist2",(req,res)=>{
  var obj=[
      {id:1,ctime:"2018-10-2",img_url:"http://127.0.0.1:3000/img/banner1.png",title:"魅族6",desc:"版权所有翻版必究1"},
      {id:2,ctime:"2018-11-2",img_url:"http://127.0.0.1:3000/img/banner2.png",title:"360 N7",desc:"版权所有翻版必究2"},
      {id:3,ctime:"2018-9-2",img_url:"http://127.0.0.1:3000/img/banner3.png",title:"小米",desc:"版权所有翻版必究3"},
      {id:4,ctime:"2018-8-2",img_url:"http://127.0.0.1:3000/img/banner4.png",title:"Iphone",desc:"版权所有翻版必究4"}
  ];
  res.send(obj);
})

app.post("/postProduct",(req,res)=>{
    req.on("data",(buff)=>{
      var obj=qs.parse(buff.toString());
      var pno=obj.pno;
      var price=obj.price;
      res.send({code:1,msg:pno+":"+price});
    });
})