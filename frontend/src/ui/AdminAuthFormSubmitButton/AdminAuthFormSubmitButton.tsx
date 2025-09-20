import { JSX } from 'solid-js';

import styles from './AdminAuthFormSubmitButton.module.css';

const AdminAuthFormSubmitButton = (props: { title: string }): JSX.Element => (
  <button
    class={styles.admin_auth_form_submit_button}
    title={props.title}
  >
    Отправить
  </button>
);

export default AdminAuthFormSubmitButton;
