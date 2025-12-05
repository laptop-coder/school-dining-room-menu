import axiosInstance from './axiosInstance';
import { CATEGORY_MANAGEMENT_ROUTE } from './consts';

const addCategory = async (props: { categoryName: string }) =>
  axiosInstance
    .post(
      `/category/add`,
      { categoryName: props.categoryName },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      window.location.href = CATEGORY_MANAGEMENT_ROUTE;
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default addCategory;
