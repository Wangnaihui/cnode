<template>
  <div class="pagination">
   <button @click="changeBtn">首页</button>
   <button @click="changeBtn">上一页</button>
   <button v-if="jude" class="pageBtn">...</button>
   <button v-for="(btn,index) in pagebtns" :key="index" :class="[{currentPage:btn==currentPage}]" @click="changeBtn(btn)">{{btn}}</button>
   <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'pagination',
  data () {
    return {
      pagebtns:[1,2,3,4,5,'...'],
      currentPage:1,
      jude:false
    }
  },
  methods:{
    changeBtn(page){
      if(typeof page != 'number'){
        switch(page.target.innerText){
          case '上一页':
          $('button.currentPage').prev().click();
          break;
          case '下一页':
          $('button.currentPage').next().click();
          break;
          case '首页':
          this.pagebtns=[1,2,3,4,5,'...'];
          this.changeBtn(1)
          break;
          default:
          break;
        }
        return;
      }
        this.currentPage=page;
        if(page>4){
          this.jude=true;
        }else{
          this.jude=false;
        }
        if(page==this.pagebtns[4]){
          this.pagebtns.shift();
          this.pagebtns.splice(4,0,this.pagebtns[3]+1);
        }else if(page==this.pagebtns[0]&&page!=1){
          this.pagebtns.unshift(this.pagebtns[0]-1);
          this.pagebtns.splice(5,1)
        }
        this.$emit('handle',this.currentPage)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pagination{
  padding: 10px;
  margin: 6px 10px;
  background: rgb(248, 214, 220);
}

.currentPage{
  color:#fff;
  background-color: rgb(250, 78, 107);
}
button{
  color: rgb(25, 151, 25);
  border: 1px solid rgb(212, 212, 212);
  border-radius: 3px;
  width: 40px;
  height: 40px;
  background-color: rgb(255, 180, 192);
  position: relative;
  margin: 0 4px;
  width: 44px;
}
</style>
