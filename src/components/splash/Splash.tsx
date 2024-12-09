import styles from './Splash.module.css';
import computerImage from '../../../public/img/computerImage.png';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };
  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.text}>
          업무의 모든 것을 <br />
          하나의 플랫폼에서
        </h1>
        <div className={styles.buttons}>
          <button onClick={navigateToLogin} className={styles.loginButton}>
            로그인
          </button>
          <button onClick={navigateToSignup} className={styles.signupButton}>
            회원가입
          </button>
        </div>
      </div>
      <img src={computerImage} alt="컴퓨터" className={styles.image} />
    </div>
  );
};

export default Splash;
