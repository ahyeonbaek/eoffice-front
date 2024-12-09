import styles from './Footer.module.css';
import youtube from '../../../public/img/logos_youtube-icon.png';
import instagram from '../../../public/img/skill-icons_instagram.png';
import linkedin from '../../../public/img/devicon_linkedin.png';

const Footer = () => {
  const footerLinks = [
    {
      src: youtube,
      alt: '엘리스트랙 youtube 바로가기',
      href: 'https://www.youtube.com/@elice_official',
      className: styles.footer_sns_youtube,
    },
    {
      src: instagram,
      alt: '엘리스트랙 instagram 바로가기',
      href: 'https://www.instagram.com/elice.track.coding/',
      className: styles.footer_sns_instagram,
    },
    {
      src: linkedin,
      alt: '엘리스트랙 linkedin 바로가기',
      href: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFHhy-rhrJGvAAAAZNxe8yYa5rXu1P3h6wfzZg_2-TKVNeuAkuJLB3TlPGC56dEKNRBvvAgK0Qyw9Ql--UF4it4PClrrt7PU80q3CPNw4jGtdvEhjlhrzj5uh-a6Jp6Dk1QQZc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Felice%2F',
      className: styles.footer_sns_linkedin,
    },
  ];

  return (
    <div className={styles.footer_box}>
      <div className={styles.footer_ul_box}>
        <ul className={styles.footer_ul}>
          <li className={styles.footer_li}>
            <a
              href="https://legal.elice.io/policies/terms/2024-11-12"
              target="_blank"
              className={styles.footer_a}
            >
              서비스 이용약관
            </a>
          </li>
          <li className={styles.footer_li}>
            <a
              href="https://legal.elice.io/policies/privacy/2024-06-20"
              target="_blank"
              className={styles.footer_a}
            >
              개인정보처리방침
            </a>
          </li>
        </ul>
        <div className={styles.copyright_box}>
          <p className={styles.footer_copyright}>
            Copyright ⓒ 2016 - 2024 E-Office, Inc. All Rights Reserved.
          </p>
        </div>
        <div className={styles.footer_sns_box}>
          {footerLinks.map((item, index) => (
            <a href={item.href} target="_blank" key={index}>
              <img src={item.src} alt={item.alt} className={item.className} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
