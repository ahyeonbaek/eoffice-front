import Sidebar from "../../components/sidebar/Siderbar";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { NavigateButtons } from "../../components/button/Button";
import styles from "../../css/meetingStyles/EditMeeting.module.css";
import btnstyles from "../../components/button/Button.module.css";
import { ImageUpload } from "../../context/ImgUploadContext";
import { addPostType } from "../../types/addmeeting";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import InputBox from "../../components/input/InputBox";
import Label from "../../components/input/Label";

const AddMeeting = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<addPostType>({
    name: "",
    location: "",
    personCount: 0,
  }); //회의실 이름,위치,인원

  const token = localStorage.getItem("token");
  const [inputFile, setInputFile] = useState<File | string>(); //회의실 이미지

  //이름,위치,인원 input Change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  //회의실 등록하기 버튼
  const handleSubmit = async () => {
    if (
      !inputValue.location ||
      !inputValue.name ||
      isNaN(inputValue.personCount)
    ) {
      //person <=0 거나 숫자가아니면 isNaN분기처리
      alert("모든 입력 칸을 작성해주세요");
      return;
    }

    const formData = new FormData(); //서버로 전송 할 객체 생성

    formData.append("name", inputValue.name);
    formData.append("location", inputValue.location);
    formData.append("personCount", inputValue.personCount.toString());
    if (inputFile) {
      formData.append("file", inputFile);
    }

    try {
      const response = await fetch("/api/meeting/meetingrooms", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("데이터 저장 성공");
        navigate("/meetinglist");
      } else {
        console.log("api요청 실패");
        return;
      }
    } catch (err) {
      console.log("데이터 저장 실패", err);
    }
  };

  return (
      <div className={styles.addmeeting_main}>
        <Sidebar />
        <Header />
        <Sidebar />
        <Footer />
        <div className={styles.addmeeting_box}>
          <ImageUpload setUploadImg={setInputFile} />
          <div className={styles.inputBox_box}>
            <InputBox className={styles.inputBox}>
              <Label htmlFor={"name"} className={styles.label}>
                회의실 이름
              </Label>
              <Input
                name={"name"}
                id={"name"}
                onChange={handleInputChange}
                value={inputValue.name}
                className={styles.input}
              />
            </InputBox>
            <InputBox className={styles.inputBox}>
              <Label htmlFor={"location"} className={styles.label}>
                회의실 장소
              </Label>
              <Input
                name={"location"}
                id={"location"}
                onChange={handleInputChange}
                value={inputValue.location}
                className={styles.input}
              />
            </InputBox>
            <InputBox className={styles.inputBox}>
              <Label htmlFor={"personCount"} className={styles.label}>
                인원{" "}
              </Label>
              <Input
                name={"personCount"}
                id={"personCount"}
                type={"number"}
                onChange={handleInputChange}
                value={inputValue.personCount}
                className={styles.input}
              />
            </InputBox>
            <div className={styles.editmeeting_buttons_box}>
              <NavigateButtons
                label="회의실 등록하기"
                onClick={handleSubmit}
                className={btnstyles.button}
              />
            </div>
          </div>
        </div>
      </div>
    )
}


export default AddMeeting;
