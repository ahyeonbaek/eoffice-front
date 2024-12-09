import usePaginator from '../../hooks/usePaginator';
import styles from '../../css/meetingStyles/minutesList.module.css';
import { useContext } from 'react';
import { PageContext } from './Page';

const Paginator = () => {
  const { onChangePage, total, currentPage, setCurrentPage, pageSize } =
    useContext(PageContext);

  const { pages, totalPageNum } = usePaginator({
    currentPage,
    total,
    pageSize,
  });

  const handleOnClickPrev = () => {
    const changePage = currentPage - 1;
    if (changePage <= 0) {
      return;
    }

    setCurrentPage(changePage);
    onChangePage(changePage);
  };

  const handleOnPage = (index: number) => {
    onChangePage(index);
    setCurrentPage(index);
  };

  const handleOnClickNext = () => {
    const changePage = currentPage + 1;
    if (totalPageNum < changePage) {
      return;
    }
    setCurrentPage(changePage);
    onChangePage(changePage);
  };

  return (
    <>
      <div className={styles.minutes_page_wrap}>
        <button className={styles.minutes_page} onClick={handleOnClickPrev}>
          이전
        </button>

        {pages.map((pageNum, index) => (
          <button
            key={`minutes-page-${index}`}
            className={styles.minutes_page}
            onClick={() => handleOnPage(pageNum + 1)} // 0~4
          >
            {pageNum + 1}
          </button>
        ))}

        <button className={styles.minutes_page} onClick={handleOnClickNext}>
          다음
        </button>
      </div>
    </>
  );
};

export default Paginator;
