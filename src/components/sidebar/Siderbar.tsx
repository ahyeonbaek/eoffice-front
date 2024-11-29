import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import computerImg from '../../../public/images/computerImage.png';
import { SidebarContext } from '../../context/SidebarContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { selectedMenu, setSelectedMenu } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClickMenu = (menu: string, path: string) => {
    setSelectedMenu(menu);
    navigate(path);
  };


    return(
        <div className={styles.sidebar_box}>
            <div className={styles.sidebar_h1_box}>
                <h1 className={`${selectedMenu === 'E-office' ? styles.sidebar_h1 : styles.sidebar_h1}`}>
                    <a onClick={() => handleClickMenu('E-office', '/home')}>E-office</a></h1>
            </div>
            <div className={styles.sidebar_ul_box}> 
                <ul className={styles.sidebar_ul}>
                    <li className={styles.sidebar_li}>
                        <a className={`${selectedMenu === '회의실 등록' ? styles.selected : styles.sidebar_a}`}
                            onClick={() => handleClickMenu('회의실 등록' , '/addmeeting')}>회의실 등록</a></li> 
                    <li className={styles.sidebar_li}>
                        <a className={`${selectedMenu === '회의실 수정/삭제' ? styles.selected : styles.sidebar_a}`} 
                        onClick={() => handleClickMenu('회의실 수정/삭제', '/editmeeting')}>회의실 수정/삭제</a></li>
                    <li className={styles.sidebar_li}>
                        <a className={`${selectedMenu === '회의실 예약' ? styles.selected : styles.sidebar_a}`} 
                        onClick={() => handleClickMenu('회의실 예약', '/reservemeeting')}>회의실 예약</a></li>
                    <li className={styles.sidebar_li}>
                        <a className={`${selectedMenu === '회의록 작성' ? styles.selected : styles.sidebar_a}`} 
                        onClick={() => handleClickMenu('회의록 작성', '/editmeeting')}>회의록 작성</a></li>
                </ul>
            </div>
            <div className={styles.sidebar_bottom_box}>
                <li className={styles.sidebar_li}><a className={`${selectedMenu === '프로필 수정' ? styles.selected : styles.sidebar_a}`} onClick={() =>  handleClickMenu('프로필 수정', '/profile')}>프로필 수정</a></li>
                <img src={computerImg} className={styles.sidebar_img}/>
            </div>
        </div>
    );
}


export default Sidebar;
