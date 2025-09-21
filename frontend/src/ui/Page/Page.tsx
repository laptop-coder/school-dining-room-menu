import { JSX, ParentProps } from 'solid-js';

import styles from './Page.module.css';
import AdminUnauthorized from '../AdminUnauthorized/AdminUnauthorized';

const Page = (
  props: ParentProps & { admin?: boolean; authorized?: boolean },
): JSX.Element => {
  return (
    <div class={styles.page}>
      {!props.admin || (props.admin && props.authorized) ? (
        props.children
      ) : (
        <AdminUnauthorized />
      )}
    </div>
  );
};

export default Page;
