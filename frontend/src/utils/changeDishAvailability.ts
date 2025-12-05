import axiosInstance from './axiosInstance';

const changeDishAvailability = async (props: {
  dishId: string;
  newAvailabilityValue: '0' | '1';
  reloadDishesList: Function;
}) =>
  axiosInstance
    .post(
      `/dish/change_availability`,
      {
        dishId: props.dishId,
        newAvailabilityValue: props.newAvailabilityValue,
      },
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
    .catch(
      (error) => console.log('error'),
      // console.log(error)
    );

export default changeDishAvailability;
