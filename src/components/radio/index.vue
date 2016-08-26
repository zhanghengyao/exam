<template>
  <div class="weui_cells_radio">
    <label :class="{'weui_cell':true, 'weui_cell_radio weui_check_label':true,'r_focus':value==one}" for="radio_{{uuid}}_{{index}}" v-for="(index,one) in options" @click=''>
      <div class="weui_cell_bd weui_cell_primary">
        <p>{{one}}</p>
      </div>
      <div class="weui_cell_ft">
        <input type="radio" class="weui_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one}}">
        <img :class="{'show':(one===value)&&ok,'hide':!((one===value)&&ok)}" src="../../assets/img/gou.png" alt="">
        <img :class="{'show':(one===value)&&wrong,'hide':!((one===value)&&wrong)}" src="../../assets/img/cha.png" alt="">
      </div>
    </label>
    <div class="weui_cell" v-show="fillMode">
      <div class="weui_cell_hd"><label for="" class="weui_label">{{fillLabel}}</label></div>
      <div class="weui_cell_bd weui_cell_primary">
        <input class="weui_input needsclick" type="text" v-model="fillValue" placeholder="{{fillPlaceholder}}" @blur="isFocus=false" @focus="onFocus()">
      </div>
      <div class="weui_cell_ft" v-show="value==='' && !isFocus">
        <i class="weui_icon_warn"></i>
      </div>
    </div>
  </div>
</template>

<script>
import Base from '../../libs/base'

export default {
  mixins: [Base],
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: false,
      twoWay: true
    },
    fillMode: {
      type: Boolean,
      required: false,
      default: false
    },
    fillPlaceholder: {
      type: String,
      required: false,
      default: '其他'
    },
    fillLabel: {
      type: String,
      required: false,
      default: '其他'
    },
    right:{
      type: String,
      required: true
    }
  },
  ready () {
    this.handleChangeEvent = true
  },
  methods: {
    onFocus: function () {
      this.value = this.fillValue || ''
      this.isFocus = true
    }
  },
  watch: {
    value (newVal) {
      this.ok = false
      this.wrong = false
      var isOption = contains(this.options, newVal)
      if (newVal !== '' && isOption) {
        this.fillValue = ''
      }
      this.$dispatch('on-change', newVal)
    },
    fillValue (newVal) {
      if (this.fillMode && this.isFocus) {
        this.value = newVal
      }
    }
  },
  data () {
    return {
      fillValue: '',
      isFocus: false,
      ok:false,
      wrong:false
    }
  },
  events:{
    nextQuestion:function(){
      console.log(this.value,this.right)
      if(this.value===this.right){
        this.ok = true
        this.$dispatch('on-plus')
      }else{
        this.wrong = true
      }
    }
  }
}

function contains (a, obj) {
  var i = a.length
  while (i--) {
    if (a[i] === obj) {
      return true
    }
  }
  return false
}
</script>

<style scoped>
.weui_cell_radio > * {
  pointer-events: none;
}
.r_focus{
  -webkit-box-shadow:inset 0 0 10px #0CC;  
    -moz-box-shadow:inset 0 0 10px #0CC;  
    box-shadow:inset 0 0 10px #0CC;  
}
.show{
  display: block;
}
.hide{
  display: none;
}
</style>
