import { JSX, ParentProps } from 'solid-js';

import styles from './TabsToggleWrapper.module.css';

const TabsToggleWrapper = (props: ParentProps): JSX.Element => {
  return <div class={styles.tabs_toggle_wrapper}>{props.children}</div>;
};

export default TabsToggleWrapper;
