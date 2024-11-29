import { useEffect, useState } from 'react';


import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import profileimg from "../../../public/images/ix_user-profile-filled.png";
import guestprofile from "../../../public/images/guest_profile.png";

interface User {
    _id: string;
    name: string;
    email: string;
}

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const fetchUser = async() => {
        const token = localStorage.getItem("token");
        try{
            if(!token) {
                console.log("토큰이 없습니다.")
                return;
            }
            const response = await fetch("/api/user/profile", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if(response.ok) {
                console.log('유저 정보 가져오기 성공',response);
                const data = await response.json();
                setUser(data.user);
            }else{
                console.log('유저정보 가져오기 실패');
            }
        }catch(err) {
            console.log('유저 정보 가져오기 x',err)
        }
    };

    useEffect(() => {
    fetchUser();
    }, []);


    return(
        <div className={styles.header}>
            {user ? (
                <div className={styles.header_box1}>
                    <a className={styles.logo} onClick={() => navigate('/home')}>E-office </a>
                    <a onClick={() => {navigate('/profile')}}>
                        <img src={profileimg} alt="사용자 프로필 이미지" className={styles.header_profile_img}/>
                    </a>
                </div>
            ) : <div>
                   <img src={guestprofile} alt="게스트 프로필 이미지" className={styles.header_profile_img} />
                </div>
            }
        </div>
        )

};

export default Header;