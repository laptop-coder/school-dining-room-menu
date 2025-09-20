import { JSX, ParentProps } from 'solid-js';

import styles from './AdminAuthFormTitle.module.css';

const AdminAuthFormTitle = (props: ParentProps): JSX.Element => (
  <h2 class={styles.admin_auth_form_title}>{props.children}</h2>
);

export default AdminAuthFormTitle;
