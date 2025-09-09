import { JSX, Show, createResource } from 'solid-js';
import type { ResourceReturn, Setter } from 'solid-js';

import TabsToggle from '../ui/TabsToggle/TabsToggle';
import fetchCategoriesList from '../utils/fetchCategoriesList';
import TabsToggleWrapper from '../ui/TabsToggleWrapper/TabsToggleWrapper'

const CategoryToggle = (props: { setter: Setter<string> }): JSX.Element => {
  const [categoriesList]: ResourceReturn<string[]> =
    createResource(fetchCategoriesList);
  return (
    <Show when={categoriesList()} fallback={<TabsToggleWrapper/>}>
      <TabsToggle
        tabs={categoriesList() as string[]}
        setter={props.setter}
      />
    </Show>
  );
};

export default CategoryToggle;
