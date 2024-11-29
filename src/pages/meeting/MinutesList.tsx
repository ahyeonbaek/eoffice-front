import { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Siderbar';
import styles from '../../css/meetingStyles/minutesList.module.css';
import dummyData from '../../data/dummy';

import { useSearchParams } from 'react-router-dom';

const MinutesList = () => {
  // const meetingListFetch = async () => {
  //   const meetingListRequest = await fetch('/', {
  //     method: '',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: '',
  //   });
  // };

  // meetingListFetch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [pagesData, setPagesData] = useState({
    startPage: 0,
    endPage: 0,
    totalPageNum: 0,
  });
  const page = searchParams.get('page') || '1';

  const pagingNation = (totalDataNum: number, page: string) => {
    const blockSize = 4;
    const totalPageNum = Math.ceil(totalDataNum / blockSize);

    const StringToNumPage = Number(page);

    const startPage =
      StringToNumPage < 0 ? 1 : (StringToNumPage - 1) * blockSize + 1; // 1, 5, 9, 13

    const endPage =
      StringToNumPage > totalPageNum
        ? totalPageNum
        : StringToNumPage * blockSize; // 4, 8, 12, 16

    setPagesData((prev) => ({ ...prev, startPage, endPage, totalPageNum }));
  };

  const handlePageNation = (pageNum: number) => {
    setSearchParams({ page: pageNum.toString() });
  };

  useEffect(() => {
    setSearchParams({ page });
    pagingNation(dummyData.length, page);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.main_container}>
          <Header />
          <main className={styles.main}>
            <div className={styles.main_content}>
              <div className={styles.minutes_list_container}>
                {dummyData
                  .filter(
                    (_, index) =>
                      index >= pagesData.startPage && index <= pagesData.endPage
                  )
                  .map((minutes) => (
                    <div className={styles.minutes_list_wrap}>
                      <div className={styles.minutes_unit}>
                        <ul className={styles.minutes_info}>
                          <li className={styles.minutes_title}>
                            {minutes.title}
                          </li>
                          <li className={styles.minutes_date}>
                            {minutes.date}
                          </li>
                          <li className={styles.minutes_attendee}>
                            {minutes.attendee}
                          </li>
                        </ul>

                        <div className={styles.minutes_content}>
                          {minutes.content}
                        </div>
                      </div>
                    </div>
                  ))}
                {JSON.stringify(pagesData)}
                <ul className={styles.minutes_page_wrap}>
                  {Array.from(
                    { length: pagesData.totalPageNum },
                    (_, index) => index + 1
                  ).map((pageNum) => (
                    <li
                      className={styles.minutes_page}
                      onClick={() => handlePageNation(pageNum)}
                    >
                      {pageNum}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MinutesList;
