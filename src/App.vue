<template>
  <div id="app">
    <NavMenu/>
    <div class="tab-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavMenu from './components/NavMenu'

export default {
  components: {
    NavMenu
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
}

#app {
  display: flex;

  .tab-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>
