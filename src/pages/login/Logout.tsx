import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Siderbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "../../css/loginStyles/Logout.module.css";
import logoutImage from "../../../public/img/wallpaper.png"; 

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = confirm("로그아웃 하겠습니까?");
    if (confirmLogout) {
      alert("로그아웃 되었습니다.");
      localStorage.removeItem("token");
      navigate("/login");
    } else {
      alert("취소되었습니다.");
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className={styles.container}>
        <div className={styles.leftSection}>
            <img src={logoutImage} alt="Logout Illustration" />
        </div>
        <div className={styles.rightSection}>
            <p>
                안전한 로그아웃을 위해 아래 버튼을 눌러주세요.
                <br />
                로그아웃 후에는 서비스를 계속 이용하려면 다시 로그인해야 합니다.
            </p>
            <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
        </div>
        <Footer />
    </>
  );
};

export default Logout;