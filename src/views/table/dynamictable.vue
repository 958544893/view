<template>
 <div class='dynamictable'>
  	<div id='clock'style='float: right;'>
 		{{handleclick()}}
 	</div>
 	<svg-icon icon-class='耳机' class='title'></svg-icon>
	 <div class='maintitle'>
	 	<div class='login'>
	 		 <div class="weui-cell weui-cell_active weui-cell_vcode" style="margin-bottom: 15px">
	                <div class="weui-cell__hd">
	                    <label class="weui-label">手机号</label>
	                </div>
	                <div class="weui-cell__bd">
	                    <input class="weui-input" type="tel" placeholder="请输入手机号"/>
	                </div>
	                <div class="weui-cell__ft">
	                    <button class="weui-vcode-btn">获取验证码</button>
	                </div>
	            </div>
	            <router-link to=''><a href="javascript:" style="margin-left:20px;">忘记密码</a></router-link>
	 		<router-link to=''><a href="javascript:" class="weui-btn weui-btn_primary" style='margin-top: 50px;width: 250px'>登录</a></router-link>
	 	</div>
 	</div>
 	<div class="page__bd page__bd_spacing">
       <div>切换账户</div>
 	</div>
 	<div class="js_dialog" id="iosDialog2" style="display: none;">
        <div class="weui-mask"></div>
            <div id="js_dialog_2" class="weui-half-screen-dialog">
                <div class="weui-half-screen-dialog__hd">
                  <div class="weui-half-screen-dialog__hd__side">
                    <button style="display: none;" class="weui-icon-btn">返回<i class="weui-icon-back-arrow-thin"></i></button>
                    <button class="weui-icon-btn">关闭<i class="weui-icon-close-thin"></i></button>
                  </div>
                  <div class="weui-half-screen-dialog__hd__main">
                    <strong class="weui-half-screen-dialog__title">标题</strong>
                    <span class="weui-half-screen-dialog__subtitle">标题</span>
                  </div>
                  <div class="weui-half-screen-dialog__hd__side">
                    <button class="weui-icon-btn">更多<i class="weui-icon-more"></i></button>
                  </div>
                </div>
                <div class="weui-half-screen-dialog__bd">
                  <p class="weui-half-screen-dialog__desc">
                    辅助描述内容，可根据实际需要安排
                  </p>
                  <p class="weui-half-screen-dialog__tips">
                    辅助提示内容，可根据实际需要安排
                  </p>
                </div>
                <div class="weui-half-screen-dialog__ft">
                    <a href="javascript:" class="weui-btn weui-btn_default">辅助操作</a>
                    <a href="javascript:" class="weui-btn weui-btn_primary">主操作</a>
                </div>
            </div>
        </div>	
 </div>
</template>
<script>
export default{
	name:'#dynamictable',
	data(){
		return
	},
	methods:{
		handleclick(){
			setInterval(()=>
				{
					document.querySelector('#clock').innerHTML=new Date().toLocaleTimeString()
				},1000)
		}
	}
}
</script>
<style>
.login{
	position: absolute;
	top:55%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 360px;
}
.title{
	font-size: 50px;
	position: absolute;
	top: 30%;
	left: 50%;
	transform: translate(-50%,-50%);
}
#showIOSDialog2{
	position:absolute;
	left: 50%;
	top: 95%;
	transform: translate(-50%,-50%);
}
</style>