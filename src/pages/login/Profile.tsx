import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from '../../css/loginStyles/Profile.module.css';
import Sidebar from '../../components/sidebar/Siderbar';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

/** api call
 * 로드 시 이미지 가져오는 패치 하나 /api/editprofile/loadimage
 * 디비로 날리는 거 하나 /api/editprofile/updateimage
 */

const EditProfile = () => {
  const navigator = useNavigate();

  const token = localStorage.getItem('token') ?? '';

  const [passwords, setPassword] = useState({
    password: '',
    passwordComfirmed: '',
  });

  const [loadProfileImage, setLoadProfileImage] = useState<string>();
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
      return;
    } else if (passwords.password !== passwords.passwordComfirmed) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if (!inputFile) {
      alert('사진을 넣어주세요');
      return;
    } else {
      formData.append('password', passwords.password);
      formData.append('profileImage', inputFile);

      try {
        const editProfileRequest = await fetch('/api/user/update', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (editProfileRequest.status === 200) {
          const { isError, user } = await editProfileRequest.json();

          if (!isError && user) {
            const { profileImage } = user;

            setLoadProfileImage(profileImage);
          } else {
            alert('일치하는 유저가 없습니다.');
            return;
          }
        } else if (editProfileRequest.status === 401) {
          const { isError, message } = await editProfileRequest.json();

          if (!isError) {
            alert(`${message}`);
            localStorage.removeItem('token');
            navigator('/Login');
            return;
          }
        } else if (editProfileRequest.status === 400) {
          const { isError, message } = await editProfileRequest.json();

          if (isError) {
            alert(`${message}`);
            return;
          }
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
      const LoadProfileRequest = await fetch('/api/user/update', {
        method: 'POST',
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

            setLoadProfileImage(profileImage);
          }
        }
      } else if (LoadProfileRequest.status === 401) {
        const { isError, message } = await LoadProfileRequest.json();

        if (!isError) {
          alert(`${message}`);
          localStorage.removeItem('token');
          navigator('/Login');
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
        return;
      }
    } catch (err) {
      alert('시스템 에러 발생!');
      return;
    }
  };
  useEffect(() => {
    getProfileFetch();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.main_container}>
          <Header />
          <main className={styles.main}>
            <div className={styles.main_content}>
              <div className={styles.default_image}>
                <label htmlFor="profileImage">
                  <img
                    className={styles.logo_image}
                    src={
                      srcUrl || loadProfileImage
                        ? srcUrl || loadProfileImage
                        : '../../../public/images/default-image.png'
                    }
                  />
                </label>
                <input
                  className={styles.input_file}
                  type="file"
                  name="profileImage"
                  id="profileImage"
                  onChange={handleInputFile}
                />
              </div>

              <div className={styles.inputs_wrap}>
                <div className={styles.input_wrap}>
                  <label className={styles.label} htmlFor="password">
                    비밀번호
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="password"
                    name="password"
                    onChange={handlePasswordOnChange}
                  />
                </div>

                <div className={styles.input_wrap}>
                  <label className={styles.label} htmlFor="passwordComfirmed">
                    비밀번호 확인
                  </label>
                  <input
                    className={styles.input}
                    type="text"
                    id="passwordComfirmed"
                    name="passwordComfirmed"
                    onChange={handlePasswordOnChange}
                  />
                </div>
                {/* {JSON.stringify(passwords)} */}
              </div>

              <button className={styles.button} onClick={handleOnSubmit}>
                프로필 수정
              </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
