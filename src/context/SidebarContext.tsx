import {
  FC,
  createContext,
  useState,
  SetStateAction,
  Dispatch,
  PropsWithChildren,
} from 'react';

interface SidebarContextProps {
  pathName: string;
  setPathName: Dispatch<SetStateAction<string>>;
}

export const SidebarContext = createContext<SidebarContextProps>({
  pathName: '',
  setPathName: () => {},
});

interface SidebarProps extends PropsWithChildren {}
export const SidebarProvider: FC<SidebarProps> = (props) => {
  const { children } = props;
  const [pathName, setPathName] = useState<string>('');

  return (
    <SidebarContext.Provider value={{ pathName, setPathName }}>
      {children}
    </SidebarContext.Provider>
  );
};