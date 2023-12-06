import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return <footer className={styles.footer}>
      <p>Bookshelf. Todos os direitos reservados.</p>
      <ul>
        <p>Developed by:</p>
        <li><a href="https://github.com/davirodriguesp" target='_blank' rel="noreferrer">Davi Rodrigues</a></li>
        <li><a href="https://github.com/JPConti" target='_blank' rel="noreferrer">Juan Conti</a></li>
        <li><a href="https://github.com/orodrigobraz" target='_blank' rel="noreferrer">Rodrigo Braz</a></li>
      </ul>
    </footer>
}

export default Footer;