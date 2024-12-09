import styles from './Sidebar.module.css';
import computerImg from '../../../public/img/computerImage.png';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const [pathName, setPathName] = useState('');
  const navigate = useNavigate();

  const handleClickMenu = (path: string) => {
    navigate(path, { replace: true });
  };

  const location = useLocation();

  const Menu = [
    { label: '회의실 등록', path: '/addmeeting' },
    { label: '회의실 관리', path: '/meetinglist' },
    // { label: '회의실 예약', path: '/reservemeeting' },
    { label: '회의록 작성', path: '/createminutes' },
    { label: '회의록 목록', path: '/minuteslist' },
  ];

  useEffect(() => {
    const { pathname } = location;
    console.log(location);
    setPathName(pathname);
  }, []);

  return (
    <div className={styles.sidebar_box}>
      <div className={styles.sidebar_h1_box}>
        <h1
          className={`${
            pathName === '/home' ? styles.sidebar_h1 : styles.sidebar_h1
          }`}
        >
          <a
            onClick={() => handleClickMenu('/home')}
            className={styles.sidebar_logo_a}
          >
            E-office
          </a>
        </h1>
      </div>
      <div className={styles.sidebar_ul_box}>
        <ul className={styles.sidebar_ul}>
          {Menu.map((item, index) => (
            <li className={styles.sidebar_li} key={index}>
              <a
                className={`${
                  pathName === item.path ? styles.selected : styles.sidebar_a
                }`}
                onClick={() => handleClickMenu(item.path)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.sidebar_bottom_box}>
        <li className={styles.sidebar_li}>
          <a
            className={`${
              pathName === '/profile' ? styles.selected : styles.sidebar_a
            }`}
            onClick={() => handleClickMenu('/profile')}
          >
            프로필 수정
          </a>
        </li>
        <li className={styles.logout_button_li}>
        <a
            className={styles.logout}
            onClick={() => handleClickMenu('/logout')} 
          >
            LOGOUT
          </a>
        </li>
        <img src={computerImg} className={styles.sidebar_img} />
      </div>
    </div>
  );
};

export default Sidebar;