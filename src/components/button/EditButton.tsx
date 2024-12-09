import styles from './EditButton.module.css';
import pencil from '../../../public/img/mdi_pencil.png';

interface EditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <div>
      <a onClick={onClick}>
        <img src={pencil} className={styles.edit_button} />
      </a>
    </div>
  );
};
