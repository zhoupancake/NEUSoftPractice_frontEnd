<!-- src/components/Feedback.vue -->
<template>
  <el-form style="display: flex; flex-direction: column;" class="feedback-form" @submit.prevent="submitFeedback">
    <el-form-item label="Estimated AQI Level">
      <el-radio-group v-model="aqiLevel">
        <el-radio label="1">Excellent</el-radio>
        <el-radio label="2">Good</el-radio>
        <el-radio label="3">Mild Pollution</el-radio>
        <el-radio label="4">Moderate Pollution</el-radio>
        <el-radio label="5">Heavy Pollution</el-radio>
        <el-radio label="6">Severe Pollution</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Feedback Information">
      <el-input type="textarea" v-model="feedback" placeholder="Enter Feedback Information"></el-input>
    </el-form-item>
  </el-form>
  <br/>
  <el-button type="primary" style="width: 100%;" @click="submitFeedback">Submit</el-button>
  <el-col>
    <router-link to="/home" style="font-size: small;">&lt&lt go home</router-link>
  </el-col>
</template>
  
<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage} from 'element-plus';

const router = useRouter();
const route = useRoute();
const aqiLevel = ref('');
const feedback = ref('');

let submitFeedback = async () => {
  try {
    let response = await axios.post('/api/supervisor/report', {
      forecastAQILevel: aqiLevel.value,
      description: feedback.value,
      submitterId: Cookies.get('Id'),
      province: route.query.province,
      city: route.query.city,
      location: route.query.location
    });

    if (response.data.code === '200') {
      ElMessage.success(response.data.message);
      router.push('/home');
    } else {
      ElMessage.error(response.data.message);
      router.push('/selectGrid');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage.error('An error occurred');
    router.push('/selectGrid');
  }
};
</script>