// src/components/Footer.js
import React from 'react';
import footerStyles from './styles/Footer.module.css';

const Footer = () => (
  <footer className={footerStyles.footer}>
    <div className={footerStyles.footerLinks}>
      <a className={footerStyles.footerLink} href="#">Termos de Serviço</a>
      <a className={footerStyles.footerLink} href="#">Política de Privacidade</a>
      <a className={footerStyles.footerLink} href="#">Suporte</a>
    </div>
    <p>&copy; 2024 Investment Simulator. Todos os direitos reservados.</p>
  </footer>
);

export default Footer;
