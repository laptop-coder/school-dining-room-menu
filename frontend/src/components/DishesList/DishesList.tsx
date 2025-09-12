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

import styles from './DishesList.module.css';
import fetchDishesList from '../../utils/fetchDishesList';
import type Dish from '../../types/dish';
import DishContainer from '..//DishContainer/DishContainer';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';

const DishesList = (props: {
  category: Accessor<string>;
  available: Accessor<string>;
}): JSX.Element => {
  const [availableQueryParameter, setAvailableQueryParameter] =
    createSignal('');
  createEffect(() => {
    if (props.available() != '' && props.category() != '') {
      if (props.available() === 'Доступно сейчас') {
        setAvailableQueryParameter('1');
      } else if (props.available() === 'Нет в наличии') {
        setAvailableQueryParameter('0');
      } else if (props.available() === 'Полное меню') {
        setAvailableQueryParameter('-1');
      }
    }
  });

  const [data, setData] = createSignal();
  const [state, setState] = createSignal();
  createEffect(() => {
    if (props.category() != '' && availableQueryParameter() != '') {
      const [dishesListResource]: ResourceReturn<Dish> = createResource(
        {
          dishesCategory: props.category(),
          dishesAvailable: availableQueryParameter(),
        },
        fetchDishesList,
      );
      createEffect(() => {
        setData(dishesListResource());
        setState(dishesListResource.state);
      });
    }
  });
  return (
    <div class={styles.dishes_list}>
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
            {(item: Dish) => <DishContainer {...item} />}
          </For>
        </Match>
        <Match when={state() === 'errored'}>
          <Error />
        </Match>
      </Switch>
    </div>
  );
};

export default DishesList;
