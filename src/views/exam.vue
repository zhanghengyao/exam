<template>	
	<div>
		<progress :percent.sync="percentNum"></progress>
		<div class="main">
			<question :class="{'fadeInBottom-enter':flag}" :question="question" :question-type="questionType" :answer="answer" :right="right" @on-change="change" @on-plus="plus"></question>
			<div class="mt-10 operation">
				<a v-if="!isLast" v-show="!flag" class="btn_next" @click.prevent="nextQuestion"></a>
				<a v-if="!isLast" v-show="flag" class="btn_next_disabled"></a>
				<a v-if="isLast" class="btn_finish" v-link="{ name: 'result', params: { uid:userId,score:result }}"></a>
			</div>			
      	</div>
      	<footer>
      		<div class="float_background"></div>
			<div :class="{'f_left':!isLast,'f_left_last':isLast}"></div>
			<div class="f_right">第{{qIndex}}页</div>
		</footer>
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
				list 		 : [],
				userId		 : null
			}
		},
		ready(){
			let first = this.list[0],_this = this;
			this._question(first)
			this.userId = this.$route.params.uid;
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
				this.$route
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
.float_background{
	background: url(../assets/img/bottom_picture.png) no-repeat top;
	background-size: contain;
	width: 100%;
	height: 5rem;
	position: absolute;
	top:-4.3rem;
}
.f_left,.f_left_last{
	float: left;
	margin-left: .9375rem;	
	background-repeat: no-repeat;
	background-position: left;
	background-size: contain;
	width: 11.25rem;
	height: 2.25rem;
}
.f_left{
	background-image: url(../assets/img/bototm_motto_1.png);
}
.f_left_last{
	background-image: url(../assets/img/bototm_motto_2.png);
}
.f_right{
	float: right;
	margin-right: .9375rem;
	font-size: .875rem;
	color: white;
}
  footer{
  background-image: url(../assets/img/bottom.png);
  background-size: cover;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.1875rem;
  line-height: 2.1875rem;
}
	.btn_next,.btn_next_disabled,.btn_finish{
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center;
		width: 8rem;
		height: 3.125rem;
		display: inline-block;
	}
	.btn_next{
		background-image: url(../assets/img/btn_next.png);		
	}
	.btn_next_disabled{
		background-image: url(../assets/img/btn_next_disabled.png);
	}
	.btn_finish{
		background-image: url(../assets/img/btn_submit.png);
	}
	.mt-10{
		margin-top: 10px;
	}
	.operation{
		text-align: center;
	}
	.main{
		padding: 0 10px;
		background: url(../assets/img/article_bg.png) no-repeat top;
		background-size: contain;
		height: 26.25rem;
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
.weui_cells_title{
	color: #000;
}
</style>
