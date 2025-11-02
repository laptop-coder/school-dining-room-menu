import { JSX } from 'solid-js';

import styles from './Input.module.css';

const Input = (
  props: JSX.InputHTMLAttributes<HTMLInputElement> & { redBorder?: boolean },
): JSX.Element => (
  <input
    class={`${styles.input} ${props.redBorder ? styles.input_red_border : ''}`}
    type={props.type || 'text'}
    placeholder={props.placeholder}
    name={props.name}
    value={props.value}
    oninput={props.oninput}
  />
);

export default Input;
