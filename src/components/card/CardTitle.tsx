import { BaseProps } from './Card';

interface CardTitleProps extends BaseProps {
  className?: string;
  onClick?:() => void;
}

const CardTitle = (props: CardTitleProps) => {
  const { children, className , onClick} = props;
  return (
    <>
      <p className={className} onClick={onClick}>{children}</p>
    </>
  );
};

export default CardTitle;
