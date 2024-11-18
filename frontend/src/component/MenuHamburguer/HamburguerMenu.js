import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Context/userContext";
import { useState } from "react";
import Styled from "styled-components";
import menuFactory from "./menuFactory";
import Avatar from "../../Images/icons/Avatar.png";

const Logo = Styled.img`
  width: 30px;
  cursor: pointer;
`
const ContainerLogo = Styled.div`
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 0;
`
const ContainerMenu = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
  padding: 50px;
`
const ContainerOptions = Styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;  
`
const ContainerLogoff = Styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  color: red;
  
  & >p{
    font-size:20px;

    &:hover{
    text-decoration: underline;
    cursor: pointer;
    }
  }
`
const OptionLink = Styled(Link)`
  text-decoration: none;
  color: #494949;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.12em;
  line-height: 1.8;

  &: hover{
    text-decoration: underline;
    color: #000;
  }
`
const CloseButton = Styled.button`
  position: absolute;
  top: 50%;
  left: -5%;
  right: -20px;
  transform: translateY(-50%);
  width: 50px;
  height: 60px;
  background: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '→';
    font-size: 30px;
    font-weight: bold;
    color: #494949;
    transform: rotate(0deg);
  }

  &:hover {
    color: #000;
    &::before {
      color: #000;
    }
  }
`
const styles = menuFactory({
  menuWrap: (isOpen) => ({
    transform: `translate3d(${isOpen ? "0%" : "110%"}, 0, 0)`,
    transition: "transform 0.5s ease-in-out",
    position: "fixed",
    top: 0,
    right: 0,
    width: "350px",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 1000,
  }),
  overlay: (isOpen) => ({
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transition: "opacity 0.5s ease-in-out",
    zIndex: 999,
  }),
})

function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const firstName = user?.nomeUsuario?.split(" ")[0] || "Usuário";

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const removeUser = () => {
    logout();
    navigate('/home');
  };

  return (
    <ContainerLogo>
      <Logo src={Avatar} onClick={toggleMenu} />
      Bem Vindo, {firstName}!
      <div style={styles.overlay(menuOpen)} onClick={closeMenu} />
      <div style={styles.menuWrap(menuOpen)}>
        <CloseButton onClick={closeMenu} />
        <ContainerMenu>
          <ContainerOptions>
            <OptionLink to="/Account" onClick={closeMenu}>Minha Conta</OptionLink>
            <OptionLink to="/meus-pedidos" onClick={closeMenu}>Meus Pedidos</OptionLink>
            {user?.id === 1 && (
              <OptionLink to="/product" onClick={closeMenu}>Produtos</OptionLink>
            )}
          </ContainerOptions>
          <ContainerLogoff>
            <p onClick={removeUser}>Logoff</p>
          </ContainerLogoff>
        </ContainerMenu>
      </div>
    </ContainerLogo>
  );
}

export default HamburgerMenu;