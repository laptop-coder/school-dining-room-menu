import { JSX } from 'solid-js';

import styles from './AdminUnauthorized.module.css';
import { ADMIN_LOGIN_ROUTE, ADMIN_REGISTER_ROUTE } from '../../utils/consts';

import { A } from '@solidjs/router';

const AdminUnauthorized = (): JSX.Element => {
  return (
    <div class={styles.admin_unauthorized}>
      Для доступа к этой странице необходим аккаунт администратора.
      <A href={ADMIN_LOGIN_ROUTE}>Войдите</A> в аккаунт или
      <A href={ADMIN_REGISTER_ROUTE}>создайте</A> новый
    </div>
  );
};

export default AdminUnauthorized;
