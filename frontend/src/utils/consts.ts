export const ADMIN_ROUTE = '/' + import.meta.env.VITE_ADMIN_URL_UUID;
export const ADMIN_LOGIN_ROUTE = ADMIN_ROUTE + '/login';
export const ADMIN_REGISTER_ROUTE = ADMIN_ROUTE + '/register';
export const HOME_ROUTE = '/';
export const CATEGORY_MANAGEMENT_ROUTE = ADMIN_ROUTE + '/category_management';
export const DISH_MANAGEMENT_ROUTE = ADMIN_ROUTE + '/dish_management';
export const DISH_AVAILABILITY_MANAGEMENT_ROUTE =
  ADMIN_ROUTE + '/dish_availability_management';
export const ADD_CATEGORY_ROUTE = ADMIN_ROUTE + '/add_category';
export const ADD_DISH_ROUTE = ADMIN_ROUTE + '/add_dish';

export const BACKEND_ADMIN_LOGIN_ROUTE = '/admin/login';
export const BACKEND_ADMIN_REGISTER_ROUTE = '/admin/register';

export const ASSETS_ROUTE = '/storage/assets';
export const STORAGE_ROUTE = '/storage/storage';

export const BACKEND_URL =
  'http://localhost:' + import.meta.env.VITE_BACKEND_PORT;
export const SCHOOL_URL = 'https://лицей369.рф';
