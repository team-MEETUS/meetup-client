import { ButtonHTMLAttributes } from 'react';
import styles from './FormButton.module.scss';

interface FormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const FormButton = (props: FormButtonProps) => {
  return <button className={styles.button}>{props.text}</button>;
};

export default FormButton;
