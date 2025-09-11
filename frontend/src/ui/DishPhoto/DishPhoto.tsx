import { JSX, Show } from 'solid-js';

import styles from './DishPhoto.module.css';

const DishPhoto = (
  props: JSX.ImgHTMLAttributes<HTMLImageElement>,
): JSX.Element => (
  <Show when={props.src}>
    <img
      src={props.src}
      title={props.title}
      class={styles.dish_photo}
      onclick={(event) => {
        event.stopPropagation();
        event.target.requestFullscreen();
      }}
    />
  </Show>
);

export default DishPhoto;
