import { JSX } from 'solid-js';

import styles from './DishAvailabilityListItem.module.css';
import changeDishAvailability from '../../utils/changeDishAvailability';

const DishAvailabilityListItem = (props: {
  dishId: string;
  dishName: string;
  dishAvailable: '0' | '1';
  reloadDishesList: Function;
}): JSX.Element => {
  const newAvailabilityValue = props.dishAvailable == '1' ? '0' : '1';
  return (
    <div
      class={`${styles.dish_availability_list_item} ${props.dishAvailable == '1' ? styles.available : styles.unavailable}`}
      onclick={() => {
        changeDishAvailability({
          dishId: props.dishId,
          newAvailabilityValue: newAvailabilityValue,
          reloadDishesList: props.reloadDishesList,
        });
      }}
    >
      {props.dishName}
    </div>
  );
};

export default DishAvailabilityListItem;
