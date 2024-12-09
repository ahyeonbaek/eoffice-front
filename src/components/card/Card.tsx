import { PropsWithChildren } from 'react';

export interface BaseProps extends PropsWithChildren {}
interface CardProps extends BaseProps {
  className?: string;
}

const Card = (props: CardProps) => {
  const { children, className } = props;
  return (
    <>
      <ul className={className}>{children}</ul>
    </>
  );
};

export default Card;
