import axiosInstance from './axiosInstance';

const deleteDish = async (props: {
  dishId: string;
  reloadDishesList: Function;
}) =>
  axiosInstance
    .post(
      `/dish/delete`,
      { dishId: props.dishId },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      props.reloadDishesList();
      return response.data;
    })
    .catch((error) => console.log(error));

export default deleteDish;
