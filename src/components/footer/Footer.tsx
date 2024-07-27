import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <Link to="https://github.com/team-MEETUS" target="_blank">
          <img
            src="images/github.png"
            alt="GitHub Logo"
            className={styles.footer_image}
          />
        </Link>
        <div className={styles.footer_nav}>
          <Link to="#" className={styles.footer_link}>
            개인정보처리방침
          </Link>
          <Link to="#" className={styles.footer_link}>
            Q&A
          </Link>
          <Link to="#" className={styles.footer_link}>
            자주묻는질문
          </Link>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <p>&copy; 2024 Meetup | Designed by team-MEETUS</p>
      </div>
    </footer>
  );
};

export default Footer;
