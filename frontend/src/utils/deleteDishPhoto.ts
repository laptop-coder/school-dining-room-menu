import axiosInstance from './axiosInstance';

const deleteDishPhoto = async (props: { dishId: string }) =>
  axiosInstance
    .post(
      `/dish/delete_photo`,
      { dishId: props.dishId },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default deleteDishPhoto;
