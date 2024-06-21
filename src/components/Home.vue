<!-- a vue template with two buttons vertically -->
<template>
  <div style="display: flex; flex-direction: column">
    <h4>Welcome,</h4>
    <h3 style="margin-top: 0%;">{{ username }}</h3>
    <br/>
    <el-button type="primary" @click="goToSelectGrid">New Feedback</el-button>
    <el-button type="primary" @click="goToFeedbackHistory">Feedback History</el-button>
    <el-button @click="handleLogout">Logout</el-button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const username = ref('');
const router = useRouter();

onMounted(() => {
    username.value = Cookies.get('username');
    console.log(username.value);
    console.log(Cookies.get('username'));
});

function handleLogout() {
    Cookies.remove('authToken');
    Cookies.remove('gridDetectorId');
    Cookies.remove('Id');
    Cookies.remove('username');
    window.location.reload();
}

function goToSelectGrid() {
    router.push('/selectGrid');
}

function goToFeedbackHistory() {
    router.push('/feedbackHistory');
}
</script>

<style scoped>
.el-button {
  margin: 10px;
}
</style>