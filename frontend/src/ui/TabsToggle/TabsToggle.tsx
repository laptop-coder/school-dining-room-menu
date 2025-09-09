import { JSX, createSignal, onMount, For, createEffect } from 'solid-js';
import type { Signal, Setter } from 'solid-js';

import TabsToggleWrapper from '../TabsToggleWrapper/TabsToggleWrapper'
import styles from './TabsToggle.module.css';

import { Motion } from 'solid-motionone';

const TabsToggle = (props: {
  tabs: string[];
  setter: Setter<any>;
}): JSX.Element => {
  const [activeTab, setActiveTab] = createSignal(0);
  const [activeTabInfo, setActiveTabInfo]: Signal<{
    left: number;
    width: string;
  }> = createSignal({ left: 0, width: '0px' });
  const tabsRefs: HTMLButtonElement[] = [];
  onMount(() => {
    createEffect(() => {
      const rect = tabsRefs[activeTab()].getBoundingClientRect();
      setActiveTabInfo({ left: rect.left, width: String(rect.width) + 'px' });
    });
  });
  props.setter(props.tabs[0]);
  return (
    <TabsToggleWrapper>
      <div class={styles.tabs}>
        <For each={props.tabs}>
          {(tab, index) => (
            <button
              ref={(el) => (tabsRefs[index()] = el)}
              onClick={() => {
                setActiveTab(index());
                props.setter(props.tabs[index()]);
              }}
              class={styles.tab}
            >
              <span class={styles.tab_text}>{tab}</span>
            </button>
          )}
        </For>
      </div>
      <Motion
        initial={false}
        animate={{ x: activeTabInfo().left, width: activeTabInfo().width }}
        transition={{ duration: 0.3 }}
        class={styles.pointer}
      />
    </TabsToggleWrapper>
  );
};

export default TabsToggle;
