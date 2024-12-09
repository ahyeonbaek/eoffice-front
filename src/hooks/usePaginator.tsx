import { useMemo } from 'react';

type UsePaginatorProps = {
  currentPage: number;
  total: number;
  pageSize: number;
  blockSize?: number;
};

const usePaginator = ({
  currentPage,
  total,
  pageSize,
  blockSize = 5,
}: UsePaginatorProps) => {
  const filteredCurrentPage = Math.max(currentPage, 1); //currentPage = 0이면 -가 나와서 추가

  const totalPageNum = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize]
  );

  const startPage = useMemo(
    () => Math.floor((filteredCurrentPage - 1) / blockSize) * blockSize, // 현재 블록의 마지막 페이지를 다음을 눌러 조회할 때 다음 블록으로 넘어가지 않기 위해 // 0일 때
    [filteredCurrentPage, blockSize]
  );

  const endPage = useMemo(() => {
    return Math.min(startPage + blockSize - 1, totalPageNum - 1); // 현재 블록의 마지막 페이지를 다음을 눌러 조회할 때 다음 블록으로 넘어가지 않기 위해
  }, [filteredCurrentPage, blockSize, totalPageNum]);

  const blockLength = useMemo(
    () => endPage - startPage + 1,
    [endPage, startPage]
  );

  const pages = useMemo(
    () => Array.from({ length: blockLength }, (_, index) => startPage + index),
    [blockLength, startPage]
  );

  return { pages, totalPageNum, pageSize };
};

export default usePaginator;
