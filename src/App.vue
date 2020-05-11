<template>
  <div id="app">
    <Header/>
    <div class="main">
      <router-view name="slider"></router-view>
      <router-view name="main"></router-view></div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
body{
    background-color:rgb(255, 122, 142);
    word-break: break-word;
}
ul li{
  list-style:none;
}
.main{
  width: 90%;
  margin: 15px auto;
}
</style>
