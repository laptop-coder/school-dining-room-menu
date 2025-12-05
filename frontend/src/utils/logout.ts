import axiosInstance from './axiosInstance';
import { ADMIN_ROUTE } from './consts';

const logout = async () =>
  axiosInstance
    .post(`/admin/logout`)
    .then((response) => {
      window.location.href = ADMIN_ROUTE;
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default logout;
