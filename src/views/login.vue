<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
			<h3 class='title'>系统登录</h3>
			<el-form-item prop="username">
				<el-input
				 ref="username"
	       v-model="loginForm.username"
				 class='login-user'
	    	 placeholder="请输入用户名"
	    	>
	    		<svg-icon slot='prefix' icon-class='user' style='margin-top:23px'/>
	  		</el-input>
	  	</el-form-item>
	  	<el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
		      <el-input
		       class='login-password'
		       :key="passwordType"
		       ref="password"
		       v-model="loginForm.password"
		       :type="passwordType"
		       placeholder="Password"
		       name="password"
		       tabindex="2"
		       autocomplete="on"
		       @keyup.native="checkCapslock"
		       @blur="capsTooltip = false"
		       @keyup.enter.native="handleLogin"
		      >
		        <span slot='suffix' @click="showPwd">
		          <svg-icon class='eye':icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
		        </span>
		        <span slot='prefix'>
		          <svg-icon icon-class="password" style='margin-top:23px' />
		        </span>
		      </el-input>
		    </el-form-item>
		  </el-tooltip>
			<el-button class='login-join':loading="loading" @click='handleLogin' type="primary" >登录</el-button>
		</el-form>
	</div>	
</template>
<script>
import { validUsername } from '@/utils/validate'
export default{
	name:'Login',
	data() {
		const validateUsername = (rule, value, callback) => {
    	if (!validUsername(value)) {
      	callback(new Error('请输入正确的用户名'))
    	} else {
      	callback()
    	}
 	 	}
  	const validatePassword = (rule, value, callback) => {
    	if (value.length < 6) {
      	callback(new Error('密码不能小于6位'))
    	} else {
      	callback('')
    	}
  	}
		return {
			loading: false,
			capsTooltip: false,
			redirect: undefined,
			otherQuery: {},
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules:{
      	username: [{ required: true, trigger: 'blur', validator: validateUsername }],
      	password: [{ required: true, trigger: 'blur', validator: validatePassword }]
    	},
      passwordType: 'password',
    }
	},
	watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
	methods: {
		heckCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
		handleLogin() {
      console.log(this.$refs.loginForm.validate())
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              console.log("登录成功");
              this.$router.push({path:'/complextable'})
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
  	},
  	getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
		showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
	}
}
</script>

<style>
	.el-input__suffix-inner{
		position: relative;
		top:10px;
		right: 30%
	}
.el-input__prefix{
	left:2%;
	}
.login-container{
	height: 100vh;
    width: 100%;
    background-color: #2d3a4b;
    overflow: hidden;
}
.login-form{
	position: relative;
    width: 500px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    height: 100%;
}
.title{
    font-size: 26px;
    color: #eee;
    margin: 0 auto 40px auto;
    text-align: center;
    font-weight: 700;
}
.login-password{
	margin-top: 22px
}
.login-join{
	margin-top: 22px
}
</style>
<style lang='css' scoped>
.el-input>>>input.el-input__inner{
	height: 60px;
	width: 500px;
	border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #e8f4ff;
}
button.el-button.login-join.el-button--primary{
	width: 500px;
}	
svg.{
	vertical-align:-1.2em;
}

</style>