import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OauthLoading = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');
      const provider = queryParams.get('provider') || 'google';

      console.log('Token:', token);
      console.log('Provider:', provider);

      if (!provider || !token) {
        alert('유효하지 않은 요청입니다. 다시 시도해주세요.');
        navigate('/login');
        return;
      }

      try {
        localStorage.setItem('token', token);

        alert('로그인 성공!');
        navigate('/home');
      } catch (err) {
        console.error('OAuth 처리 오류:', err);
        alert('서버와 통신에 실패했습니다. 다시 시도해주세요.');
        navigate('/login');
      }
    };

    handleOAuth();
  }, [location, navigate]);

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '20%',
        color: '#6700e6',
        fontWeight: 'bold',
      }}
    >
      <h1>OAuth 로그인 중입니다...</h1>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default OauthLoading;
