import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { Box, Button, Flex, Link, Overlay, Text, useMatchBreakpoints } from "@pancakeswap/uikit";
import StyledMenulLink from "components/MyComponnet/LinkContiner";
import Logo, { StyledLink } from "./components/Logo";
import Panel from "./components/Panel";
import UserBlock from "./components/UserBlock";
import CircleIcon from'./icons/MenuButton/circle'
import DarkThemeIcon from'./icons/MenuButton/DarkTheme'
import { NavProps } from "./types";
import Avatar from "./components/Avatar";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import { TwitterIcon } from "./icons";
import { HeaderButtonIcon } from "./components/Boxs/Index";


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin:0px  auto ;
  background-color: "${({ theme }) => theme.nav.background}";

`;



export  const  TextUser=styled(Text)`
background: -webkit-linear-gradient(90deg, #10E5A5 0.58%, #057F94 97.67%);
  padding: 8px 13px;
  margin: 0px 8px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

font-family: Raleway;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 24px;
/* identical to box height, or 171% */

text-align: right;
font-feature-settings: 'pnum' on, 'lnum' on;



`;
export  const  IconUser=styled("img")`
width: 20px;
height: 20px;
border-radius: 50%;
margin:4px;
object-fit: cover;

`
interface ThemeDark{
  isDark?:boolean
}

const StyledNav = styled.nav<{ showMenu: boolean ,isDark?:boolean}>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${(props)=> !props.isDark?"#121217":"#FFFFFF"};
  color: ${(props)=>!props.isDark?"#FFFFFF":"#737596"};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Dot = styled.div`
background: #1AEFAF;
display:flex;
width: 10px;
height: 10px;
border-radius: 50%;
justify-content:center;
align-items: center;
padding:4px;
margin-right:13px;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;
const  UserWrapper=styled(Button)`
max-width: 170px;
max-height: 40px;
width: 170px;
height: 40px;
background: #3B3C4E;
border-radius: 12px;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 8px;
padding-left: 13px;
`;

export const HeaderButton=styled(Button)`
max-width: 78px;
max-height: 40px;
width: 78px;
height: 40px;
background: #3B3C4E;
border-radius: 12px;
padding: 8px;
display: flex;
justify-content: center;
align-items: center;
font-family: Open Sans;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 24px;
text-align: right;
font-feature-settings: 'pnum' on, 'lnum' on;
margin: 8px 0px;
color: #FFFFFF;


`;

const MainnetText=styled(Text)<ThemeDark>`
font-style: normal;
font-weight: bold;
font-size: 18px;
line-height: 24px;
text-align: right;
text-decoration-line: underline;
text-decoration-color: red; 
font-feature-settings: 'pnum' on, 'lnum' on;

color: ${(props)=>!props.isDark?"#FFFFFF":"#161616"};

`

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
 
      <Flex justifyContent="space-between" alignItems="center">
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
      
      <Flex>
    
       <StyledMenulLink  isDark={!!isDark} isActive to="/" aria-label="Dashboard home page">
       Dashboard 
        </StyledMenulLink>
       <StyledMenulLink  isDark={!!isDark}  to="/swap" aria-label="Swap home page">
       Swap 
        </StyledMenulLink>
       <StyledMenulLink  isDark={!!isDark}  to="/stake" aria-label="Stake home page">
       Stake 
        </StyledMenulLink>
       <StyledMenulLink  isDark={!!isDark}  to="/farm" aria-label="Farm home page">
       Farm 
        </StyledMenulLink>

      </Flex>
  </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <UserWrapper>
            <TextUser>OxBB6..e96e</TextUser>
            <IconUser src="https://s3-alpha-sig.figma.com/img/d12e/9615/ecab82b9086a23fd4a3592d389199861?Expires=1630886400&Signature=MFesWf9Myf7UpH8JnVEDnw5RVczijSLclDVGoidTMNSOKPyGGDbDjPQHe61L4Hu5NF4BPo4QF-p9ZK-nhygWv8uPUDE2kVsJBpK-kzSWxE-PEJJmX1R88pGPBM-oWAMmcJF9khYCfrLfjrinRofbH3EbljnwhiJa7p45W-2GHZ5PARkLDGMkIcHZ6P4DjUXrU2L8DR2PZ7Y~X1MuAdtRMpXeLU7R6jxI5mtmU8xiH5UM4xHEWY6AkPtO1Sgy763ODdqdX1ZfHR4Wlf4DLBw0x6AC-I9eMBOA4juK3X5BCgJ-ntrm0-6AulColqMji-lmMetWP6n2oCMQz3l0ZxSZGg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="user" />
          </UserWrapper>
          <Flex justifyContent="flex-start" alignItems="center"style={{
                marginLeft:"24px"
          }}>
              <Dot/>
            <MainnetText style={{textDecoration:"underline"}}>Mainnet</MainnetText>
          </Flex>
          <Flex ml="68px">
         <HeaderButtonIcon>
       <Text color="#FFFFFF">EN</Text>
         </HeaderButtonIcon>

         <HeaderButtonIcon>
       <DarkThemeIcon/>
         </HeaderButtonIcon>
        </Flex>
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          pushNav={setIsPushed}
          links={links}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
