<template>
  <header class="h-24">
    <ul class="flex gap-x-4 justify-center h-full">
      <li v-for="route in routes" :key="route.name">
        <router-link :to="route.path" class="flex h-full items-center">
          {{ route.meta.name }}
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
function getMenuList (routes) {
  const menuList = []

  const getMenuItem = (route) => {
    if (route.children) {
      route.children.forEach(child => {
        getMenuItem(child)
      })
    }

    menuList.push(route)
  }

  routes.forEach(route => {
    getMenuItem(route)
  })

  return menuList
}

export default {
  name: 'AppHeader',
  computed: {
    routes () {
      return getMenuList(this.$router.options.routes)
        .filter(route => !route.hidden)
    }
  }
}
</script>

<style lang="scss" scoped>
.router-link-active {
  color: #188117;
}
</style>
