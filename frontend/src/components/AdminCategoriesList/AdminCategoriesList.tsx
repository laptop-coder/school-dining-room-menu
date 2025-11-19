import { For, JSX, createResource, Switch, Match } from 'solid-js';
import type { ResourceReturn } from 'solid-js';

import styles from './AdminCategoriesList.module.css';
import fetchCategoriesList from '../../utils/fetchCategoriesList';
import AdminCategoriesListItem from '../../ui/AdminCategoriesListItem/AdminCategoriesListItem';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';
import AdminAddItemButton from '../../ui/AdminAddItemButton/AdminAddItemButton';
import { ADD_CATEGORY_ROUTE } from '../../utils/consts';

const AdminCategoriesList = (): JSX.Element => {
  const [categoriesList, { refetch: reloadCategoriesList }]: ResourceReturn<
    string[]
  > = createResource(fetchCategoriesList);
  return (
    <div class={styles.admin_categories_list}>
      <AdminAddItemButton
        link={ADD_CATEGORY_ROUTE}
        title='Добавить категорию'
      />
      {/*TODO: is it normal to use Loading in the fallback here?*/}
      <Switch fallback={<Loading />}>
        <Match
          when={
            categoriesList.state === 'unresolved' ||
            categoriesList.state === 'pending'
          }
        >
          <Loading />
        </Match>
        <Match
          when={
            categoriesList.state === 'ready' ||
            categoriesList.state === 'refreshing'
          }
        >
          <For
            each={categoriesList()}
            fallback={<NoData />}
          >
            {(item: string) => (
              <AdminCategoriesListItem
                categoryName={item}
                reloadCategoriesList={reloadCategoriesList}
              />
            )}
          </For>
        </Match>
        <Match when={categoriesList.state === 'errored'}>
          <Error />
        </Match>
      </Switch>
    </div>
  );
};

export default AdminCategoriesList;
