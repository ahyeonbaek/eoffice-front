import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Siderbar';
import styles from '../../css/meetingStyles/CreateMinutes.module.css';
import Input from '../../components/input/Input';
import Label from '../../components/input/Label';
import InputBox from '../../components/input/InputBox';

import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateButtons } from '../../components/button/Button';

const CreateMinutes = () => {
  const navigator = useNavigate();

  const token = localStorage.getItem('token');

  const [meetingInput, setMeetingInput] = useState({
    meetingTitle: '',
    meetingDate: '',
    meetingAttendee: 0,
    meetingContent: '',
  });

  const handleOnChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (e.target.type === 'number') {
      const filterZero = e.target.value.toString();

      if (filterZero[0] === '0') {
        return;
      }
    }

    setMeetingInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitMeetingData = async () => {
    if (meetingInput.meetingTitle === '') {
      alert('회의 제목을 입력해주세요.');
    } else if (meetingInput.meetingDate === '') {
      alert('일시를 입력해주세요.');
    } else if (meetingInput.meetingAttendee <= 0) {
      alert('참가자 수를 입력해주세요.');
    } else if (meetingInput.meetingContent === '') {
      alert('회의 내용을 입력해주세요.');
    } else {
      try {
        const meetingDataRequest = await fetch('/api/meeting/minutes', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: meetingInput.meetingTitle,
            date: meetingInput.meetingDate,
            attendees: meetingInput.meetingAttendee,
            content: meetingInput.meetingContent,
          }),
        });

        if (meetingDataRequest.status === 201) {
          const { message } = await meetingDataRequest.json();
          alert(`${message}`);
          navigator('/minuteslist');
        } else {
          alert('등록 요청에 실패했습니다. 다시 시도해주세요.');
          return;
        }
      } catch (err) {
        alert('시스템 에러가 발생했습니다. 다시 시도해주세요.');
        return;
      }
    }
  };

  return (
      <div className={styles.container}>
        <Header />
        <Sidebar />
        <div className={styles.main_container}>
          <main className={styles.main}>
            <div className={styles.main_content}>
              <div className={styles.inputs_wrap}>
                <InputBox className={styles.input_wrap}>
                  <Label className={styles.label} htmlFor={'meetingTitle'}>
                    회의제목
                  </Label>
                  <Input
                    className={styles.input}
                    type={'text'}
                    id={'meetingTitle'}
                    name={'meetingTitle'}
                    value={meetingInput.meetingTitle}
                    onChange={handleOnChangeInput}
                  />
                </InputBox>

                <InputBox className={styles.input_wrap}>
                  <Label className={styles.label} htmlFor={'meetingDate'}>
                    일시
                  </Label>
                  <Input
                    className={styles.input}
                    type={'date'}
                    id={'meetingDate'}
                    name={'meetingDate'}
                    value={meetingInput.meetingDate}
                    onChange={handleOnChangeInput}
                  />
                </InputBox>

                <InputBox className={styles.input_wrap}>
                  <Label className={styles.label} htmlFor={'meetingAttendee'}>
                    인원
                  </Label>
                  <Input
                    className={styles.input}
                    type={'number'}
                    id={'meetingAttendee'}
                    name={'meetingAttendee'}
                    value={meetingInput.meetingAttendee}
                    onChange={handleOnChangeInput}
                  />
                </InputBox>

                <div className={styles.input_wrap}>
                  <label className={styles.label} htmlFor="meetingContent">
                    회의 내용
                  </label>

                  <textarea
                    className={styles.textarea}
                    name="meetingContent"
                    id="meetingContent"
                    value={meetingInput.meetingContent}
                    onChange={handleOnChangeInput}
                  ></textarea>
                </div>
              </div>
              <NavigateButtons
                label={'작성완료'}
                className={styles.button}
                onClick={handleSubmitMeetingData}
              ></NavigateButtons>
            </div>
          </main>
          <Footer />
        </div>
      </div>
  );
};

export default CreateMinutes;
