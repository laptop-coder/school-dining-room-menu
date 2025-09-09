import { JSX } from 'solid-js';

import styles from './NoData.module.css';
import { ASSETS_ROUTE } from '../../utils/consts';

const NoData = (): JSX.Element => (
  <div class={styles.no_data}>
    <img
      src={`${ASSETS_ROUTE}/no_data.svg`}
      class={styles.img}
    />
    Данных нет
  </div>
);

export default NoData;
