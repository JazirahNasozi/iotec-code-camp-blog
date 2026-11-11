import { useEffect } from 'react'
import { PublicLayout } from '../layouts/PublicLayout'
import { AdminLayout } from '../layouts/AdminLayout'
import { LandingPage } from '../pages/LandingPage'
import { useLocation, useNavigate } from './RouterContext'
import { ROUTES } from './routeConfig'

const DEFAULT_ROUTE = ROUTES[0]

export function AppRouter() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const matchedRoute = ROUTES.find((route) => route.path === pathname) ?? DEFAULT_ROUTE

  useEffect(() => {
    if (matchedRoute.redirectTo) {
      navigate(matchedRoute.redirectTo, { replace: true })
      return
    }
    document.title = matchedRoute.title
  }, [matchedRoute, navigate])

  const ResolvedRoute = matchedRoute.redirectTo
    ? (ROUTES.find((route) => route.path === matchedRoute.redirectTo) ?? DEFAULT_ROUTE)
    : matchedRoute

  const PageComponent = ResolvedRoute.component ?? LandingPage

  if (ResolvedRoute.layout === 'admin') {
    return (
      <AdminLayout>
        <PageComponent />
      </AdminLayout>
    )
  }

  return (
    <PublicLayout>
      <PageComponent />
    </PublicLayout>
  )
}
