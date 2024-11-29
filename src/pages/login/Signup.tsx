import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../css/loginStyles/Signup.module.css';

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = userDetails;

    if (!email || !name || !password || !confirmPassword) {
      alert('모든 필드를 입력하세요.');
      return;
    }

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('회원가입 성공!');
        console.log('회원가입 성공:', data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        if (errorData.message === '이미 존재하는 이메일입니다.') {
          alert('이미 사용 중인 이메일입니다. 다른 이메일을 사용하세요.');
        } else {
          alert('회원가입 실패. 다시 시도하세요.');
        }
        console.error('회원가입 실패:', errorData);
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
    }
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.signupContainer}>

      <div className={styles.mainContent}>
        <div className={styles.leftSection}>
          <div className={styles.inputField}>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>이름</label>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="이름 입력"
              />
            </div>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>이메일</label>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="이메일 입력"
              />
            </div>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>비밀번호</label>
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="비밀번호 입력"
              />
            </div>
            <div className={styles.inputRow}>
              <label className={styles.inputLabel}>비밀번호 확인</label>
              <input
                type="password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="비밀번호 확인"
              />
            </div>
          </div>
          <button onClick={handleSignup} className={styles.signupButton}>
            회원가입
          </button>
        </div>
        <div className={styles.rightSection}>
          <img
            src="../../../public/image/computerImage.png"
            className={styles.image}
            alt="Computer"
          />
          <button onClick={navigateToLogin} className={styles.loginButton}>
            로그인
          </button>
        </div>
      </div>
      <footer className={styles.footer}>
        © 2024 E-Office. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Signup;
