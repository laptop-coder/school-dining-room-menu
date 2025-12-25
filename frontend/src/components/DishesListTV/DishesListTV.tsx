import {
  For,
  JSX,
  createResource,
  createSignal,
  createEffect,
  Switch,
  Match,
  onMount,
  onCleanup,
} from 'solid-js';
import type { Accessor, Setter, ResourceReturn } from 'solid-js';

import fetchDishesListTV from '../../utils/fetchDishesListTV';
import type DishTV from '../../types/dishTV'; // TODO: join into one file with Dish
import DishAvailabilityListItem from '../../ui/DishAvailabilityListItem/DishAvailabilityListItem';
import Loading from '../../ui/Loading/Loading';
import Error from '../../ui/Error/Error';
import NoData from '../../ui/NoData/NoData';
import AdminActionButton from '../../ui/AdminActionButton/AdminActionButton';
import { ASSETS_ROUTE } from '../../utils/consts';
import getBackendURL from '../../utils/getBackendURL';

import styles from './DishesListTV.module.css';

const DishesListTV = (props: {
  isFullscreen: boolean;
  setIsFullscreen: Setter<boolean>;
}): JSX.Element => {
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

  // WebSocket
  const [webSocketConnected, setWebSocketConnected] = createSignal(false);
  let socket: WebSocket | null = null;
  const connectWebSocket = () => {
    socket = new WebSocket(
      `ws://${getBackendURL().replace('http://', '').replace('https://', '')}/ws`,
    );
    socket.onopen = () => {
      setWebSocketConnected(true);
      console.log('WebSocket connection established');
    };
    socket.onmessage = (event) => {
      // Get data via WebSocket and update signal
      const updatedDishesList: DishTV[] = JSON.parse(event.data);
      setData(updatedDishesList);
      console.log('Menu was updated via WebSocket');
    };
    socket.onerror = (error) => {
      console.log('WebSocket error');
      // console.log(error) // TODO: think about it, how to make better
    };
    socket.onclose = () => {
      setWebSocketConnected(false);
      console.log('WebSocket connection closed');
      // Try to reconnect in 3 seconds
      setTimeout(connectWebSocket, 3000);
    };
  };

  // Get initial data on mount, close connection on cleanup
  const [data, setData] = createSignal();
  const [state, setState] = createSignal();
  onMount(() => {
    createEffect(() => {
      // TODO: maybe remove this createEffect
      const [dishesListResource]: ResourceReturn<DishTV[]> =
        createResource(fetchDishesListTV);
      createEffect(() => {
        setData(dishesListResource());
        setState(dishesListResource.state);
      });
    });
    connectWebSocket();
  });
  onCleanup(() => {
    if (socket) {
      socket.close();
    }
  });

  return (
    <div class={styles.dishes_list_tv_wrapper}>
      {!props.isFullscreen && (
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
          props.isFullscreen
            ? styles.dishes_list_tv_fullscreen
            : styles.dishes_list_tv
        }
      >
        <Switch fallback={<Loading />}>
          <Match when={state() === 'unresolved' || state() === 'pending'}>
            <Loading />
          </Match>
          <Match when={state() === 'ready' || state() === 'refreshing'}>
            <For
              each={data() as DishTV[]}
              fallback={<NoData />}
            >
              {/*(item: DishTV) => <DishContainer {...item} />*/}
              {(item: DishTV) => <>{item.DishName}</>}
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

export default DishesListTV;
