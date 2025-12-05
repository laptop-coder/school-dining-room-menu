import axiosInstance from '../utils/axiosInstance';

const fetchDishesList = async (props: {
  dishesCategory: string;
  dishesAvailable: string;
}) =>
  axiosInstance
    .get(
      `/dishes/get_list?category=${props.dishesCategory}&available=${props.dishesAvailable}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default fetchDishesList;
