import Sidebar from '../../components/sidebar/Siderbar';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import { EditButton } from '../../components/button/EditButton';
import Card from '../../components/card/Card';
import CardImage from '../../components/card/CardImage';
import CardItem from '../../components/card/CardItem';
import CardTitle from '../../components/card/CardTitle';
import styles from '../../css/meetingStyles/MeetingList.module.css';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface addPostType {
    id:string;
    name: string;
    location: string;
    personCount: number | string;
    file: string;
}

const MeetingList = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<addPostType[]>([]);

  const token = localStorage.getItem('token');

  const handleEditClick = (id: string) => {
    navigate(`/editmeeting/${id}`);
  };

  const handleReserveClick = (id: string) => {
    navigate(`/reservemeeting/${id}`);
  };

  const getPost = async () => {
    try {
      const response = await fetch('/api/meeting/meetingrooms/list', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const { data } = await response.json();

                const mappingData = data.map((item:any) => ({
                    id: item._id,
                    name: item.name,
                    location: item.location,
                    personCount : item.personCount,
                    file: item.file,
                    createdAt: item.createdAt,
                }))
                setPost(mappingData);
            }else{
                console.log('회의실 정보 요청 실패');
            }
        }catch(err) {
            console.log('회의실 정보 가져오기 실패', err)
        }
    };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <Header />
      <Sidebar />
      <Footer />
      <div>
        <Card className={styles.card_box}>
          {post.map((post) => (
            <CardItem className={styles.card} id={post.id} key={post.id}>
              <CardImage
                className={styles.card_img}
                src={post.file}
                alt={'회의실 이미지'}
                onClick={() => handleReserveClick(post.id)}
              />
              <div className={styles.post_title_box}>
                <CardTitle
                  className={styles.post_name}
                  onClick={() => handleReserveClick(post.id)}
                >
                  {post.name}
                </CardTitle>
                <EditButton onClick={() => handleEditClick(post.id)} />
              </div>
            </CardItem>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default MeetingList;
