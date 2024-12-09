import { ChangeEvent } from 'react';
import { BaseProps } from './InputBox';

interface InputProps extends BaseProps {
  type?: 'number' | 'text' | 'email' | 'password' | 'file' | 'date' | 'time';
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  title?: string;
  required?: boolean;
  readonly?: boolean;
}

const Input = (props: InputProps) => {
  const {
    type,
    name,
    id,
    placeholder,
    className,
    value,
    onChange,
    pattern,
    title,
    required,
  } = props;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={handleOnChange}
        pattern={pattern}
        title={title}
        required={required}
      />
    </>
  );
};

export default Input;
