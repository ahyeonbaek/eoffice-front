import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from '../../css/loginStyles/Profile.module.css';
import Sidebar from '../../components/sidebar/Siderbar';
import Input from '../../components/input/Input';
import InputBox from '../../components/input/InputBox';
import Label from '../../components/input/Label';
import defaultImage from '../../../public/img/default-image.png';
import { NavigateButtons } from '../../components/button/Button';

import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/** api call
 * 로드 시 이미지 가져오는 패치 하나 /api/editprofile/loadimage
 * 디비로 날리는 거 하나 /api/editprofile/updateimage
 */

const EditProfile = () => {
  const navigator = useNavigate();

  const token = localStorage.getItem('token');

  const [passwords, setPassword] = useState({
    //사용자가
    password: '',
    passwordComfirmed: '',
  });

  const [loadProfileImage, setLoadProfileImage] = useState<string>(); //맨 처음 이미지
  const [inputFile, setInputFile] = useState<File>();
  const [srcUrl, setSrcUrl] = useState<string>();

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const localImage = URL.createObjectURL(file);

      setInputFile(file);
      setSrcUrl(localImage);
    } else {
      alert('프로필 이미지에 넣을 사진을 선택해주세요.');
      return;
    }
  };

  const handlePasswordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async () => {
    const formData = new FormData();

    if (passwords.password === '' || passwords.passwordComfirmed === '') {
      alert('비밀번호를 입력해주세요.');
    } else if (passwords.password !== passwords.passwordComfirmed) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (!inputFile) {
      alert('사진을 넣어주세요');
    } else {
      formData.append('password', passwords.password);
      formData.append('profileImage', inputFile);

      try {
        const editProfileRequest = await fetch('/api/user/update', {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (editProfileRequest.status === 200) {
          const { isError, message } = await editProfileRequest.json();

          if (!isError) {
            alert(message);
            navigator('/home');
          } else {
            alert('일치하는 유저가 없습니다.');
          }
        } else if (editProfileRequest.status === 401) {
          const { isError, message } = await editProfileRequest.json();

          if (!isError) {
            alert(`${message}`);
            localStorage.removeItem('token');
            navigator('/login');
            return;
          }
        } else if (editProfileRequest.status === 400) {
          const { message } = await editProfileRequest.json();
          alert(`${message}`);
        } else if (editProfileRequest.status === 500) {
          const { isError, message } = await editProfileRequest.json();

          if (isError) {
            alert(`${message}`);
            return;
          }
        } else {
          alert('서버와 통신을 실패했습니다. 다시 시도해주세요.');
          return;
        }
      } catch (err) {
        alert('시스템 에러 발생!');
        return;
      }
    }
  };

  // 로컬 스토리지
  const getProfileFetch = async () => {
    try {
      const LoadProfileRequest = await fetch('/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (LoadProfileRequest.status === 200) {
        const LoadProfileData = await LoadProfileRequest.json();

        if (LoadProfileData) {
          const { isError, user } = LoadProfileData;

          if (!isError && user) {
            const { profileImage } = user;
            setLoadProfileImage(profileImage); //데이터 처음에 받은것을 image를 state에 넣어줌
          }
        }
      } else if (LoadProfileRequest.status === 401) {
        const { isError, message } = await LoadProfileRequest.json();

        if (isError) {
          alert(`${message}`);
          localStorage.removeItem('token');
          navigator('/login');
          return;
        }
      } else if (LoadProfileRequest.status === 400) {
        const { isError, message } = await LoadProfileRequest.json();

        if (isError) {
          alert(`${message}`);
          return;
        }
      } else if (LoadProfileRequest.status === 500) {
        const { isError, message } = await LoadProfileRequest.json();

        if (isError) {
          alert(`${message}`);
          return;
        }
      } else {
        alert('서버와 통신을 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      alert('시스템 에러 발생!');
      return;
    }
  };
  useEffect(() => {
    getProfileFetch();
  }, []); //

  return (
    <>
      <div className={styles.container}>
        <Header />
        <Sidebar />

        <div className={styles.main_container}>
          <main className={styles.main}>
            <div className={styles.main_content}>
              <InputBox className={styles.default_image}>
                <Label htmlFor={'profileImage'}>
                  <img
                    className={styles.logo_image}
                    src={
                      srcUrl || loadProfileImage
                        ? srcUrl || loadProfileImage
                        : defaultImage
                    }
                  />
                </Label>
                <Input
                  className={styles.input_file}
                  type={'file'}
                  name={'profileImage'}
                  id={'profileImage'}
                  onChange={handleInputFile}
                />
              </InputBox>

              <div className={styles.inputs_wrap}>
                <InputBox className={styles.input_wrap}>
                  <Label className={styles.label} htmlFor={'password'}>
                    비밀번호
                  </Label>
                  <Input
                    className={styles.input}
                    type={'password'}
                    id={'password'}
                    name={'password'}
                    onChange={handlePasswordOnChange}
                  />
                </InputBox>

                <InputBox className={styles.input_wrap}>
                  <Label className={styles.label} htmlFor={'passwordComfirmed'}>
                    비밀번호 확인
                  </Label>
                  <Input
                    className={styles.input}
                    type={'password'}
                    id={'passwordComfirmed'}
                    name={'passwordComfirmed'}
                    onChange={handlePasswordOnChange}
                  />
                </InputBox>
              </div>

              <NavigateButtons
                className={`${styles.button} ${styles.cursor_pointer}`}
                label={'프로필 수정'}
                onClick={handleOnSubmit}
              ></NavigateButtons>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
