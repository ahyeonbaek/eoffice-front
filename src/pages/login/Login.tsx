import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/loginStyles/Login.module.css';

function Login() {
  const [readUser, setReadUser] = useState({ email: '', password: '' });
  const [userData, setUserData] = useState({ id: '', email: '', name: '' });
  const navigate = useNavigate();

  const handleReadDB = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReadUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickRead = async () => {
    const { email, password } = readUser;
    if (!email || !password) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    }
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
          setUserData({
            id: data.user._id,
            email: data.user.email,
            name: data.user.name,
          });
        } else {
          alert('사용자 정보를 찾을 수 없습니다.');
        }
      } else {
        alert('조회 실패');
      }
    } catch (err) {
      console.log('조회 중 오류 발생:', err);
    }
  };

  const handleClickGoogle = () => (window.location.href = '/api/oauth/google');
  const handleClickKaKao = () => (window.location.href = '/api/oauth/kakao');
  const navigateToSignup = () => navigate('/signup');

  return (
    <div className={styles.loginContainer}>
      {/* <Header /> */}
      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <img
            src="../../../public/images/computerImage.png"
            className={styles.image}
          />
          <button onClick={navigateToSignup} className={styles.signupButton}>
            회원가입
          </button>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.inputField}>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>이메일</label>
              <input
                type="email"
                name="email"
                value={readUser.email}
                onChange={handleReadDB}
                className={styles.input}
                placeholder="이메일 입력"
              />
            </div>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>비밀번호</label>
              <input
                type="password"
                name="password"
                value={readUser.password}
                onChange={handleReadDB}
                className={styles.input}
                placeholder="비밀번호 입력"
              />
            </div>
          </div>
          <div className={styles.oauthButtons}>
            <button
              onClick={handleClickRead}
              className={`${styles.button} ${styles.emailButton}`}
            >
              Login
            </button>
            <button
              onClick={handleClickGoogle}
              className={`${styles.button} ${styles.googleButton}`}
            />
            <button
              onClick={handleClickKaKao}
              className={`${styles.button} ${styles.kakaoButton}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
