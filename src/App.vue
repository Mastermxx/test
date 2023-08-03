<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <img alt="Shipment logo" class="logo" src="@/assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Shipment list</RouterLink>
        <RouterLink to="/map">Live map</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView />
</template>

<style scoped>

header {
  line-height: 1.5;
  max-height: 100vh;
  margin: 20px 0;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
  height: 40px;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 2%;
  }

  header .wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
