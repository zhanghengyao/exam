<template>
  <div class="weui_cells_radio">
    <label :class="{'weui_cell':true, 'weui_cell_radio weui_check_label':true,'access':value==one,'mistake':(one===value)&&wrong}" for="radio_{{uuid}}_{{index}}" v-for="(index,one) in options" @click=''>
      <div class="weui_cell_bd weui_cell_primary">
        <p class="p-l-25"><span :class="_itemClass(index,one===value)"></span>{{{one}}}</p>
      </div>
      <div class="weui_cell_ft">
        <input type="radio" class="weui_check" v-model="value" id="radio_{{uuid}}_{{index}}" value="{{one}}">
        <img :class="{'show':(one===value)&&ok,'hide':!((one===value)&&ok)}" src="../../assets/img/hint_correct.png" alt="">
        <img :class="{'show':(one===value)&&wrong,'hide':!((one===value)&&wrong)}" src="../../assets/img/hint_mistake.png" alt="">
      </div>
    </label>
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
    },
    _itemClass:function(index,flag){
      let obj = {}
      obj['item-'+index] = true
      obj['item-focus-'+index] = flag
      return obj
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
.p-l-25{
  padding-left: 1.5625rem;  
}
.weui_cell_ft{
  position: absolute;
  right: 0;
  top: 0;
  width: 2.75rem;
  height: 2.75rem;
}
.weui_cell_radio{
  color: #295E90;
}
.weui_cell_radio > * {
  pointer-events: none;  
}
.access{
  background: url(../../assets/img/selected.png);
  color: white;
}
.mistake{
  background: url(../../assets/img/selected_red.png);
  color: white;
}
.item-0,.item-1,.item-2,.item-3,.item-focus-0,.item-focus-1,.item-focus-2,.item-focus-3{
  position: absolute;
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  top: 0;
  left: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
}
.item-0{
  background-image: url(../../assets/img/letter_a_blue.png);
}
.item-1{
  background-image: url(../../assets/img/letter_b_blue.png);
}
.item-2{
  background-image: url(../../assets/img/letter_c_blue.png);
}
.item-3{
  background-image: url(../../assets/img/letter_d_blue.png);
}
.item-focus-0{
  background-image: url(../../assets/img/letter_a_white.png);
}
.item-focus-1{
  background-image: url(../../assets/img/letter_b_white.png);
}
.item-focus-2{
  background-image: url(../../assets/img/letter_c_white.png);
}
.item-focus-3{
  background-image: url(../../assets/img/letter_d_white.png);
}
.show{
  display: block;
}
.hide{
  display: none;
}
</style>
