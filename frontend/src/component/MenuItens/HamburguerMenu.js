import React, { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import Styled from "styled-components";
import Avatar from '../../Images/icons/Avatar.png';
import { Link } from 'react-router-dom';

const Logo = Styled.img`
  width: 100%;
  cursor: pointer;
`;

const Container = Styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  margin: 0;
`;

const StyledMenu = Styled(Menu)`
  .bm-menu {
    background: #7e7b7b;
    padding: 2em 1em 0;
    font-size: 1.15em;
  }

  .bm-item-list {
    color: #fff;
    padding: 0.8em;
    letter-spacing: 0.2em;
  }

  .bm-item {
    display: inline-block;
    color: #fff;
    padding: 10px 0;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #000;
      cursor: pointer;
    }
  }

  .bm-burger-button {
    display: none;
  }

  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const HamburgerMenu = ({ isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Container>
      <Logo src={Avatar} onClick={toggleMenu} />
      <StyledMenu
        right
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
      >
        <Link to='/myaccount'>Minha Conta</Link>
        <Link to='/meus-pedidos'>Meus Pedidos</Link>
        <Link to='/productRegister'>Produtos</Link>

      </StyledMenu>
    </Container>
  );
};

export default HamburgerMenu;
