<template>
  <div id="app">
    <div id="nav">
      <Navbar></Navbar>
    </div>
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active{
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active{
  transition: opacity 0.1s, transform 1s;
}
.slide-enter,
.slide-leave-to{
  opacity: 0;
  transform: translateX(-30%);
}
</style>
