import Sidebar from '../../components/sidebar/Siderbar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigateButtons } from '../../components/button/Button';
import { ImageUpload } from '../../context/ImgUploadContext';

import styles from '../../css/meetingStyles/ReserveMeeting.module.css';
import Input from '../../components/input/Input';
import InputBox from '../../components/input/InputBox';
import Label from '../../components/input/Label';

import { jwtDecode } from 'jwt-decode';
import { ChangeEvent, useEffect, useState } from 'react';

interface ReserveMeetingType {
  date: string;
  time: string;
  location: string;
  Participants: string;
  title: string; //회의실 예약할 때 회의실 제목
  name?: string; //회의실 등록할때 적었던 회의실 이름
}

const ReserveMeeting = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>('');
  const [inputFile, setInputFile] = useState<File | string>();
  const [inputValue, setInputValue] = useState<ReserveMeetingType>({
    date: '',
    time: '',
    location: '',
    Participants: '',
    title: '',
    // name:'',
  });
  {
    /*회의실 등록하기 쪽이랑 이름 통일 ex)name? title? (name이랑 title다름)/ person? Participants*/
  }
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as { id: string };
      setUserId(decodedToken.id);
      console.log('유저아이디', userId);
    } else {
      console.log('유저아이디 없음');
    }
  }, [token]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    console.log(inputValue);
  };

  const getPost = async () => {
    try {
      const response = await fetch(`/api/meeting/meetingrooms/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const { data } = await response.json();
        console.log(data);
        setInputValue(data);
        setInputFile(data.file);
      } else {
        console.log('회의실 정보 요청 실패');
      }
    } catch (err) {
      console.log('회의실 정보 가져오기 실패', err);
    }
  };

  useEffect(() => {
    getPost();
    console.log('url에서 가져온 회의실 id', id);
  }, []);

  const handleReserve = async () => {
    if (!userId) {
      return;
    }

    const formData = new FormData();

    formData.append('roomId', id || '');
    formData.append('userId', userId);
    formData.append('date', inputValue.date);
    formData.append('startTime', inputValue.time);
    formData.append('participants', inputValue.Participants);
    formData.append('title', inputValue.title);
    // formData.append("name", inputValue.name);

    try {
      const response = await fetch(`/api/reservations`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log('회의실예약 성공');
        navigate('/home');
      } else {
        console.log('데이터 저장 실패');
      }
    } catch (err) {
      console.log('회의실 예약 실패', err);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Footer />
      <div className={styles.meetingroom_title}>
        <h1 className={styles.meetingroome_name_value}>{inputValue.name}</h1>
        <h1 className={styles.h1}>회의실 예약 페이지</h1>
      </div>
      <div className={styles.reservemeeting_box}>
        <ImageUpload
          setUploadImg={setInputFile}
          initialImage={typeof inputFile === 'string' ? inputFile : undefined}
        />
        <div className={styles.inputBox_box}>
          <InputBox className={styles.input_group}>
            <Label htmlFor="title" className={styles.label}>
              회의 제목
            </Label>
            <Input
              name="title"
              id="title"
              onChange={handleInputChange}
              value={inputValue.title}
              className={styles.input}
              readonly
            />
          </InputBox>
          <InputBox className={styles.input_group}>
            <Label htmlFor="location" className={styles.label}>
              회의실 장소
            </Label>
            <Input
              name="location"
              id="location"
              onChange={handleInputChange}
              value={inputValue.location}
              className={styles.input}
              readonly
            />
          </InputBox>
          <InputBox className={styles.input_group}>
            <Label htmlFor="date" className={styles.label}>
              날짜{' '}
            </Label>
            <Input
              name="date"
              id="date"
              type="date"
              onChange={handleInputChange}
              value={inputValue.date}
              className={styles.input}
            />
          </InputBox>
          <InputBox className={styles.input_group}>
            <Label htmlFor="time" className={styles.label}>
              시간{' '}
            </Label>
            <Input
              name="time"
              id="time"
              type="time"
              onChange={handleInputChange}
              value={inputValue.time}
              className={styles.input}
            />
          </InputBox>
          <InputBox className={styles.input_group}>
            <Label htmlFor="Participants" className={styles.label}>
              참여자{' '}
            </Label>
            <Input
              name="Participants"
              id="Participants"
              onChange={handleInputChange}
              value={inputValue.Participants}
              className={styles.input}
            />
          </InputBox>
          <div className={styles.reservemeeting_buttons_box}>
            <NavigateButtons label="회의실 예약하기" onClick={handleReserve} />
          </div>
        </div>
      </div>
      {/* <div className={styles.reserve_box}>
                    <ImageUpload setUploadImg={setInputFile} initialImage={typeof inputFile === "string" ? inputFile :undefined}/>
                <div>
                    <div className={styles.input_group}>
                        <label>회의 제목</label>
                        <input 
                            name="title" 
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label>장소</label>
                        <input 
                            name="location"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.input_group}>
                        <label>날짜</label>
                        <input 
                            name="date" 
                            type="date"
                            onChange={handleChange}
                            />
                    </div>
                    <div className={styles.input_group}>
                        <label>시간</label>
                        <input 
                            name="time" 
                            type="time"
                            onChange={handleChange}
                            />
                    </div>
                    <div className={styles.input_group}>
                        <label>참여자</label>
                        <input 
                            name="Participants"
                            onChange={handleChange}
                        />
                    </div>
                    <NavigateButtons label="회의실 예약하기" onClick={handleReserve} />
                </div>
            </div> */}
    </>
  );
};

export default ReserveMeeting;
