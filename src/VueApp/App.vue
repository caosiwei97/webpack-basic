<template>
  <el-button @click="$router.push({ path: '/', query: { id: 1 } })">to home</el-button>
  <el-button @click="handleClick">to login!</el-button>
  <router-view></router-view>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { ElButton } from 'element-plus'

  const router = useRouter()
  const handleClick = () => {
    router.push({ path: '/login', query: { id: 1 } })
  }
</script>
