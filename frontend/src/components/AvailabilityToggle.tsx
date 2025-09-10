import { JSX } from 'solid-js';
import type { Setter } from 'solid-js';

import TabsToggle from '../ui/TabsToggle/TabsToggle';

const AvailabilityToggle = (props: { setter: Setter<string> }): JSX.Element => (
  <TabsToggle
    tabs={['Доступно сейчас', 'Нет в наличии', 'Полное меню']}
    setter={props.setter}
    tabsHTMLElementId='availability_toggle'
  />
);

export default AvailabilityToggle;
