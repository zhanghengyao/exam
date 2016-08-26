<template>
	<div>
		<div v-if="questionType===0" class="answer1">
			<group :title="question">
				<radio :options="answer" @on-change="choose" :right="right" ></radio>	
			</group>		
		</div>
		<div v-if="questionType===1" class="answer2">
			<group :title="question">
			<div style="text-align:center;">
				<input v-model="value" class="vux-number-input" pattern="[0-9]*"/>
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
				value:null
			}
		},
		events:{
			nextQuestion:function(){
				if(this.questionType===1){
					console.log(this.value,this.right)
					if(this.value==this.right){
						this.$dispatch('on-plus')
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
			}
		}
	}
</script>
<style scoped>
	.error{
		color: red;
	}
	.vux-number-input {
	  height:20px;
	  font-size:20px;
	  color: #666;
	  appearance: none;
	  border:1px solid #ececec;
	  padding:3px 0;
	  text-align:center;
	  border-radius: 1px;
	  margin: 5px;
	}
</style>