import { JSX, Show, createResource } from 'solid-js';
import type { ResourceReturn, Setter } from 'solid-js';

import TabsToggle from '../ui/TabsToggle/TabsToggle';
import fetchCategoriesList from '../utils/fetchCategoriesList';

const CategoryToggle = (props: { setter: Setter<string> }): JSX.Element => {
  const [categoriesList]: ResourceReturn<string[]> =
    createResource(fetchCategoriesList);
  return (
    <Show when={categoriesList()}>
      <TabsToggle
        tabs={categoriesList() as string[]}
        setter={props.setter}
      />
    </Show>
  );
};

export default CategoryToggle;
