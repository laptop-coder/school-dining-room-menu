import axiosInstance from './axiosInstance';
import { DISH_MANAGEMENT_ROUTE } from './consts';
import Dish from '../types/dish';

const editDish = async (props: Dish) =>
  axiosInstance
    .post(
      `/dish/edit`,
      {
        dishId: props.DishId,
        newDishName: props.DishName,
        newDishCategory: props.DishCategory,
        newDishDescription: props.DishDescription,
        newDishPhoto: props.DishPhoto,
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
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default editDish;
