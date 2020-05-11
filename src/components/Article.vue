<template>
    <div id="content">
        <div class="loading" v-if="isLoading">
            <img src="../assets/loading.gif" alt="">
        </div>
        <div v-else class="art_container">
            <div class="art_header">
                <div class="art_tit">{{posts.title}}</div>
                <div class="art_message">
                    <span>• 发布于 {{posts.last_reply_at|formDate}}</span>
                    <span>• 作者 {{posts.author.loginname}}</span>
                    <span>•{{posts.loginname}} 次浏览</span>
                    <span>• 来自 {{posts.tab|tabFormation}}</span>
                </div>
                <p class="inner" v-html="posts.content"></p>
            </div>
        </div>
            
        <div class="reply">
            <div class="respon">回复</div>
            <div class="pics" v-for="(list,index) in posts.replies">
                <router-link :to="{name:'user_info',params:{name:list.author.loginname}}">
                    <img :src="list.author.avatar_url" alt="">
                </router-link>
                <div class="info">
                    <span class="cname"><a href="#">{{list.author.loginname}}</a></span>
                    <span class="create"><a href="#">{{index+1}}楼•{{list.create_at|formDate}}</a></span>
                    <span v-if="list.ups.length>0">
                        {{list.ups.length}}
                    </span>
                    <span v-else></span>
                </div>
                <div class="huifu" v-html="list.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      isLoading:false,
      posts:{}
    }
  },
  methods:{
      getArticleData(){
          this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
          .then(res=>{
              this.isLoading=false;
              this.posts=res.data.data
          })
          .catch(function(err){
              console.log(err);
          })
      }
  },
  watch:{
      $route(to,from){
          this.getArticleData()
      }
  },
  beforeMount:function(){
      this.isLoading=true;
      this.getArticleData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('../assets/markdown.css');
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
.art_container{
    background-color: rgb(252, 178, 191);
    margin: 10px 30px;
}
.art_tit{
   padding: 10px 10px;
   font-weight: 700;
   font-size: 22px;
}
.art_message{
    padding:0 10px 5px;
    border-bottom: 2px solid rgb(255, 67, 98);
    font-size: 12px;
    color: #838383;
}
.inner{
    line-height:26px;
    white-space: pre-wrap;
    word-wrap: break-word;
    padding: 10px 15px 0;
    font-size:15px;
    color: #333;
    overflow:auto
}

.reply{
    background-color: rgb(252, 178, 191);
    margin: 10px 30px;
}
.respon{
    background-color: rgb(252, 178, 191);
    font-size: 14px;
    line-height: 20px;
    padding: 10px;
}
.pics{
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
.pics img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 3px;
}
.info{
    display: inline-block;
    
}
.cname a{
    color:#666;
    font-size:12px;
    font-weight:700;
}
.create a{
    font-size: 11px;
    color:#0088cc;
}
.info a:hover{
    color: #005580;
}

.huifu{
    font-size: 15px;
    line-height: 28px;
    overflow: auto;
    word-wrap: break-word;
    padding: 0 5px 10px 50px;
    color: #333;
}
</style>