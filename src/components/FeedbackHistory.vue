<!-- src/components/FeedbackHistory.vue -->
<template>
    <el-col style="text-align: left;">
        <router-link to="/home" style="font-size: small;">&lt&lt go home</router-link>
    </el-col>
    <el-table :data="feedbacks" style="display: flex;">
      <el-table-column prop="createdTime" label="Date" width="110">
      </el-table-column>
      <el-table-column prop="province" label="Province" width="90">
      </el-table-column>
      <el-table-column prop="city" label="City" width="90">
      </el-table-column>
      <el-table-column prop="forecastAqiLevel" label="AQI Level" width="60">
      </el-table-column>
    </el-table>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const router = useRouter();
const feedbacks = ref([]);

onMounted(async () => {
  try {
    let response = await axios.post('/api/report/supervisor/queryReportList', {
      submitterId: Cookies.get('Id'),
      pageNum: 1,
      pageSize: 100
    });
    feedbacks.value = response.data.data;
  } catch (error) {
    console.error('An error occurred:', error);
    ElMessage.error('An error occurred');
  }
});

</script>