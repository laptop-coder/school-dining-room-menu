import { JSX } from 'solid-js';

import styles from './AdminDeleteDishButton.module.css';
import { ASSETS_ROUTE } from '../../utils/consts';
import deleteDish from '../../utils/deleteDish';

const AdminDeleteDishButton = (props: {
  dishId: string;
  dishName: string;
  reloadDishesList: Function;
}): JSX.Element => (
  <button
    class={styles.admin_delete_dish_button}
    onclick={() => {
      if (
        confirm(
          `Подтвердите удаление блюда "${props.dishName}". Это действие необратимо`,
        )
      ) {
        deleteDish({
          dishId: props.dishId,
          reloadDishesList: props.reloadDishesList,
        });
      }
    }}
    title='Удалить блюдо'
  >
    <img src={`${ASSETS_ROUTE}/delete.svg`} />
  </button>
);

export default AdminDeleteDishButton;
