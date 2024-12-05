import styles from '../../css/loginStyles/Signup.module.css';
import computerImg from '../../../public/img/computerImage.png';
import InputBox from '../../components/input/InputBox';
import Input from '../../components/input/Input';
import Label from '../../components/input/Label';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const patternRegex =
    '^(?=.*[a-zA-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$';

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = userDetails;

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
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        if (errorData.message === '이미 존재하는 이메일입니다.') {
          alert('이미 사용 중인 이메일입니다. 다른 이메일을 사용하세요.');
        } else {
          alert('회원가입 실패. 다시 시도하세요.');
        }
      }
    } catch (err) {
      console.error('회원가입 중 오류 발생:', err);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.mainContent}>
        <form onSubmit={handleSignup} className={styles.leftSection}>
          <div className={styles.inputField}>
            <InputBox className={styles.inputRow}>
              <Label className={styles.inputLabel}>이름</Label>
              <Input
                type={'text'}
                name={'name'}
                value={userDetails.name}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={'이름 입력'}
                required={true}
              />
            </InputBox>
            <InputBox className={styles.inputRow}>
              <Label className={styles.inputLabel}>이메일</Label>
              <Input
                type={'email'}
                name={'email'}
                value={userDetails.email}
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
                value={userDetails.password}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={'비밀번호 입력'}
                pattern={patternRegex}
                title={
                  '비밀번호는 최소 8자, 문자, 숫자, 특수 문자를 포함해야 합니다.'
                }
                required={true}
              />
            </InputBox>
            <InputBox className={styles.inputRow}>
              <Label className={styles.inputLabel}>비밀번호 확인</Label>
              <Input
                type={'password'}
                name={'confirmPassword'}
                value={userDetails.confirmPassword}
                onChange={handleInputChange}
                className={styles.input}
                placeholder={'비밀번호 확인'}
                required={true}
              />
            </InputBox>
          </div>
          <button type="submit" className={styles.signupButton}>
            회원가입
          </button>
        </form>
        <div className={styles.rightSection}>
          <img src={computerImg} className={styles.image} alt="Computer" />
          <button
            onClick={() => navigate('/login')}
            className={styles.loginButton}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
