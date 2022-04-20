<template>
  <div class="app-wrapper flex h-screen flex-col">
    <AppHeader />
    <AppMain class="flex-grow" />
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue'
import AppMain from './components/AppMain.vue'

export default {
  name: 'Layout',
  components: {
    AppMain,
    AppHeader
  },
  data () {
    return {
    }
  }
}
</script>
