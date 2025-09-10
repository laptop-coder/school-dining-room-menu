import { JSX } from 'solid-js';

import styles from './AdminAddItemButton.module.css';
import { ASSETS_ROUTE } from '../../utils/consts';

const AdminAddItemButton = (props: {
  link: string;
  title: string;
}): JSX.Element => (
  <button
    class={styles.admin_add_item_button}
    onclick={() => (window.location.href = props.link)}
    title={props.title}
  >
    <img src={`${ASSETS_ROUTE}/add.svg`} />
  </button>
);

export default AdminAddItemButton;
