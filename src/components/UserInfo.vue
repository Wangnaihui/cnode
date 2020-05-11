<template>
    <div id="userinfo">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else >
            <div class="zhuye">
               <a href="/">主页</a> 
               <p>  /</p>
            </div>
            <section>
                <img :src="userinfo.avatar_url" alt="">
                <span>{{userinfo.loginname}}</span>
                <p class="score">{{userinfo.score}}积分</p>
                <p class="time">注册时间{{userinfo.create_at|formDate}}</p>
            </section>
            <div class="replies">
                <p class="canyu">最近参与的话题</p>
                <ul>
                    <li v-for="list in userinfo.recent_replies">
                        <img :src="list.author.avatar_url" :title="list.author.loginname">
                        <router-link :to="{name: 'article-content',params:{id:list.id,name:list.author.loginname}}">
                            {{list.title}}
                        </router-link>
                        <p>{{list.last_reply_at|formDate}}</p>
                          
                    </li>
                </ul>
            </div>
            <div class="topics">
                <p class="cjian">最近创建的话题</p>
                <ul>
                     <li v-for="list in userinfo.recent_topics">
                        <img :src="list.author.avatar_url" :title="list.author.loginname">
                        <router-link :to="{name: 'article-content',params:{id:list.id,name:list.author.loginname}}">
                            {{list.title}}
                        </router-link>
                        <p>{{list.last_reply_at|formDate}}</p>
                    </li>
                </ul>
            </div>
        </div>
            
        
    </div>
</template>

<script>
export default {
  name: 'user_info',
  data () {
    return {
      isLoading:false,
      userinfo:{}
    }
  },
  methods:{
      getUserInfoData(){
          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
          .then(res=>{
              this.isLoading=false;
              this.userinfo=res.data.data
          })
          .catch(function(err){
              console.log(err);
          })
      }
  },
  beforeMount:function(){
      this.isLoading=true;
      this.getUserInfoData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
    text-decoration: none;
    color:#0088cc;
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
.zhuye {
    width: 880px;
    height: 20px;
    margin:6px 6px 0;
    background-color:rgb(252, 198, 208);
    padding: 10px;
}
.zhuye a{
    color: #80bd01;
    text-decoration: underline;
    font-size: 14px;

}
.zhuye p{
    display: inline-block;
    color: #ccc;
    font-size: 14px;
}
section,
.replies,
.topics{
    background-color: rgb(252, 178, 191);
    width: 900px;
    margin:0px 6px 18px;
}
section{
     padding-bottom:8px;
}
section img{
    width: 40px;
    height: 40px;
    border-radius: 3px;
    vertical-align: middle;
    margin:10px;
}
section span{
    font-size: 14px;
    color:#333;
}
section p{
    margin: 0 12px 6px;
    line-height:25px;
    font-size: 14px;
}
.score{
    color:#333;
}
.time{
    color: #778087;
}
.canyu,
.cjian{
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
    line-height: 20px;
    color: #333;
    font-size: 14px;
}
.replies li,
.topics li{
    position: relative;
    font-size: 16px;
    line-height: 30px;
    padding:5px;
    padding-left: 10px;
    border-bottom: 1px solid rgb(255, 67, 98);
}
.replies img,
.topics img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    padding: 5px;
}
.replies p,
.topics p {
    position: absolute;
    right:10px;
    top:10px;
}

.replies a:hover,
.topics a:hover {
    text-decoration: underline;
    color: #005580;
}
</style>