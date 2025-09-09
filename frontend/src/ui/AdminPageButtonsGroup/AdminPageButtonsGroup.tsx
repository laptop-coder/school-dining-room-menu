import { JSX, ParentProps } from 'solid-js';

import styles from './AdminPageButtonsGroup.module.css';

const AdminPageButtonsGroup = (props: ParentProps): JSX.Element => (
  <div class={styles.admin_page_buttons_group}>{props.children}</div>
);

export default AdminPageButtonsGroup;
