import { JSX } from 'solid-js';

import styles from './TextArea.module.css';

const TextArea = (
  props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    redBorder?: boolean;
  },
): JSX.Element => (
  <textarea
    class={`${styles.textarea} ${props.redBorder ? styles.textarea_red_border : ''}`}
    placeholder={props.placeholder}
    name={props.name}
    value={props.value}
    oninput={props.oninput}
  />
);

export default TextArea;
