<template>
    <div class="container">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else class="container">
            <ul>
                <li v-for="item in items" :key="item.id">
                    <img :src="item.author.avatar_url" class="avatar" :title="item.author.loginname">
                    <span>
                        <span class="reply_count">{{item.reply_count}}</span>
                        <span class="chu">/</span>
                        <span class="visit_count">{{item.visit_count}}</span>
                        <span :class="[{put_good:(item.good==true),put_top:(item.top==true),put_pic:(item.good!=ture&&item.top!=true)}]">
                        <span>{{item|tabFormation}}</span></span>
                        <router-link :to="{name: 'article-content',params:{id:item.id,name:item.author.loginname}}">
                            <span class="tit"><a href="#">{{item.title}}</a></span>
                        </router-link>
                        <span class="last_reply_at">{{item.last_reply_at|formDate}}</span>
                    </span>
                </li>
                <li>
                    <Pagination @handle="gender"></Pagination>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  name: 'PostList',
  data () {
    return {
      isLoading:false,
      items:[],
      postLis:1
    }
  },
  components:{
      Pagination
  },
  methods:{
      getData(){
          this.$http.get('https://cnodejs.org/api/v1/topics',{
              params:{
                  page:this.postLis,
                  limit:30
              }
          })
          .then(res=>{
              this.isLoading=false;
              this.items=res.data.data
          })
          .catch(function(err){
              console.log(err);
          })
      },
      gender(v){
        this.postLis=v;
        this.getData()
      }
  },

  beforeMount:function(){
      this.isLoading=true;
      this.getData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
    text-decoration: none;
}
.container{
    margin-top: 30px;
    width:100%;
    background-color: rgb(252, 178, 191);
}
ul li{
    position: relative;
    border-bottom: 1px solid #ccc;
    margin:5px;
}
.avatar{
    height: 30px;
    border-radius: 10px;
    margin: 5px;
    vertical-align: middle;
}
.loading{
    position: absolute;
    left: 50%;
    top:50%;
    transform:translate(-50%,-50%);
    
}
.loading img{
    width: 300px;
}
.reply_count{
    color:#9e78c0;
    font-size: 14px;
}
.chu{
    font-size: 10px;
}
.visit_count{
    margin-right:5px ;
    color:#b4b4b4;
    font-size: 10px;
}
.tit a{
    color:#000;
    font-size: 16px;
    margin-left: 8px;
}
.tit a:hover{
    text-decoration: underline;
}
.last_reply_at{
    position: absolute;
    top:10px;
    right: 0;
}
.put_good,
.put_top{
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}
.put_pic{
    background-color: rgb(71, 69, 70);
    color: rgb(214, 212, 212);
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;        
}

</style>
