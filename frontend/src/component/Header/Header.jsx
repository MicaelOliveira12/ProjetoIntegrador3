// import React, { useState } from "react";
import logoapple from "../../Images/icons/logo-apple.png";
import Styled from "styled-components";
import sacola from "../../Images/icons/Sacola.svg";
import busca from "../../Images/icons/search.svg";

function Header() {
  //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // //   const toggleMobileMenu = () => {
  // //     setIsMobileMenuOpen(!isMobileMenuOpen);
  // //   };

  const HeaderContainer = Styled.header`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 48px;
    display: flex;
    max-height: 44px;
    min-width: 320px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: var(--text-color-header);
  `;

  const LogoApple = Styled.img`
  width: 100%;
  color: var(--text-color-header);
  opacity: .8;
  &:hover {
  opacity: 1.5 }
  `;

  const ContentNav = Styled.nav`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 0;
      padding: 0;
    `;

  const Tag = Styled.a`
     padding-inline: 1.9em;
     font-size: 0.75em;
     color: var(--text-color-header-focus);
     &:hover {
     color: var(--text-color-secundary);
     cursor: pointer;
      }
    `;

  const LogoBagAndSearch = Styled.img``;

  return (
    <HeaderContainer>
      <ContentNav>
        <Tag>
          <LogoApple src={logoapple} />
        </Tag>
        <Tag>Loja</Tag>
        <Tag>Mac</Tag>
        <Tag>iPad</Tag>
        <Tag>iPhone</Tag>
        <Tag>Watch</Tag>
        <Tag>AirPods</Tag>
        <Tag>TV e Casa</Tag>
        <Tag>Entretenimento</Tag>
        <Tag>Acessórios</Tag>
        <Tag>Suporte</Tag>
        <Tag>
          <LogoBagAndSearch src={busca} />
        </Tag>
        <Tag>
          <LogoBagAndSearch src={sacola} />
        </Tag>
        {/* <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
         
        </button> */}
      </ContentNav>
    </HeaderContainer>
  );
}

export default Header;
