import Styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from '../../Images/icons/Logo.png';
import Menu from '../MenuHamburguer/HamburguerMenu';
import { useUser } from '../../Context/userContext';

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
  align-items: center;
  justify-content: center;  
`
const ImageLogo = Styled.img`
width: 100px;
height: 100px;
border-radius: 10px; 
object-fit: contain;
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

  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <HeaderContainer>
      <ContainerLogo>
        <Link to='/home'>
          <ImageLogo src={Logo} />
        </Link>
        <TitleLogo>Apple Sphere Thech</TitleLogo>
      </ContainerLogo>
      <ContainerNav>
        <StyledLink to='/home'>Home</StyledLink>
        <StyledLink to='/store'>Loja</StyledLink>
        {user ? (<Menu />) : (<StyledLink to='/login'>Login</StyledLink>)}
      </ContainerNav>
    </HeaderContainer>
  );
}

export default Header;