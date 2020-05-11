<template>
    <div id="sliderbar">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else >
            <div class="authorsummary">
                <div class="author">个人信息</div>
                <div class="zonggong">
                    <img :src="userinfo.avatar_url" alt="">
                    <span>{{userinfo.loginname}}</span>
                    <p>积分： {{userinfo.score}}</p>
                </div>
            </div>
            <div class="topics">
                <div class="zhuti">作者最近主题</div>
                <ul>  
                    <li v-for="item in userinfo.recent_topics.slice(0,5)">
                        <router-link :to="{name: 'article-content',params:{id:item.id,name:item.author.loginname}}">
                            <a href="javascript:;">{{item.title}}</a>
                        </router-link>
                    </li>
                    
                </ul>
            </div>
            <div class="replies">
                <div class="huifu">作者最近回复</div>
                <ul>
                    <li v-for="item in userinfo.recent_replies.slice(0,5)">
                        <router-link :to="{name: 'article-content',params:{id:item.id,name:item.author.loginname}}">
                            {{item.title}}
                        </router-link>
                    </li>
                    
                </ul>
            </div>
        </div>
            
        
    </div>
</template>

<script>
export default {
  name: 'SliderBar',
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
  watch:{
      $route(to,from){
          this.getUserInfoData()
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
#sliderbar{
    float:right;
    width:290px;
    margin-right: 50px;

}
.zonggong{
    margin-bottom: 15px;
    background-color: rgb(252, 178, 191);
    width: 290px;
    height: 90px;
}
.author{
    padding-left:5px ;
    line-height: 42px;
    background-color: rgb(252, 198, 208);
    width: 285px;
    height: 40px;
}
.zonggong img{
    vertical-align: middle;
    padding: 10px;
    width: 48px;
    height: 48px;
}
.zonggong span{
    font-size: 16px;
    color: #778087;
}
.zonggong p{
    padding: 0 10px;
    color: #333;
    font-size: 14px;
}
.topics,
.replies{
    background-color: rgb(252, 178, 191);
    width: 290px;
    height: 230px;
}
.topics .zhuti,
.replies .huifu {
    padding: 10px;
    height: 20px;
    background-color: rgb(252, 198, 208);
    color: #444;
    font-size: 13px;
}
.topics li,
.replies li {
    padding: 8px;
    font-size: 14px;
    color: #778087;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
}
</style>