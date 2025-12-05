import { JSX } from 'solid-js';

import styles from './AdminEditDishButton.module.css';
import { ASSETS_ROUTE, EDIT_DISH_ROUTE } from '../../utils/consts';

const AdminEditDishButton = (props: { dishId: string }): JSX.Element => (
  <button
    class={styles.admin_edit_dish_button}
    onclick={() => {
      window.location.href = `${EDIT_DISH_ROUTE}?dish_id=${props.dishId}`;
    }}
    title='Редактировать блюдо'
  >
    <img src={`${ASSETS_ROUTE}/edit.svg`} />
  </button>
);

export default AdminEditDishButton;
