import { JSX } from 'solid-js';

import { A } from '@solidjs/router';

import { HOME_ROUTE, ADMIN_ROUTE, ASSETS_ROUTE } from '../../utils/consts';
import styles from './Logo.module.css';

const Logo = (props: { admin?: boolean }): JSX.Element => {
  return (
    <A
      class={styles.logo}
      href={props.admin ? ADMIN_ROUTE : HOME_ROUTE}
      title='На главную'
    >
      <img
        class={styles.img}
        src={`${ASSETS_ROUTE}/logo.svg`}
      />
    </A>
  );
};

export default Logo;
