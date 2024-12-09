import Sidebar from '../../components/sidebar/Siderbar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from '../../css/meetingStyles/EditMeeting.module.css';
import btnstyles from '../../components/button/Button.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { ImageUpload } from '../../context/ImgUploadContext';
import { addPostType } from '../../types/addmeeting';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigateButtons } from '../../components/button/Button';
import InputBox from '../../components/input/InputBox';
import Input from '../../components/input/Input';
import Label from '../../components/input/Label';
import Ractangle from '../../../public/img/Rectangle 27.png';

const EditMeeting = () => {
  const [uploadFile, setUploadFile] = useState<File | string>();
  const [inputValue, setInputValue] = useState<addPostType>({
    name: '',
    location: '',
    personCount: 0,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const userData = async () => {
    try {
      const response = await fetch(`/api/meeting/meetingrooms/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        setInputValue({
          name: data.name,
          location: data.location,
          personCount: data.personCount,
        });

        setUploadFile(data.file);
      } else '회의실 정보 요청 실패';
    } catch (err) {
      console.log('회의실 정보 가져오기 실패', err);
    }
  };
  useEffect(() => {
    userData();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handlePostEdit = async () => {
    const token = localStorage.getItem('token');

    if (
      !inputValue.name ||
      !inputValue.location ||
      inputValue.personCount <= 0
    ) {
      alert('모든 입력 칸을 작성해주세요');
      return;
    }

    if (!uploadFile) {
      alert('이미지를 업로드 해주세요');
      return;
    }

    const formData = new FormData();

    formData.append('name', inputValue.name);
    formData.append('location', inputValue.location);
    formData.append('personCount', inputValue.personCount.toString());
    if (uploadFile) {
      formData.append('file', uploadFile);
    }

    try {
      const response = await fetch(`/api/meeting/meetingrooms/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log('회의실 정보 수정 성공');
        alert('회의실 수정이 완료되었습니다.');
        navigate('/meetinglist');
      } else {
        console.log('회의실 정보 수정 실패');
      }
    } catch (err) {
      console.log('회의실 정보 수정 실패', err);
    }
  };

  const handlePostDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`/api/meeting/meetingrooms/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('회의실이 삭제 되었습니다.');
        navigate('/meetinglist');
      } else {
        console.log('회의실 정보 삭제 요청 실패');
      }
    } catch (err) {
      console.log('회의실 정보 삭제 실패', err);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Footer />
      <div className={styles.total_box}>
        <div className={styles.meetingroom_title}>
        <h1 className={styles.h1}>회의실 수정/삭제 페이지</h1>
        </div>
        <div className={styles.editmeeting_box}>
            <ImageUpload setUploadImg={setUploadFile} initialImage={typeof uploadFile === "string" ? uploadFile :Ractangle}/>
            <div className={styles.inputBox_box}>
                <InputBox className={styles.inputBox}>
                    <Label htmlFor={"name"} className={styles.label}>회의실 이름</Label>
                    <Input name={"name"} id={"name"} onChange={handleInputChange} value={inputValue.name} className={styles.input}/>
                </InputBox>
                <InputBox className={styles.inputBox}>
                    <Label htmlFor={"location"} className={styles.label}>회의실 장소</Label>
                    <Input name={"location"} id={"location"} onChange={handleInputChange} value={inputValue.location} className={styles.input}/>
                </InputBox>
                <InputBox className={styles.inputBox}>
                    <Label htmlFor={"personCount"} className={styles.label}>인원 </Label>
                    <Input name={"personCount"} id={"personCount"} type={"number"} onChange={handleInputChange} value={inputValue.personCount} className={styles.input}/>
                </InputBox >
                <div className={styles.editmeeting_buttons_box}>
                    <NavigateButtons label="수정하기" onClick={handlePostEdit} className={btnstyles.button} />
                    <NavigateButtons label="삭제하기" onClick={handlePostDelete} className={btnstyles.button} />
                </div>
            </div>
        </div>
        </div>
      </div>
    )
}


export default EditMeeting;
