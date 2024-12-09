import Paginator from '../../components/paginator/Paginator';
import PageList from '../../components/paginator/PageList';

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';

type minutesProps = {
  title: string;
  date: string;
  attendees: number;
  content: string;
  createdAt: string;
};

interface BaseProps extends PropsWithChildren {}

interface PageContextProps extends BaseProps {
  defaultPageIndex: number;
  total: number;
  onChangePage: (pageIndex: number) => void;
  currentPage: number;
  minutes: minutesProps[];
  pageSize: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  sliceMinutes: minutesProps[];
  setSliceMinutes: Dispatch<SetStateAction<minutesProps[]>>;
}

type PageProps = {
  defaultPageIndex: number;
  onChangePage: (pageIndex: number) => void;
  minutes: minutesProps[];
  pageSize: number;
};

export const PageContext = createContext<PageContextProps>({
  defaultPageIndex: 0,
  total: 0,
  onChangePage: () => {},
  currentPage: 0,
  minutes: [],
  pageSize: 0,
  setCurrentPage: () => {},
  sliceMinutes: [],
  setSliceMinutes: () => {},
});

const Page = (props: PageProps) => {
  const { defaultPageIndex, onChangePage, minutes, pageSize } = props;

  const [currentPage, setCurrentPage] = useState(defaultPageIndex + 1);
  const [sliceMinutes, setSliceMinutes] = useState(minutes.slice(0, pageSize));
  const total = minutes.length;

  const pageContext = {
    defaultPageIndex,
    total,
    onChangePage,
    currentPage,
    minutes,
    setCurrentPage,
    pageSize,
    sliceMinutes,
    setSliceMinutes,
  };

  return (
    <>
      <PageContext.Provider value={pageContext}>
        <PageList />
        <Paginator />
      </PageContext.Provider>
    </>
  );
};

export default Page;
