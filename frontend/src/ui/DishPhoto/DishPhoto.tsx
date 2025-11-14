import { JSX, Show } from 'solid-js';

import styles from './DishPhoto.module.css';
import { ASSETS_ROUTE } from '../../utils/consts';

const DishPhoto = (
  props: JSX.ImgHTMLAttributes<HTMLImageElement> & { deletePhoto?: Function },
): JSX.Element => (
  <Show when={props.src}>
    <div class={styles.dish_photo_wrapper}>
      {props.deletePhoto && (
        <button
          class={styles.delete_dish_photo_button}
          type='button'
          onclick={() => {
            if (
              confirm(
                'Подтвердите удаление фотографии. Это действие необратимо',
              ) &&
              props.deletePhoto !== undefined
            ) {
              props.deletePhoto();
            }
          }}
        >
          <img src={`${ASSETS_ROUTE}/delete.svg`} />
        </button>
      )}
      <img
        src={props.src}
        title={props.title}
        class={styles.dish_photo}
        onclick={(event) => event.target.requestFullscreen()}
      />
    </div>
  </Show>
);

export default DishPhoto;
