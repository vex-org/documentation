<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <nav>
        <RouterLink to="/dashboard">Overview</RouterLink>
        <RouterLink to="/dashboard/posts">My Posts</RouterLink>
        <RouterLink to="/dashboard/posts/new">New Post</RouterLink>
        <RouterLink to="/dashboard/packages">My Packages</RouterLink>
        <RouterLink to="/dashboard/packages/new">Publish Package</RouterLink>
      </nav>
    </aside>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout { display: flex; gap: 2rem; }
.sidebar { flex-shrink: 0; }
.sidebar nav { display: flex; flex-direction: column; gap: 0.5rem; }
.sidebar a { color: var(--text-muted, #64748b); text-decoration: none; }
.sidebar a:hover, .sidebar .router-link-active { color: var(--text, #0f172a); }
.content { flex: 1; min-width: 0; }
</style>
