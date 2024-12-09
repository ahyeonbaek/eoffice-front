import Sidebar from '../../components/sidebar/Siderbar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { NavigateButtons } from '../../components/button/Button';
import { ImageUpload } from '../../context/ImgUploadContext';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../../css/meetingStyles/ReserveMeeting.module.css';
import btnstyles from '../../components/button/Button.module.css';
import InputBox from '../../components/input/InputBox';
import Input from '../../components/input/Input';
import Label from '../../components/input/Label';

interface ReserveMeetingType {
  date: string;
  time: string;
  location: string;
  participants: string;
  title: string; //회의실 예약할 때 회의실 제목
  name?: string; //회의실 등록할때 적었던 회의실 이름
}

const ReserveMeeting = () => {
  const navigate = useNavigate();
  const [inputFile, setInputFile] = useState<File | string>();
  const [inputValue, setInputValue] = useState<ReserveMeetingType>({
    date: '',
    time: '',
    location: '',
    participants: '',
    title: '',
    name: ''
  });
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
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
        setInputValue({
          date: '',
          time: '',
          location: data.location,
          participants: '',
          title: '',
          name: data.name
        });
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
    const formData = new FormData();

    formData.append('roomId', id || '');
    formData.append('date', inputValue.date);
    formData.append('startTime', inputValue.time);
    formData.append('participants', inputValue.participants);
    formData.append('title', inputValue.title);

    try {
      const response = await fetch(`/api/reservations`, {
        method: 'POST',
        body: JSON.stringify({
          roomId: id,
          date: inputValue.date,
          startTime: inputValue.time,
          participants: inputValue.participants,
          title: inputValue.title,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        alert('회의실 예약 성공');
        navigate('/meetinglist');
      } else {
        console.log('데이터 저장 실패');
      }
    } catch (err) {
      console.log('회의실 예약 실패', err);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <Footer />
      <div className={styles.meetingroom_box}>
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
              <Label htmlFor="participants" className={styles.label}>
                참여자{' '}
              </Label>
              <Input
                name="participants"
                id="participants"
                onChange={handleInputChange}
                value={inputValue.participants}
                className={styles.input}
              />
            </InputBox>
            <div className={styles.reservemeeting_buttons_box}>
              <NavigateButtons label="회의실 예약하기" onClick={handleReserve} className={btnstyles.button}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReserveMeeting;
