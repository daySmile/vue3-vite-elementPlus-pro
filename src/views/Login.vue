<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">后台管理系统</div>
      <div class="ms-content">
        <el-form :model="param" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="username">
              <template #prepend>
                <el-button icon="el-icon-user"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="password" v-model="param.password"
                      @keyup.enter="submitForm()">
              <template #prepend>
                <el-button icon="el-icon-lock"></el-button>
              </template>
            </el-input>
          </el-form-item>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm()">登录</el-button>
          </div>
          <p class="login-tips">Tips : 用户名和密码随便填。</p>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, toRefs} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {ElMessage} from "element-plus";
import {useStore} from "vuex";
import requestURL from "../api/index.js";


export default {
  name: "Login",
  setup() {
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      param: {
        username: '10000018018',
        password: '12345678',
        role: '超级管理员',
        address: '北京市海淀区XX科技园'
      },
    })
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {required: true, message: "请输入密码", trigger: "blur"},
      ],
    };

    const loginForm = ref(null);
    const submitForm = () => {
      loginForm.value.validate((valid) => {
        if (valid) {

          try {
            const {username, password} = state.param
            localStorage.setItem("userInfo", JSON.stringify(state.param));

            const data = {
              account: username,
              password,
            }
            requestURL.postLogin(data).then(res => {
              if (res.code == 0) {
                const accessToken = res?.data?.token ?? null
                if (accessToken) {
                  sessionStorage.setItem('accessToken', accessToken)
                  sessionStorage.setItem('auth', 'true')
                  if (route.query.redirect) {
                    const path = route.query.redirect
                    router.push({path: path})
                  } else {
                    router.push('/')
                  }
                } else {
                  ElMessage({
                    type: 'warning',
                    message: '账号或者密码有误!'
                  })
                }
              }
            })
          } catch (err) {
            ElMessage({
              type: 'warning',
              message: err.message
            })
          }
        }
        return false
      });
    };

    const store = useStore();
    store.commit('clearTags')

    return {
      ...toRefs(state),
      rules,
      loginForm,
      submitForm
    }
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/bj.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>