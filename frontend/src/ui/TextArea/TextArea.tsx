import { JSX } from 'solid-js';

import styles from './TextArea.module.css';

const TextArea = (
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
): JSX.Element => (
  <textarea
    class={styles.textarea}
    placeholder={props.placeholder}
    name={props.name}
    value={props.value}
    oninput={props.oninput}
  />
);

export default TextArea;
