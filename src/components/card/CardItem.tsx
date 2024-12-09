import { BaseProps } from './Card';

interface CardItemProps extends BaseProps {
  className?: string;
  id: number | string;
}

const CardItem = (props: CardItemProps) => {
  const { children, className, id } = props;

  return (
    <>
      <li className={className} key={`card-item-${id}`}>
        {children}
      </li>
    </>
  );
};

export default CardItem;
