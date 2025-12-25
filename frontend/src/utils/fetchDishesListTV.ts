import axiosInstance from '../utils/axiosInstance';

const fetchDishesListTV = async () =>
  axiosInstance
    .get(`/dishes/get_list/tv`)
    .then((response) => {
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default fetchDishesListTV;
