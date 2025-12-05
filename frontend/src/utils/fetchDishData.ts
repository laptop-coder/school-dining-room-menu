import axiosInstance from '../utils/axiosInstance';

const fetchDishData = async (props: { dishId: string }) =>
  axiosInstance
    .get(`/dish/get_data?dish_id=${props.dishId}`)
    .then((response) => {
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default fetchDishData;
