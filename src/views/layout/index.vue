<template>
  <el-container class="layout-container">
    <el-aside
      class="aside"
      width="auto"
    >
      <Aside/>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header/>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from './components/aside'
import Header from './components/Header'

export default {
  name: 'LayoutIndex',
  components: {
    Aside,
    Header
  },
  props: {},
  data () {
    return {
      userInfo: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: rgb(0,32,51);
}

.header {
  background-color: #b3c0d1;
}

.main {
  background-color: #e9eef3;
}
</style>
