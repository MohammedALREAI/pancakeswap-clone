import React from "react";
import { SvgProps } from "components/Svg";
import { Text ,Flex,Button} from "@pancakeswap/uikit";
import styled from "styled-components";
import * as IconModule from "../icons";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon } = Icons;

interface Props {
  isDark: boolean;
  toggleTheme: (isDark: boolean) => void;
}
export const  HeaderButtonIconSun = styled(Flex)`

background: #4F5069;
border-radius: 12px;
padding: 8px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px;
min-width:40px;
height:40px;
max-width:50px;
z-index:50;
margin: 9px;


`;



const ThemeSwitcher: React.FC<Props> = ({ isDark, toggleTheme }) => (
    <HeaderButtonIconSun  onClick={() => toggleTheme(!isDark)} alignItems="center">
      {!isDark? <SunIcon color="white" width="16px" height="16px" fontWeight="700" />:<MoonIcon color="white" width="16px" height="16px" />
} 
    </HeaderButtonIconSun>
);

export default React.memo(ThemeSwitcher, (prev, next) => prev.isDark === next.isDark);
