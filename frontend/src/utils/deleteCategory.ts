import axiosInstance from './axiosInstance';

const deleteCategory = async (props: {
  categoryName: string;
  reloadCategoriesList: Function;
}) =>
  axiosInstance
    .post(
      `/category/delete`,
      { categoryName: props.categoryName },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      props.reloadCategoriesList();
      return response.data;
    })
    .catch((error) => console.log(error));

export default deleteCategory;
