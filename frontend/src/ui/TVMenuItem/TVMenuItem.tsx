import { JSX, For } from 'solid-js';

import styles from './TVMenuItem.module.css';

const TVMenuItem = (props: {
  dishesCategory: string;
  dishesList: string[];
}): JSX.Element => {
  return (
    <div class={styles.tv_menu_item}>
      <div class={styles.tv_menu_item_header}>{props.dishesCategory}</div>
      <div class={styles.tv_menu_item_content}>
        <For each={props.dishesList}>{(dish) => <span>• {dish}</span>}</For>
      </div>
    </div>
  );
};

export default TVMenuItem;
