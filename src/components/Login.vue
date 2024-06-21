<!-- src/components/Login.vue -->
<template>
  <h3 style="margin-bottom: 30px;">You are logging in as supervisor</h3>
  <el-form class="login-form" @submit.prevent="handleLogin">
    <el-form-item label="tel number">
      <el-input v-model="username" placeholder="Enter tel number" prefix-icon="el-icon-user"></el-input>
    </el-form-item>
    <el-form-item label="password">
      <el-input v-model="password" type="password" placeholder="Enter Password" prefix-icon="el-icon-lock"></el-input>
    </el-form-item>
    <el-row>
      <el-col :span="24" style="text-align: right;">
        <router-link to="/register" style="font-size: small;">Don't have an Account? Register</router-link>
      </el-col>
    </el-row>
  </el-form>
  <el-button style="width: 100%;" type="primary" @click="handleLogin">Login</el-button>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const username = ref('')
const password = ref('')
const router = useRouter();

async function handleLogin() {
  try {
    const response = await axios.post('/api/user/login', {
      username: username.value,
      password: password.value,
    });

    console.log(username.value);

    if (response.data.code === '200') {
      Cookies.set('authToken', response.data.data.token, { expires: 1 });
      Cookies.set('username', username.value, { expires: 1 });
      Cookies.set('Id', response.data.data.id, { expires: 1 })
      router.push('/home');
      ElMessage.success(response.data.message);
    } else {
      console.error('Login failed');
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage.error('An error occurred');
  }
}
</script>
  