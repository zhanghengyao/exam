<template>
  <div>
    <router-view
    :transition="transitions"
    transition-mode="out-in"></router-view>
  </div>
</template>

<script>
</script>
<style>
  @import './assets/css/weui.0.4.1.min.css'
</style>
<style type="text/css">  
  body {
    font-family: Helvetica, sans-serif;
    background:url(./assets/img/bg.jpg) repeat;
    padding:.9375rem;
  }
  img{
    width: 100%;
    height:100%;
  }
</style>
