<template>
  <div style="padding: 10px;">
    <el-select v-model="selectedProvince" placeholder="Select a province" @change="updateCities">
      <el-option
        v-for="province in Object.keys(provinces)"
        :key="province"
        :label="province"
        :value="province">
      </el-option>
    </el-select>
    <el-select v-model="selectedCity" placeholder="Select a city">
      <el-option
        v-for="city in cities"
        :key="city"
        :label="city"
        :value="city">
      </el-option>
    </el-select>
    <el-input v-model="location" placeholder="Please input location"></el-input>
    <el-button type="primary" @click="goToFeedback">Next Step</el-button>
    <el-col>
      <router-link to="/home" style="font-size: small;">&lt&lt go home</router-link>
    </el-col>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

const provinces = ref({});
const cities = ref([]);
const location = ref('');
const selectedProvince = ref('');
const selectedCity = ref('');
const router = useRouter();

onMounted(async () => {
  let response = await axios.get('/api/city/selectAll');
  provinces.value = response.data.data.reduce((result, city) => {
    if (!result[city.province]) {
      result[city.province] = [];
    }
    result[city.province].push(city.name);
    return result;
  }, {});
});

let updateCities = () => {
  cities.value = provinces.value[selectedProvince.value] || [];
};

watch(selectedProvince, updateCities);

let goToFeedback = () => {
  if (selectedProvince.value && selectedCity.value) {
    router.push({
      path: '/feedback',
      query: {
        province: selectedProvince.value,
        city: selectedCity.value,
        location: location.value
      }
    });
  } else {
    // Show an error message if a province or city is not selected
    console.error('Please select a province and a city');
  }
};
</script>