import { JSX } from 'solid-js';

import styles from './AdminCategoriesListItem.module.css';
import deleteCategory from '../../utils/deleteCategory';

const AdminCategoriesListItem = (props: {
  categoryName: string;
  reloadCategoriesList: Function;
}): JSX.Element => {
  return (
    <div
      class={styles.admin_categories_list_item}
      onclick={() => {
        if (confirm(`Подтвердите удаление категории "${props.categoryName}"`)) {
          deleteCategory({
            categoryName: props.categoryName,
            reloadCategoriesList: props.reloadCategoriesList,
          });
        }
      }}
    >
      {props.categoryName}
    </div>
  );
};

export default AdminCategoriesListItem;
