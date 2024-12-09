import { User } from '../../types/user';
import styles from './Header.module.css';

// import guestprofile from '../../../public/images/guest_profile.png';
// import profileimg from '../../../public/img/ix_user-profile-filled.png';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate(); //프로필사진 업데이트하면 user정보에 들어가는지 이미지 폴더에 들어가는지

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    // const userId = localStorage.getItem("userId")
    try {
      if (!token) {
        console.log('토큰이 없습니다.');
        return;
      }
      const response = await fetch('/api/user/userprofile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log('유저 정보 가져오기 성공', response);
        const data = await response.json(); //유저의 정보를 가져와서 사진이 없으면 defaultimg, 사진 업로드한게 있으면 보여주기
        setUser(data.user);
        console.log(data.user);
      } else {
        console.log('유저정보 가져오기 실패');
      }
    } catch (err) {
      console.log('유저 정보 가져오기 x', err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.header}>
      {user ? (
        <div className={styles.header_box1}>
          <a className={styles.logo} onClick={() => navigate('/home')}>
            E-office{' '}
          </a>
          <a
            onClick={() => {
              navigate('/profile');
            }}
          >
            <img
              src={user.profileImage}
              alt="사용자 프로필 이미지"
              className={styles.header_profile_img}
            />
          </a>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Header;
