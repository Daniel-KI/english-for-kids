import './Footer.scss';
import { FaGithub } from 'react-icons/fa';

const Footer = (): JSX.Element => (
  <footer className='footer'>
    <div className='container footer__container'>
      <a className='footer__link' href='https://github.com/Daniel-KI' rel='noreferrer' target='_blank'>
        <FaGithub className='footer__logo' />
        Daniel_KI
      </a>
      <a className='footer__link' href='https://rs.school/js/' rel='noreferrer' target='_blank'>
        <img alt='RS school' className='footer__img' src='./icons/rss.svg' />
        &lsquo; 21
      </a>
    </div>
  </footer>
);

export default Footer;
