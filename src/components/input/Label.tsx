import { BaseProps } from './InputBox';

interface LabelProps extends BaseProps {
  htmlFor?: string;
  className?: string;
}

const Label = (props: LabelProps) => {
  const { children, htmlFor, className } = props;

  return (
    <>
      <label htmlFor={htmlFor} className={className}>
        {children}
      </label>
    </>
  );
};

export default Label;
