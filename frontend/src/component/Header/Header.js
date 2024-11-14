import Styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from '../../Images/icons/Logo.png';
import Menu from '../MenuItens/HamburguerMenu';
import React, {useEffect, useState} from 'react';

const HeaderContainer = Styled.header`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 60% 40%;
  justify-content: center;
  color: var(--text-color-header);
`
const ContainerLogo = Styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;  
`
const ImageLogo = Styled.img`
width: 100px;
height: 100px;
border-radius: 10px; 
object-fit: contain;
margin: 0;
`
const TitleLogo = Styled.h1`
  font-size: 24px;
  font-weight: bold;
  background-image: linear-gradient(to right, #0090f7, #ba62fc, #f2416b);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`
const ContainerNav = Styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: 10px;
`
const StyledLink = Styled(Link)`
  padding-inline: 1.95em;
  font-size: 17px;
  font-weight: bold;
  color: var(--text-color-header-focus);
  text-decoration: none;

  &:hover {
    color: var(--text-color-secundary);
    cursor: pointer;
  }
`
function Header() {

  const [user, setUser] = useState(null);

  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if(storedUser){
      setUser(storedUser);
      setUserLogin(true);
    }
  },[]);

  return (
    <HeaderContainer>
      <ContainerLogo>
        <Link to='/'>
          <ImageLogo src={Logo} />
        </Link>
        <TitleLogo>Apple Sphere Thech</TitleLogo>
      </ContainerLogo>
      <ContainerNav>
        <StyledLink to='/home'>Home</StyledLink>
        <StyledLink to='/loja'>Loja</StyledLink>
        <StyledLink to='/login'>Login</StyledLink>
        {userLogin ?(<Menu />):('')}
        
      </ContainerNav>
    </HeaderContainer>
  );
}

export default Header;