<script setup lang="ts"></script>

<template>
  <div class="home">
    <h1>Vex Hub</h1>
    <p>Packages and blog for the Vex language.</p>
    <p><router-link to="/packages">Browse packages</router-link> · <router-link to="/blog">Blog</router-link></p>
  </div>
</template>

<style scoped>
.home { text-align: center; padding: 2rem 0; }
.home h1 { font-size: 2rem; margin-bottom: 0.5rem; }
.home p { color: var(--text-muted, #64748b); margin-bottom: 0.5rem; }
.home a { color: var(--link, #3b82f6); }
</style>
