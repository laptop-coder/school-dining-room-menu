import { JSX } from 'solid-js';

import styles from './LogoutButton.module.css';
import { ASSETS_ROUTE } from '../../utils/consts';
import logout from '../../utils/logout';

const LogoutButton = (): JSX.Element => (
  <button
    class={styles.logout_button}
    title='Выйти из аккаунта'
    onclick={() => {
      if (confirm('Подтвердите выход из аккаунта администратора')) {
        logout();
      }
    }}
  >
    <img src={`${ASSETS_ROUTE}/logout.svg`} />
  </button>
);

export default LogoutButton;
