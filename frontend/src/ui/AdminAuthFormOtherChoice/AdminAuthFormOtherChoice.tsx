import { JSX, ParentProps } from 'solid-js';

import styles from './AdminAuthFormOtherChoice.module.css';

const AdminAuthFormOtherChoice = (props: ParentProps): JSX.Element => (
  <div class={styles.admin_auth_form_other_choice}>{props.children}</div>
);

export default AdminAuthFormOtherChoice;
