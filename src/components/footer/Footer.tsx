
import styles from "./Footer.module.css";
import styles2 from "./Footer_login.module.css";
import youtube from "../../../public/images/logos_youtube-icon.png";
import instagram from "../../../public/images/skill-icons_instagram.png";
import linkedin from "../../../public/images/devicon_linkedin.png";


interface FooterProps {
    footerStyle ?: boolean;
}

const Footer: React.FC<FooterProps> = ({footerStyle = false}) => {
    const appliedStyle = footerStyle ? styles2 : styles

    return(
        <div className={appliedStyle.footer_box}>
            <div className={appliedStyle.footer_ul_box}>
                <ul className={appliedStyle.footer_ul}>
                    <li className={appliedStyle.footer_li}><a href="https://legal.elice.io/policies/terms/2024-11-12" target='_blank' className={styles.footer_a}>서비스 이용약관</a></li>
                    <li className={appliedStyle.footer_li}><a href="https://legal.elice.io/policies/privacy/2024-06-20" target='_blank' className={styles.footer_a}>개인정보처리방침</a></li>
                </ul>
                <div className={appliedStyle.copyright_box}>
                    <p className={appliedStyle.footer_copyright}>Copyright ⓒ 2016 - 2024 E-Office, Inc. All Rights Reserved.</p>
                </div>
                <div className={appliedStyle.footer_sns_box}>
                    <a href="https://www.youtube.com/@elice_official" target='_blank'>
                        <img src={youtube} alt="엘리스트랙 youtube 바로가기" className={appliedStyle.footer_sns_youtube} />
                    </a>
                    <a href="https://www.instagram.com/elice.track.coding/" target='_blank'>
                        <img src={instagram} alt="엘리스트랙 instagram 바로가기" className={appliedStyle.footer_sns_instagram} />
                    </a>
                    <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFHhy-rhrJGvAAAAZNxe8yYa5rXu1P3h6wfzZg_2-TKVNeuAkuJLB3TlPGC56dEKNRBvvAgK0Qyw9Ql--UF4it4PClrrt7PU80q3CPNw4jGtdvEhjlhrzj5uh-a6Jp6Dk1QQZc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Felice%2F" target='_blank'>
                        <img src={linkedin} alt="엘리스트랙 linkedin 바로가기" className={appliedStyle.footer_sns_likedin} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
