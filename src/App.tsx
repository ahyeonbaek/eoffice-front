import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Logout from './pages/login/Logout';

// import Splash from './components/splash/Splash';
// import Signup from './pages/login/Signup';
// import Login from './pages/login/Login';
// import AddMeeting from './pages/meeting/AddMeeting';
// import CreateMinutes from './pages/meeting/CreateMinutes';
// import MeetingList from './pages/meeting/MeetingList';
// import EditMeeting from './pages/meeting/EditMeeting';
// import MinutesList from './pages/meeting/MinutesList';
// import ReserveMeeting from './pages/meeting/ReserveMeeting';
// import OauthLoading from './pages/login/OauthLoading';
// import ErrorPage from './components/ErrorPage';
// import Home from './pages/login/Home';
// import Profile from './pages/login/Profile';
const Signup = React.lazy(() => import('./pages/login/Signup'));
const Login = React.lazy(() => import('./pages/login/Login'));
const Profile = React.lazy(() => import('./pages/login/Profile'));
const AddMeeting = React.lazy(() => import('./pages/meeting/AddMeeting'));
const CreateMinutes = React.lazy(() => import('./pages/meeting/CreateMinutes'));
const EditMeeting = React.lazy(() => import('./pages/meeting/EditMeeting'));
const MeetingList = React.lazy(() => import('./pages/meeting/MeetingList'));
const MinutesList = React.lazy(() => import('./pages/meeting/MinutesList'));
const ReserveMeeting = React.lazy(
  () => import('./pages/meeting/ReserveMeeting')
);
const Splash = React.lazy(() => import('./components/splash/Splash'));
const Home = React.lazy(() => import('./pages/login/Home'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage'));
const OauthLoading = React.lazy(() => import('./pages/login/OauthLoading'));

export default function RootApp() {
  return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addmeeting" element={<AddMeeting />} />
            <Route path="/createminutes" element={<CreateMinutes />} />
            <Route path="/editmeeting" element={<MeetingList />} />

            <Route path="/meetinglist" element={<MeetingList />} />
            <Route path="/editmeeting/:id" element={<EditMeeting />} />
            <Route path="/minuteslist" element={<MinutesList />} />
            <Route path="/reservemeeting" element={<ReserveMeeting />} />
            <Route path="/reservemeeting/:id" element={<ReserveMeeting />} />
            <Route path="/oauthloading" element={<OauthLoading />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
  );
}
