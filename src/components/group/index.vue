<template>
  <div>
    <div class="weui_cells_title" v-if="title" :style="{color:titleColor}" v-html="title"></div>
    <div class="weui_cells" :class="{'no_group_title':!title}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    titleColor: String
  },
  ready(){
    console.log('titleColor:'+this.titleColor)
  }
}
</script>

<style>
.no_group_title {
  margin-top:18px;
}
.weui_cells_title{
  color: #000;
  font-size: 1rem;
  padding-top: 1.5rem;
}
</style>
