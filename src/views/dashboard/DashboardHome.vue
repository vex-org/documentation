<script setup lang="ts"></script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">Dashboard</h1>
    <div class="grid sm:grid-cols-2 gap-4">
      <router-link to="/dashboard/posts" class="group p-6 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all">
        <div class="text-2xl mb-2">📝</div>
        <h3 class="text-lg font-semibold text-white group-hover:text-vex-accent transition-colors">My Posts</h3>
        <p class="text-sm text-vex-text-muted mt-1">Write and manage your blog posts</p>
      </router-link>
      <router-link to="/dashboard/packages" class="group p-6 rounded-xl border border-vex-border bg-vex-bg-card hover:bg-vex-bg-card-hover hover:border-vex-primary/30 transition-all">
        <div class="text-2xl mb-2">📦</div>
        <h3 class="text-lg font-semibold text-white group-hover:text-vex-accent transition-colors">My Packages</h3>
        <p class="text-sm text-vex-text-muted mt-1">Publish and manage your packages</p>
      </router-link>
    </div>
  </div>
</template>
