import Sidebar from "../../components/sidebar/Siderbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { NavigateButtons } from "../../components/button/Button";
import styles from "../../css/meetingStyles/AddMeeting.module.css";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "../../context/ImgUploadContext";

interface addPostType {
    name: string;
    location: string;
    person: number;
}

const AddMeeting = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        name: "",
        location:"",
        person: ""
    }); //회의실 이름,위치,인원 

    const [inputFile, setInputFile] = useState<File>(); //회의실 이미지


    //이름,위치,인원 input Change
    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputValue({...inputValue, [name] : value});
    }


    //회의실 등록하기 버튼
    const handleSubmit = async() => {
        if(!inputValue.location || !inputValue.name || !inputValue.person) {
            alert("모든 입력 칸을 작성해주세요");
            return;
        }

        const formData = new FormData(); //서버로 전송 할 객체 생성

        formData.append("name", inputValue.name);
        formData.append("location", inputValue.location);
        formData.append("person", inputValue.person);
        if(inputFile) {
            formData.append("file", inputFile);
        }

        try{
            const response = await fetch('/api/meeting/meetingrooms', {
                method: "POST",
                body: formData,
            });
            if(response.ok) {
                console.log('데이터 저장 성공');
            }else{
                console.log('api요청 실패');
                return;
            }
        }catch(err) {
            console.log('데이터 저장 실패', err);
        }
        navigate('/meetinglist');
    }

    return (
        <div className={styles.addmeeting_main}>
        <Header />
        <Sidebar />
        <Footer />
            <div className={styles.addmeeting_total_box}>
                <ImageUpload setUploadImg={setInputFile} />
                <div className={styles.addmeeting_input_box}>
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>이름</label>
                        <input className={styles.addmeeting_input} onChange={handleInputChange} name="name"/>
                    </div >
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>위치</label>
                        <input className={styles.addmeeting_input} onChange={handleInputChange} name="location"/>
                    </div>
                    <div className={styles.addmeeting_input_name_box}>
                        <label className={styles.addmeeting_input_label}>인원</label>
                        <input className={styles.addmeeting_input} onChange={handleInputChange} name="person"/>
                    </div>
                    <NavigateButtons label="회의실 등록하기" onClick={handleSubmit}/>
                </div>
            </div>
        </div> 
    )
}


export default AddMeeting;