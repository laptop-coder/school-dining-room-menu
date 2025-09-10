import { JSX } from 'solid-js';

import styles from './Input.module.css';

const Input = (
  props: JSX.InputHTMLAttributes<HTMLInputElement>,
): JSX.Element => (
  <input
    class={styles.input}
    type={props.type || 'text'}
    placeholder={props.placeholder}
    name={props.name}
    value={props.value}
    oninput={props.oninput}
  />
);

export default Input;
