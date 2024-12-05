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

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.isError && data.user) {
          alert('로그인 성공!');
          localStorage.setItem('token', data.token);
          navigate('/home');
        } else {
          alert('사용자 정보를 찾을 수 없습니다.');
        }
      } else {
        alert('로그인 실패. 다시 시도하세요.');
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
          <button onClick={navigateToSignup} className={styles.signupButton}>
            회원가입
          </button>
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
            <NavigateButtons
              label="구글 로그인"
              onClick={() => handleClickOauth}
            />
          </form>
          <div className={styles.oauthButtons}>
            <NavigateButtons
              label="구글 로그인"
              onClick={() => handleClickOauth}
            />
            {/* <button
              onClick={() => handleClickOauth}
              className={`${styles.button} ${styles.googleButton}`}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
