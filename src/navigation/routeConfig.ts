import type { ComponentType } from 'react'
import { AdminBlogsPage } from '../pages/admin/AdminBlogsPage'
import { AdminTransactionsPage } from '../pages/admin/AdminTransactionsPage'
import { AdminUsersPage } from '../pages/admin/AdminUsersPage'
import { BlogDetailsPage } from '../pages/BlogDetailsPage'
import { LandingPage } from '../pages/LandingPage'
import { PATHS, type AppPath } from './paths'
import { profile } from '@/data/profile'
import { BLOGS } from '@/data/blogs'

type RouteLayout = 'public' | 'admin'

interface RouteConfig {
  path: AppPath
  title: string
  layout: RouteLayout
  component?: ComponentType
  redirectTo?: AppPath
}

export const ROUTES: readonly RouteConfig[] = [
  {
    path: PATHS.LANDING,
    title: `${profile.siteName} — ${profile.tagline}`,
    layout: 'public',
    component: LandingPage,
  },
  {
    path: PATHS.BLOG_DETAILS,
    title: `${BLOGS[0].title} | ${profile.siteName}`,
    layout: 'public',
    component: BlogDetailsPage,
  },
  ...BLOGS.map((blog) => ({
    path: blog.path,
    title: `${blog.title} | ${profile.siteName}`,
    layout: 'public' as const,
    component: BlogDetailsPage,
  })),
  {
    path: PATHS.ADMIN,
    title: `Articles & Essays | Admin Dashboard — ${profile.siteName}`,
    layout: 'admin',
    redirectTo: PATHS.ADMIN_BLOGS,
  },
  {
    path: PATHS.ADMIN_BLOGS,
    title: `Articles & Essays | Admin Dashboard — ${profile.siteName}`,
    layout: 'admin',
    component: AdminBlogsPage,
  },
  {
    path: PATHS.ADMIN_TRANSACTIONS,
    title: `Transactions | Admin Dashboard — ${profile.siteName}`,
    layout: 'admin',
    component: AdminTransactionsPage,
  },
  {
    path: PATHS.ADMIN_USERS,
    title: `Users | Admin Dashboard — ${profile.siteName}`,
    layout: 'admin',
    component: AdminUsersPage,
  },
] as const
