import { JSX, ParentProps } from 'solid-js';

import styles from './DishContainerItem.module.css';

const DishContainerItem = (
  props: ParentProps & { pathToImage: string; title: string },
): JSX.Element => (
  <div
    class={styles.dish_container_item}
    title={props.title}
  >
    <img
      src={props.pathToImage}
      class={styles.img}
    />
    {props.children}
  </div>
);

export default DishContainerItem;
