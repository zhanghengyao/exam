<template>	
	<div>
		<progress :percent.sync="percentNum"></progress>
		<div class="main">
			<question :class="{'fadeInBottom-enter':flag}" :question="question" :question-type="questionType" :answer="answer" :right="right" @on-change="change" @on-plus="plus"></question>
			<flexbox class="mt-10">
		        <flexbox-item>
		          <x-button v-if="!isLast" :disabled="flag" :type="buttonType" @click="nextQuestion">确定</x-button>
		          <x-button v-if="isLast" type="primary" @click="finish">交卷</x-button>
		        </flexbox-item>
	      	</flexbox>
      	</div>
      	<toast :show.sync="show" type="text" @on-close="close">准备进入下一题</toast>
	</div>
</template>
<script>
	import Toast 		from '../components/toast'
	import FlexboxItem 	from '../components/flexbox-item'
	import Flexbox 		from '../components/flexbox'
	import Progress 	from '../components/progress'
	import Question 	from '../components/question'
	import XButton 		from '../components/x-button' 
	import qList		from '../assets/data/question.json'
	export default{
		created(){
			this._init_question(qList)
		},
		components:{
			Progress,
			Question,
			XButton,
			Flexbox,
			FlexboxItem,
			Toast
		},
		data(){
			return {
				question 	 : '草尼马是一种马',
				questionType : 0,
				answer 		 : ['是','不是','妈的智障才觉得是马'],
				right 		 : '是',
				percentNum 	 : 0,
				qIndex 		 : 0,
				isLast		 : false,
				flag		 : true,
				buttonType	 : 'default',
				show		 : false,
				result		 : 0,
				list 		 : []
			}
		},
		ready(){
			let first = this.list[0],_this = this;
			this._question(first)
			console.log('用户id:',this.$route.params.uid)
		},
		methods:{
			_question:function(q){
				this.qIndex++
				this.question 		= this.qIndex+'、'+q.question
				this.questionType 	= q.questionType
				this.answer 		= q.answer
				this.right 			= q.right
				this.percentNum 	+= 100/this.list.length 
			},
			nextQuestion:function(){	
				this.$broadcast('nextQuestion');
				if(this.list.length===this.qIndex) {
					this.isLast = true
					return;
				}
				this.buttonType = 'default'
				this.show = true
				
			},
			finish:function(){
				alert('总成绩：'+this.result)
			},
			change:function(e){
				this.flag = false
				this.buttonType = 'primary'
				console.log(e)
			},
			close:function(){
				this._question(this.list[this.qIndex]);
				this.flag = true;
			},
			plus:function(){
				this.result+=this.list[this.qIndex-1].score;
			},
			_init_question:function(q){
				let type1 = q.filter(a => a.questionType===0)
				let type2 = q.filter(a => a.questionType===1)
				this.list =[ ...this._shuffle(type1).slice(0,4),...this._shuffle(type2).slice(0,2)]
				console.log(this.list)
			},
			_shuffle:function(array){
				let items = array
				for(let j, x, i = items.length; i; j = parseInt(Math.random() * i), x = items[--i], items[i] = items[j], items[j] = x);
				return items	
			}
		}
	}
</script>
<style scoped>
	.mt-10{
		margin-top: 10px;
	}
	.main{
		padding: 0 10px;
	}
	.fadeInBottom-enter {
	  animation:fadeInBottom-in 0.5s ease;
	}
@keyframes fadeInBottom-in {
    0% {
        opacity: 0;
        transform: translate3d(100%,0,0)
    }

    100% {
        opacity: 1;
        transform: none
    }
}
</style>
