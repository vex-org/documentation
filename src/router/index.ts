import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/client'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { title: 'Vex' } },
    { path: '/packages', name: 'Packages', component: () => import('../views/PackagesView.vue'), meta: { title: 'Packages' } },
    { path: '/packages/:name', name: 'PackageDetail', component: () => import('../views/PackageDetailView.vue'), meta: { title: 'Package' } },
    { path: '/packages/:name/v/:version', name: 'PackageVersion', component: () => import('../views/PackageDetailView.vue'), meta: { title: 'Package' } },
    { path: '/blog', name: 'Blog', component: () => import('../views/BlogView.vue'), meta: { title: 'Blog' } },
    { path: '/blog/:slug', name: 'Post', component: () => import('../views/PostView.vue'), meta: { title: 'Post' } },
    { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue'), meta: { title: 'Login' } },
    { path: '/signup', name: 'Signup', component: () => import('../views/SignupView.vue'), meta: { title: 'Sign Up' } },
    {
      path: '/dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', name: 'Dashboard', component: () => import('../views/dashboard/DashboardHome.vue'), meta: { title: 'Dashboard' } },
        { path: 'posts', name: 'DashboardPosts', component: () => import('../views/dashboard/DashboardPosts.vue'), meta: { title: 'My Posts' } },
        { path: 'posts/new', name: 'PostNew', component: () => import('../views/dashboard/PostEditView.vue'), meta: { title: 'New Post' } },
        { path: 'posts/:id/edit', name: 'PostEdit', component: () => import('../views/dashboard/PostEditView.vue'), meta: { title: 'Edit Post' } },
        { path: 'packages', name: 'DashboardPackages', component: () => import('../views/dashboard/DashboardPackages.vue'), meta: { title: 'My Packages' } },
        { path: 'packages/new', name: 'PackageNew', component: () => import('../views/dashboard/PackagePublishView.vue'), meta: { title: 'Publish Package' } },
        { path: 'packages/:name/versions/new', name: 'VersionNew', component: () => import('../views/dashboard/VersionPublishView.vue'), meta: { title: 'Publish Version' } },
      ],
    },
  ],
})

router.beforeEach(async (to, _from, next) => {
  if (to.meta.title) document.title = `${to.meta.title} – Vex`
  if (to.meta.requiresAuth) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router
