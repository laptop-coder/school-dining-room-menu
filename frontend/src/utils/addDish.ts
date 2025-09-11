import axiosInstance from './axiosInstance';
import { DISH_MANAGEMENT_ROUTE } from './consts';
import Dish from '../types/dish';

const addDish = async (props: Dish) =>
  axiosInstance
    .post(
      `/dish/add`,
      {
        dishName: props.DishName,
        dishCategory: props.DishCategory,
        dishDescription: props.DishDescription,
        dishPhoto: props.DishPhoto,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      window.location.href = DISH_MANAGEMENT_ROUTE;
      return response.data;
    })
    .catch((error) => console.log(error));

export default addDish;
