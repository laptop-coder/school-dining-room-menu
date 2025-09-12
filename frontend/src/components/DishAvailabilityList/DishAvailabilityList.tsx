import {
  For,
  JSX,
  createResource,
  createSignal,
  createEffect,
  Switch,
  Match,
} from 'solid-js';
import type { Accessor, ResourceReturn } from 'solid-js';

import styles from './DishAvailabilityList.module.css';
import fetchDishesList from '../../utils/fetchDishesList';
import type Dish from '../../types/dish';
import DishAvailabilityListItem from '../../ui/DishAvailabilityListItem/DishAvailabilityListItem';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';

const DishAvailabilityList = (props: {
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
    <div class={styles.dish_availability_list}>
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
              <DishAvailabilityListItem
                {...{
                  dishId: item.DishId,
                  dishName: item.DishName,
                  dishAvailable: item.DishAvailable as '0' | '1',
                  reloadDishesList: reloadDishesList,
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

export default DishAvailabilityList;
