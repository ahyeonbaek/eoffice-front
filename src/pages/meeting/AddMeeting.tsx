
import Sidebar from "../../components/sidebar/Siderbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { NavigateButtons } from "../../context/ButtonContext";
import styles from "../../css/meetingStyles/AddMeeting.module.css";
import { ChangeEvent, useState } from "react";
import Rectangle from '../../../public/images/Rectangle 27.png';
import { useNavigate } from "react-router-dom";

const AddMeeting = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        location:"",
        person: ""
    });

    const [inputFile, setInputFile] = useState<File>();


    //이름,위치,인원 input Change
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name] : value});
    }

    //이미지 업로드
    const handleImageUpload = (e:ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) {
            return;
        }

        if(e.target.files[0]) {
            setInputFile(e.target.files[0]);
        }
    }

    //회의실 등록하기 버튼
    const handleSubmit = async() => {
        try{
            const response = await fetch('/api', {
                method: "POST"

            });
        }catch(err) {
            console.log('데이터 저장 실패', err)
        }

        navigate('/meetinglist');
    }

    return (
        <div className={styles.addmeeting_main}>
        <Header />
        <Sidebar />
        <Footer />
            <div className={styles.addmeeting_box}>
                <label htmlFor="Image">
                    <img
                        className={styles.addmeeting_default_img}
                        src={Rectangle}
                        alt="프로필 이미지"
                        />
                </label>
                <input
                    className={styles.addmeeting_input_file}
                    type="file"
                    name="profileImage"
                    id="Image"
                    />
                <div className={styles.addmeeting_input_box}>
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>이름</label>
                        <input className={styles.addmeeting_input}/>
                    </div >
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>위치</label>
                        <input className={styles.addmeeting_input}/>
                    </div>
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>인원</label>
                        <input className={styles.addmeeting_input}/>
                    </div>
                </div>
            </div>
        <NavigateButtons label="회의실 등록하기" onClick={handleSubmit}/>
        </div> 
    )
}


export default AddMeeting;
