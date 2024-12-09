import styles from '../../css/loginStyles/Login.module.css';
import InputBox from '../../components/input/InputBox';
import Input from '../../components/input/Input';
import Label from '../../components/input/Label';
import computerImage from '../../../public/img/computerImage.png';
import { NavigateButtons } from '../../components/button/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [readUser, setReadUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReadUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = readUser;

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해 주세요.');
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email:readUser.email, password:readUser.password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.isError && data.user) {
          alert('로그인 성공!');
          localStorage.setItem('token', data.token);
          navigate('/home');
        }
      } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error('로그인 중 오류 발생:', err);
    }
  };

  const handleClickOauth = () => {
    window.location.href = `/api/oauth/google`;
  };

  const navigateToSignup = () => navigate('/signup');

  return (
    <div className={styles.loginContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <img src={computerImage} className={styles.image} alt="Computer" />
          <NavigateButtons
            label="회원가입"
            onClick={navigateToSignup}
            className={styles.signupButton}
          />
        </div>
        <div className={styles.rightSection}>
          <form onSubmit={handleSubmit} className={styles.inputField}>
            <InputBox className={styles.inputRow}>
              <Label className={styles.inputLabel}>이메일</Label>
              <Input
                type={'email'}
                name={'email'}
                value={readUser.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={'이메일 입력'}
                required={true}
              />
            </InputBox>

            <InputBox className={styles.inputRow}>
              <Label className={styles.inputLabel}>비밀번호</Label>
              <Input
                type={'password'}
                name={'password'}
                value={readUser.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={'비밀번호 입력'}
                required={true}
              />
            </InputBox>
            <div className={styles.buttons}>
              <NavigateButtons
                label="로그인"
                onClick={() => handleSubmit}
                className={`${styles.button} ${styles.emailButton}`}
              />
              <NavigateButtons
                label=""
                onClick={handleClickOauth}
                className={`${styles.button} ${styles.googleButton}`}
              />
            </div>          
          </form>
          
        </div>
      </div>
    </div>
  );
}

export default Login;
