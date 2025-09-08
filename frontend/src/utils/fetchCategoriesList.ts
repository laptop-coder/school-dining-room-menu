import axiosInstance from '../utils/axiosInstance';

const fetchCategoriesList = async () =>
  axiosInstance
    .get(`/categories/get_list`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

export default fetchCategoriesList;
