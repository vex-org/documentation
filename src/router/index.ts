import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase/client'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'Home', component: () => import('../views/HomeView.vue'), meta: { title: 'Vex', description: 'Modern parallelism-first systems programming language. Rust safety, Go simplicity, automatic hardware saturation.' } },
    { path: '/packages', name: 'Packages', component: () => import('../views/PackagesView.vue'), meta: { title: 'Packages', description: 'Browse and discover Vex packages from the community registry.' } },
    { path: '/packages/:name', name: 'PackageDetail', component: () => import('../views/PackageDetailView.vue'), meta: { title: 'Package' } },
    { path: '/packages/:name/v/:version', name: 'PackageVersion', component: () => import('../views/PackageDetailView.vue'), meta: { title: 'Package' } },
    { path: '/blog', name: 'Blog', component: () => import('../views/BlogView.vue'), meta: { title: 'Blog', description: 'Articles, tutorials, and updates from the Vex community.' } },
    { path: '/blog/:slug', name: 'Post', component: () => import('../views/PostView.vue'), meta: { title: 'Post' } },
    { path: '/projects', name: 'Projects', component: () => import('../views/ProjectsView.vue'), meta: { title: 'Projects', description: 'Community-driven Vex projects. Discover, contribute, and collaborate.' } },
    { path: '/projects/:slug', name: 'ProjectDetail', component: () => import('../views/ProjectDetailView.vue'), meta: { title: 'Project' } },
    { path: '/playground', name: 'Playground', component: () => import('../views/PlaygroundView.vue'), meta: { title: 'Playground', description: 'Try Vex in your browser. Write, compile, and run Vex code instantly.' } },
    { path: '/ai', name: 'AI', component: () => import('../views/AIAssistantView.vue'), meta: { title: 'AI Assistant', description: 'Ask questions about Vex, explain code, translate, or fix errors with AI.' } },
    { path: '/login', name: 'Login', component: () => import('../views/LoginView.vue'), meta: { title: 'Sign In' } },
    { path: '/signup', redirect: '/login' },
    { path: '/auth/callback', name: 'AuthCallback', component: () => import('../views/AuthCallbackView.vue'), meta: { title: 'Signing in…' } },
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
        { path: 'projects', name: 'DashboardProjects', component: () => import('../views/dashboard/DashboardProjects.vue'), meta: { title: 'My Projects' } },
        { path: 'projects/new', name: 'ProjectNew', component: () => import('../views/dashboard/ProjectFormView.vue'), meta: { title: 'New Project' } },
        { path: 'projects/:slug/edit', name: 'ProjectEdit', component: () => import('../views/dashboard/ProjectFormView.vue'), meta: { title: 'Edit Project' } },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFoundView.vue'), meta: { title: '404' } },
  ],
})

router.beforeEach(async (to, _from, next) => {
  const title = to.meta.title as string | undefined
  if (title) {
    const full = title === 'Vex' ? 'Vex – Modern Systems Programming Language' : `${title} – Vex`
    document.title = full
  }
  if (to.meta.requiresAuth) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router
