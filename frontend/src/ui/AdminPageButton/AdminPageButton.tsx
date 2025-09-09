import { JSX, ParentProps } from 'solid-js';

import styles from './AdminPageButton.module.css';

const AdminPageButton = (
  props: ParentProps & { link: string, title: string },
): JSX.Element => (
  <button
    class={styles.admin_page_button}
    onclick={() => (window.location.href = props.link)}
    title={props.title}
  >
    {props.children}
  </button>
);

export default AdminPageButton;
