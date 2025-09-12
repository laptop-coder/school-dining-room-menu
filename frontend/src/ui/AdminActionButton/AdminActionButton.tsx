import { JSX } from 'solid-js';

import styles from './AdminActionButton.module.css';

const AdminActionButton = (props: {
  action: () => void;
  title: string;
  pathToImage: string;
}): JSX.Element => (
  <button
    class={styles.admin_action_button}
    onclick={props.action}
    title={props.title}
  >
    <img src={props.pathToImage} />
  </button>
);

export default AdminActionButton;
