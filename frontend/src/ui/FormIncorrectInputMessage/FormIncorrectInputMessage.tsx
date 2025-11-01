import { JSX, ParentProps } from 'solid-js';

import styles from './FormIncorrectInputMessage.module.css';

const FormIncorrectInputMessage = (props: ParentProps): JSX.Element => (
  <div class={styles.form_incorrect_input_message}>{props.children}</div>
);

export default FormIncorrectInputMessage;
