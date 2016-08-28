 <template>	
	<div>
		<div class="p-top-15 p-lr-15">
			<img src="../assets/img/cover.png" alt="">
			<div class="start-contain">
				<a class="start" v-link="{ name: 'exam', params: { uid: 123 }}"></a>
			</div>
		</div>
		<div class="login p-lr-15">
			<div class="grade">
				{{classes}}
			</div>
			<div class="user-name">
				王尼玛
			</div>
		</div>
		<footer>
			<img class="copyright" src="../assets/img/bototm_copyright.png" alt="">
		</footer>
	</div>
</template>
<style>
.p-top-15{
	padding-top: .9375rem;
}
.p-lr-15{
	padding-left: .9375rem;
	padding-right:.9375rem;
}
.zuoye,.start,.grade,.user-name{
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
}
.zuoye{
	background-image: url(../assets/img/cover.png);
	background-position: top;
	height: 490px;
	text-align: center;
}
.start{
	background-image: url(../assets/img/btn_start.png);
	width: 8rem;
	height: 3.125rem;
	display: inline-block;
}
.start-contain{
	text-align: center;
	margin-top: -5rem;
}
.grade,.user-name{
	text-align: center;
	color: #FFF;
}
.grade{
	background-image: url(../assets/img/input_grade.png);
}
.user-name{
	background-image: url(../assets/img/input_name.png);
	margin-top: .625rem;
}
.login{
	margin-top: 1.5625rem;
}
.login > div{
	margin-left: 3.5rem;
	margin-right: 3.5rem;
	line-height: 1rem;
	height: 1.25rem;
}
  footer{
  background-image: url(../assets/img/bottom.png);
  background-size: contain;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.1875rem;
}
.copyright{
	width: 6.25rem;
	height: .9375rem;
	margin-top: .625rem;
}
</style>
<script>
	export default{
		computed:{
			classes:function(){
				let g = this.random(1,7)
				let c = this.random(1,10)
				return `${g}年级${c}班`
			}
		},
		methods:{
				random:(a,b) => {
					let c = b-a,num = Math.random()*c+a;
					return parseInt(num,10)
				}
		}
	}
</script>