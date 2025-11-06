import { JSX } from 'solid-js';

import { A } from '@solidjs/router';

import styles from './Header.module.css';
import Logo from '../Logo/Logo';
import { HOME_ROUTE, ADMIN_ROUTE } from '../../utils/consts';
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = (props: {
  admin?: boolean;
  authorized?: boolean;
}): JSX.Element => (
  <header class={styles.header}>
    <div class={styles.header_wrapper}>
      <Logo admin={props.admin} />
      <A
        href={props.admin ? ADMIN_ROUTE : HOME_ROUTE}
        title='На главную'
      >
        <h1>
          <span style={{ color: 'var(--gray)' }}>Столовая.</span>
          <span style={{ color: 'var(--white)' }}>МЕНЮ</span>
        </h1>
      </A>
    </div>
    {props.admin && props.authorized && <LogoutButton />}
  </header>
);

export default Header;
