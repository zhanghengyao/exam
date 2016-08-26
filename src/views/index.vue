<template>	
	<div>
		<div>
			<img src="../assets/img/cover.png" alt="">
			<div class="start-contain">
				<a class="start" v-link="{ name: 'exam', params: { uid: 123 }}"></a>
			</div>
		</div>
		<div>
			<div class="grade">
				<input type="text">
			</div>
			<div class="user-name">
				<input type="text">
			</div>
		</div>
	</div>
</template>
<style>
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

.grade{
	background-image: url(../assets/img/input_grade.png);
}
.user-name{
	background-image: url(../assets/img/input_name.png);
	margin-top: .625rem;
}
</style>