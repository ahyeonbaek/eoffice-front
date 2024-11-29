import Sidebar from "../../components/sidebar/Siderbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { NavigateButtons } from "../../context/ButtonContext";
import { useNavigate } from "react-router-dom";

const ReserveMeeting = () => {
    const navigate = useNavigate();

    const handlereserve = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <Sidebar />
            <Footer />
        </>
    )
}

export default ReserveMeeting;