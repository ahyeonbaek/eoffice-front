import styles from '../../css/meetingStyles/minutesList.module.css';
import { useContext, useEffect } from 'react';
import { PageContext } from './Page';

const PageList = () => {
  const { minutes, currentPage, pageSize, sliceMinutes, setSliceMinutes } =
    useContext(PageContext);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  useEffect(() => {
    setSliceMinutes(minutes.slice(start, end));
  }, [minutes, currentPage, pageSize]);

  return (
    <>
      {sliceMinutes.map((minute, index) => (
        <div className={styles.minutes_list_wrap} key={`minutes-key-${index}`}>
          <div className={styles.minutes_unit}>
            <ul className={styles.minutes_info}>
              <li className={styles.minutes_title}>
                회의록 제목: {minute.title}
              </li>
              <li className={styles.minutes_date}>회의 날짜: {minute.date}</li>
              <li className={styles.minutes_attendee}>
                회의 참석자 수 :{minute.attendees}
              </li>
              <li className={styles.minutes_createAt}>
                작성 날짜: {minute.createdAt}
              </li>
            </ul>

            <div className={styles.minutes_content}>{minute.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PageList;
