import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Siderbar';
import styles from '../../css/meetingStyles/minutesList.module.css';
import Page from '../../components/paginator/Page';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE_INDEX = 0;

type minutesProps = {
  title: string;
  date: string;
  attendees: number;
  content: string;
  createdAt: string;
};

const MinutesList = () => {
  const token = localStorage.getItem('token');

  const [minutes, setMinutes] = useState<minutesProps[]>([]);
  const [searchParam, setSearchParams] = useSearchParams({
    page: (DEFAULT_PAGE_INDEX + 1).toString(),
  });

  const currentPage = searchParam.get('page') || '1';

  const handleChangePage = (pageIndex: number) => {
    setSearchParams({ page: pageIndex.toString() });
  };

  const initfetch = async () => {
    try {
      const getMinutesRequest = await fetch('/api/meeting/minutes/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (getMinutesRequest.status === 200) {
        const { isError, data } = await getMinutesRequest.json();

        console.log(getMinutesRequest);

        if (!isError) {
          setMinutes(data);
          console.log(data);
        }
      }
    } catch (err) {
      alert('시스템 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    setSearchParams({ page: currentPage });
    initfetch();
  }, []);

  return (
      <div className={styles.container}>
        <Header />
        <Sidebar />
        <div className={styles.main_container}>
          <main className={styles.main}>
            <div className={styles.main_content}>
              <div className={styles.minutes_list_container}>
                <Page
                  defaultPageIndex={DEFAULT_PAGE_INDEX}
                  onChangePage={handleChangePage}
                  minutes={minutes}
                  pageSize={4}
                />
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
  );
};

export default MinutesList;
