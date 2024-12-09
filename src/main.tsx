import ReactDOM from 'react-dom/client';
import RootApp from './App';
import './App.css';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
      <RootApp />
  </StrictMode>
);
