export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog/',
  CAMPER: (id: string) => `/catalog/${id}/`,
  ADMIN: '/admin/',
  ADMIN_LOGIN: '/admin/login/',
  ADMIN_CAMPERS: '/admin/campers/',
} as const;
