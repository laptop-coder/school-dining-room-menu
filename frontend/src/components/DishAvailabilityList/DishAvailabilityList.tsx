import {
  For,
  JSX,
  createResource,
  createSignal,
  createEffect,
  Switch,
  Match,
  onMount,
} from 'solid-js';
import type { Accessor, Setter, ResourceReturn } from 'solid-js';

import styles from './DishAvailabilityList.module.css';
import fetchDishesList from '../../utils/fetchDishesList';
import type Dish from '../../types/dish';
import DishAvailabilityListItem from '../../ui/DishAvailabilityListItem/DishAvailabilityListItem';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';
import AdminActionButton from '../../ui/AdminActionButton/AdminActionButton';
import { ASSETS_ROUTE } from '../../utils/consts';

const DishAvailabilityList = (props: {
  category: Accessor<string>;
  isFullscreen: Accessor<boolean>;
  setIsFullscreen: Setter<boolean>;
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

  // Fullscreen

  var contentElement: HTMLElement | null;
  onMount(() => {
    contentElement = document.getElementById('content');
  });

  createEffect(() => {
    const handleFullscreenChange = () => {
      props.setIsFullscreen(document.fullscreenElement === contentElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange,
      );
    };
  });

  return (
    <div class={styles.dish_availability_list_wrapper}>
      {!props.isFullscreen() && (
        <AdminActionButton
          action={() => {
            if (contentElement) {
              contentElement.requestFullscreen();
            }
          }}
          title='Перейти в полноэкранный режим'
          pathToImage={`${ASSETS_ROUTE}/fullscreen.svg`}
        />
      )}
      <div
        class={
          props.isFullscreen()
            ? styles.dish_availability_list_fullscreen
            : styles.dish_availability_list
        }
      >
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
    </div>
  );
};

export default DishAvailabilityList;
