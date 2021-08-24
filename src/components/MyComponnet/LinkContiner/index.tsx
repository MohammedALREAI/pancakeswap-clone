import { Link } from 'react-router-dom'
import styled from 'styled-components'

// An internal link from the react-router-dom library that is correctly styled
const StyledMenulLink = styled(Link)<{color?:string,bcolor?:string ,isDark?:boolean,isActive?:boolean}>`
  text-decoration: none;
  cursor: pointer;
  font-family: Merriweather Sans;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 24px;
margin: 0 12px;
padding: 12px  0px;
&:first-child {
  margin-left: 30px;

};
&:last-child{
  margin-left: 25px;

}

/* identical to box height, or 133% */

font-feature-settings: 'pnum' on, 'lnum' on;

/* Gray/4 */

color: ${(props)=> props.isDark?"#D0D1DC":"#737596"};
  border-bottom: ${(props)=> props.isActive?"#E5E5E5":"##057F94"};
font-weight: 500;
  :hover {
    border-bottom: 1.2px solid #057F94;

  }

  :focus {
    outline: none;
    border-bottom: 1.2px solid #057F94;
  }

  :active {
    border-bottom: 1.2px solid #057F94;
  }
`

export default StyledMenulLink
