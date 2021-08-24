import React from "react";
import Svg from "components/Svg/Svg";
import { SvgProps } from "components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M15 6H9C5.686 6 3 8.686 3 12C3 13.912 3.897 15.611 5.29 16.71" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9 18H15C18.314 18 21 15.314 21 12C21 10.088 20.103 8.38898 18.71 7.28998" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M11.5 15.5L9 18L11.5 20.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.5 8.5L15 6L12.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default Icon;
