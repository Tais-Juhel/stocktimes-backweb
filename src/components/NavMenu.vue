<template>
  <div class="menu-toggle">
    <div class="burger-icon" @click="toggleMenu">
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
      <span class="burger-bar"></span>
    </div>
    <div class="nav-list">
      <ul class="list-tab">
        <li class="nav-item"><router-link class="nav-link" to="/users">Users</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/shoes">Shoes</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/brands">Brands</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    toggleMenu() {
      document.querySelector(".menu-toggle").classList.toggle('toggle');
      document.querySelectorAll(".burger-bar").forEach(elem => {
        elem.classList.toggle("toggle")
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.menu-toggle {
  width: 200px;
  min-height: 100vh;
  background-color: #5956E9;
  transition: all 1s ease;
}
.menu-toggle.toggle {
  margin-left: -200px;
}

.menu-toggle .burger-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 16px;
  top: 20px;
  left: 30px;
}
.menu-toggle .burger-bar {
  display: block;
  width: 22px;
  height: 2px;
  background-color: #FFFFFF;
  border-radius: 5px;
  transition: all 500ms ease;
}
.menu-toggle .burger-bar.toggle {
  background-color: #5956E9;
}
.menu-toggle .burger-bar:nth-child(2) {
  width: 11px;
}
.menu-toggle .burger-bar:nth-child(2).toggle {
  width: 22px
}

.menu-toggle .nav-list {
  padding: 100px 30px;
}
.menu-toggle .nav-item {
  margin-bottom: 30px;
}
.menu-toggle .nav-link {
  position: relative;
  font-size: 18px;
  font-weight: 500;
  color: #FFFFFF;
}
.router-link-active::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #FFFFFF;
  border-radius: 5px;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
