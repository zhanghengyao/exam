<template>
	<div>
		<header><img :src="h_img" alt=""></header>
		<div class="main">
			<div class="scores">
				<div>
					<img :src="item.src" alt="" v-for="item in scoreList">
				</div>
				<div class="line">
					<img src="../assets/img/line.png" alt="">
				</div>
			</div>
			<div class="rated">
				<img :src="rate" alt="">
			</div>
      	</div>      	
      	<footer>
      		<div class="animate_contain">
	      		<img class="bottom_base" src="../assets/img/result_bottom.png" />
				<img class="resutlt_bottom_book_1 on" src="../assets/img/resutlt_bottom_book_1.png" />
				<img class="resutlt_bottom_book_2 on" src="../assets/img/resutlt_bottom_book_2.png" />
				<img class="light" src="../assets/img/resutlt_bottom_light.png" />
	      	</div>
			<div class="f_left_last"></div>
		</footer>
	</div>
</template>
<script>
	export default{
		ready(){
			this.score = this.$route.params.score
			this.uid   = this.$route.params.uid
			this._init()
		},
		data(){
			return {
				score 		: 0,
				uid	  		: null,
				scoreList  	: [],
				h_img		: '',
				rate 		: ''	
			}
		},
		methods:{
			_init:function(){
				let t 		= this.score + ''
				let array 	= t.split('')
				let index 	= this._random(1,6) 
				let temp = []
				array.forEach(a=>{
					temp.push({src:`/result/${a}.png`})
				})
				this.scoreList = temp;
				if(this.score<40){
					this.rate = `/result/worst${index}.png`
					this.h_img = '/result/result_top_1.png'
				}else if(this.score >= 40 && this.score < 60){
					this.rate = `/result/bad${index}.png`
					this.h_img = '/result/result_top_1.png'
				}else if(this.score >= 60 && this.score < 100){
					this.rate = `/result/better${index}.png`
					this.h_img = '/result/result_top_2.png'
				}else if(this.score == 100){
					this.rate = `/result/best${index}.png`
					this.h_img = '/result/result_top_3.png'
				}
			},
			_random:(a,b) => {
					let c = b-a,num = Math.random()*c+a;
					return parseInt(num,10)
				}
		}
	}
</script>
<style>
.animate_contain{
	margin-bottom: 2.1875rem;
	position: absolute;
	width: 100%;
	height: 6.25rem;
	top:-6.25rem;
}
.animate_contain img { 
	position: absolute; 
	display: block;
}
.scores .line img{
	width: 80%;
}
.scores{
	position: absolute;
    left: 5.625rem;
    top: 1.25rem;
    font-size: 0;
    -webkit-transform: rotate(-7deg);
}
.scores img{
	width: 3.75rem;
	height: 3.35rem;	
}
.rated{
	position: absolute;
    left: 5.625rem;
    top: 10.25rem;
}
.rated img{
	width: 90%;
}
.main{
		padding: 0 10px;
		background: url(../assets/img/result_middle.png) no-repeat top;
		background-size: contain;
		height: 17.5rem;
		position: relative;
	}
	.float_background{
	/*background: url(../assets/img/result_bottom.png) no-repeat top;
	background-size: contain;*/
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
header{
	font-size: 0;
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
	.bottom_base {bottom: 0px;}
	.resutlt_bottom_book_1, .resutlt_bottom_book_2 { bottom: 0px; }
	.resutlt_bottom_book_1.on, .resutlt_bottom_book_2.on { bottom: 0; display: block; -webkit-transition: all 1s ease;}
	.resutlt_bottom_book_2 { display: none;}

	.resutlt_bottom_book_1.on {  -webkit-animation: floating 1s cubic-bezier(0.2, 0, 0.8, 1) infinite alternate;}
	@-webkit-keyframes 'floating' {
		0% { bottom: 0;}
		100% { bottom: .875rem;}
	}

	.resutlt_bottom_book_2.on { -webkit-animation: reflection 1s cubic-bezier(0.2, 0, 0.8, 1) infinite alternate;}
	@-webkit-keyframes 'reflection' {
		0% { opacity: 0; bottom: 0;}
		100% { opacity: 1; bottom: .875rem;}
	}

	.light {bottom: 0; -webkit-animation: lightening 1s cubic-bezier(0.2, 0, 0.8, 1) infinite alternate;}
	@-webkit-keyframes 'lightening' {
		0% { opacity:0;}
		100% { opacity: 1;}
	}
</style>
