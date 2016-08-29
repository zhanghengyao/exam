<template>
	<div>
		<div v-if="questionType===0" class="answer1">
			<group :title="question" title-color="#000;">
				<radio :options="answer" @on-change="choose" :right="right" ></radio>	
			</group>		
		</div>
		<div v-if="questionType===1" class="answer2">
			<group :title="question">
			<div class="weui_cells_radio">
			    <label :class="{'weui_cell':true, 'weui_cell_radio weui_check_label':true,'access':a_pass==1||a_pass==-1,'mistake':a_pass==0}">
			      <div class="weui_cell_bd weui_cell_primary">
			        <p>填写答案：<input v-model="value" class="vux-number-input" pattern="[0-9]*"/></p>
			      </div>
			      <div class="weui_cell_ft">
			        <img :class="{'show':a_pass==1,'hide':a_pass!=1}" src="../../assets/img/hint_correct.png" alt="">
			        <img :class="{'show':a_pass==0,'hide':a_pass!=0}" src="../../assets/img/hint_mistake.png" alt="">
			      </div>
			    </label>
			  </div>			
			</group>
		</div>
	</div>
</template>
<script>	
import Group from '../group'
import Radio from '../radio'
	export default{
		props:{
			question:String,
			questionType:{
				type:Number,
				default:0
			},
			answer:Array,
			right:String
		},
		components:{
			Radio,
			Group
		},
		methods:{
			choose:function(e){
				console.log(e)
				this.isRight = (e===this.right)
				return true
			},
			changeValue:function(e){
				console.log(e)
			}
		},
		data(){
			return {
				isRight:false,
				value:null,
				a_pass:-1
			}
		},
		events:{
			nextQuestion:function(){
				if(this.questionType===1){
					console.log(this.value,this.right)
					if(this.value==this.right){
						this.$dispatch('on-plus')		
						this.a_pass = 1				
					}else{
						this.a_pass = 0
					}					
				}
				return true
		    }
		},
		watch:{
			value:function(val){
				console.log('value:'+val)
				if(val!==null&&val!==''){
					this.$dispatch('on-change', val)
				}
			},
			right:function(val){
				this.a_pass = -1
				this.value=null
			}
		},
		ready(){
			console.log('question ready')
		}
	}
</script>
<style scoped>
.show{
  display: block;
}
.hide{
  display: none;
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
	.error{
		color: red;
	}
	.vux-number-input {
		width: 130px;	
	  height:20px;
	  font-size:20px;
	  color: #666;
	  appearance: none;
	  border:1px solid #ececec;
	  padding:3px 0;
	  text-align:center;
	  border-radius: 1px;
	  margin: 5px;
	  border: none;
	  border-bottom: solid 1px #333;
	  outline: none;
	}
</style>