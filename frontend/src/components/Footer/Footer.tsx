import { JSX } from 'solid-js';

import styles from './Footer.module.css';
import { SCHOOL_URL } from '../../utils/consts';

import { A } from '@solidjs/router';

const Footer = (): JSX.Element => {
  return (
    <div class={styles.footer}>
      <A
        href={SCHOOL_URL}
        class={styles.link}
      >
        © Лицей № 369, 2025
      </A>
    </div>
  );
};

export default Footer;
