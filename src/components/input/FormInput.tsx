import { InputHTMLAttributes } from 'react';
import styles from './FormInput.module.scss';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;

  input: {
    type: string;
    id: string;
    placeholder?: string;
    autoComplete?: string;
  };
}

const FormInput = (props: FormInputProps) => {
  return (
    <div className={styles.form_wrapper}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default FormInput;
