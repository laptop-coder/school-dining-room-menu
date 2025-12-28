import { JSX, createSignal } from 'solid-js';

import styles from './DishContainer.module.css';
import type Dish from '../../types/dish';
import checkPhotoAvailability from '../../utils/checkPhotoAvailability';
import { ASSETS_ROUTE, STORAGE_ROUTE } from '../../utils/consts';
import DishPhoto from '../../ui/DishPhoto/DishPhoto';
import DishContainerItem from '../../ui/DishContainerItem/DishContainerItem';
import AdminEditDishButton from '../../ui/AdminEditDishButton/AdminEditDishButton';
import AdminDeleteDishButton from '../../ui/AdminDeleteDishButton/AdminDeleteDishButton';

import { Motion } from 'solid-motionone';

const DishContainer = (
  props: Dish & { admin?: boolean; reloadDishesList: Function },
): JSX.Element => {
  const pathToPhoto = `${STORAGE_ROUTE}/${props.DishId}.jpeg`;
  const [dishPhotoIsAvailable, setDishPhotoIsAvailable] = createSignal(false);
  checkPhotoAvailability({
    pathToPhoto: pathToPhoto,
    success: () => setDishPhotoIsAvailable(true),
  });
  return (
    <Motion
      class={styles.dish_container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 class={styles.dish_container_title}>{props.DishName}</h2>
      <div class={styles.dish_container_content}>
        {props.DishDescription !== '' && (
          <DishContainerItem
            pathToImage={`${ASSETS_ROUTE}/description.svg`}
            title={`${props.DishName} (описание)`}
          >
            {props.DishDescription}
          </DishContainerItem>
        )}
        {props.DishAvailable !== '' && (
          <DishContainerItem
            pathToImage={`${ASSETS_ROUTE}/available.svg`}
            title={`${props.DishName} (наличие)`}
          >
            {props.DishAvailable == '1' && (
              <span class={styles.green_text}>В наличии</span>
            )}
            {props.DishAvailable == '0' && (
              <span class={styles.red_text}>Нет в наличии</span>
            )}
          </DishContainerItem>
        )}
        {dishPhotoIsAvailable() && (
          <DishPhoto
            src={pathToPhoto}
            title={`${props.DishName} (изображение)`}
          />
        )}
        {props.admin && (
          <div class={styles.dish_container_buttons_group}>
            <AdminEditDishButton dishId={props.DishId} />
            <AdminDeleteDishButton
              dishId={props.DishId}
              dishName={props.DishName}
              reloadDishesList={props.reloadDishesList}
            />
          </div>
        )}
      </div>
    </Motion>
  );
};

export default DishContainer;
