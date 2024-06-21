<!-- src/components/Register.vue -->
<template>
    <el-form class="register-form" @submit.prevent="handleRegister">
      <el-form-item label="Phone Number">
        <el-input v-model="phone" placeholder="Enter Phone Number"></el-input>
      </el-form-item>
      <el-form-item label="Real Name">
        <el-input v-model="rname" placeholder="Enter Real Name"></el-input>
      </el-form-item>
      <el-form-item label="Age">
        <el-input v-model="age" placeholder="Enter Age"></el-input>
      </el-form-item>
      <el-form-item label="Gender">
        <el-radio-group v-model="gender">
          <el-radio label="Male">Male</el-radio>
          <el-radio label="Female">Female</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Province">
        <el-input v-model="province" placeholder="Enter Your Province"></el-input>
      </el-form-item>
      <el-form-item label="City">
        <el-input v-model="city" placeholder="Enter Your City"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="password" type="password" placeholder="Enter Password"></el-input>
      </el-form-item>
    </el-form>
    <br />
    <el-button type="primary" style="width: auto;" @click="handleRegister">Register</el-button>
  </template>
  
 <script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const phone = ref('');
const rname = ref(''); 
const age = ref('');
const gender = ref('');
const province = ref('');
const city = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    const response = await axios.post('/api/user/register', {
      tel: phone.value,
      name: rname.value,
      password: password.value,
      age: age.value,
      sex: gender.value,
      province: province.value,
      city: city.value
    });
    if (response.data.code === '200') {
      router.push('/login');
      ElMessage.success(response.data.message);
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage.error('An error occurred');
  }
}

    





 </script>
  