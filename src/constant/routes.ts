export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog/',
  CAMPER: (id: string) => `/catalog/${id}/`,
  LOGIN: '/login/',
  REGISTER: '/register/',
  ADMIN: '/admin/',
  ADMIN_LOGIN: '/admin/login/',
  ADMIN_REGISTER: '/admin/register/',
  ADMIN_CAMPERS: '/admin/campers/',
} as const;
