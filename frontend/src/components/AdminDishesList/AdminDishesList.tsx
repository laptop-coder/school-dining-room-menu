import {
  For,
  JSX,
  createEffect,
  createSignal,
  createResource,
  Switch,
  Match,
} from 'solid-js';
import type { ResourceReturn, Accessor } from 'solid-js';

import styles from './AdminDishesList.module.css';
import fetchDishesList from '../../utils/fetchDishesList';
import deleteDish from '../../utils/deleteDish';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';
import AdminAddItemButton from '../../ui/AdminAddItemButton/AdminAddItemButton';
import { ADD_DISH_ROUTE } from '../../utils/consts';
import type Dish from '../../types/dish';
import DishContainer from '../DishContainer/DishContainer';

const AdminDishesList = (props: {
  category: Accessor<string>;
}): JSX.Element => {
  const [data, setData] = createSignal();
  const [state, setState] = createSignal();
  var reloadDishesList: Function;
  createEffect(() => {
    if (props.category() != '') {
      const [
        dishesListResource,
        { refetch: reloadDishesListResource },
      ]: ResourceReturn<Dish> = createResource(
        {
          dishesCategory: props.category(),
          dishesAvailable: '-1', // '-1' means all dishes
        },
        fetchDishesList,
      );
      reloadDishesList = reloadDishesListResource;
      createEffect(() => {
        setData(dishesListResource());
        setState(dishesListResource.state);
      });
    }
  });
  return (
    <div class={styles.admin_dishes_list}>
      <AdminAddItemButton
        link={ADD_DISH_ROUTE + `?default_category=${props.category()}`}
        title='Добавить блюдо'
      />
      {/*TODO: is it normal to use Loading in the fallback here?*/}
      <Switch fallback={<Loading />}>
        <Match when={state() === 'unresolved' || state() === 'pending'}>
          <Loading />
        </Match>
        <Match when={state() === 'ready' || state() === 'refreshing'}>
          <For
            each={data() as Dish[]}
            fallback={<NoData />}
          >
            {(item: Dish) => (
              <DishContainer
                {...item}
                onclick={() => {
                  if (
                    confirm(
                      `Подтвердите удаление блюда "${item.DishName}". Это действие необратимо`,
                    )
                  ) {
                    deleteDish({
                      dishId: item.DishId,
                      reloadDishesList: reloadDishesList,
                    });
                  }
                }}
              />
            )}
          </For>
        </Match>
        <Match when={state() === 'errored'}>
          <Error />
        </Match>
      </Switch>
    </div>
  );
};

export default AdminDishesList;
