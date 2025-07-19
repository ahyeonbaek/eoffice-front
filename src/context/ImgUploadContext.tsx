import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../components/imageUpload/Image.module.css';
import Rectangle from '../../public/img/Rectangle 27.png';

interface ImageUploadProps {
  setUploadImg: (file: File | string | undefined) => void;
  initialImage?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  setUploadImg,
  initialImage,
}) => {
  const [uploadedSrc, setUploadedSrc] = useState<string>(
    initialImage || Rectangle
  );

  useEffect(() => {
    if (initialImage) {

      setUploadedSrc(initialImage);
    }
  }, [initialImage]);

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadImg(file); 
      const previewUrl = URL.createObjectURL(file); 
      setUploadedSrc(previewUrl);
    }
  };

  return (
    <div className={styles.img_box}>
      <label htmlFor="Image">
        <img
          className={styles.default_img}
          src={uploadedSrc}
          alt="프로필 이미지"
        />
      </label>
      <input
        className={styles.input_file}
        type="file"
        name="profileImage"
        id="Image"
        accept="image/*" //모든 타입의 이미지 파일 허용
        onChange={handleChangeImg}
      />
    </div>
  );
};
