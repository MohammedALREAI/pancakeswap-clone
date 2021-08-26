import { Button ,Dropdown,Text} from "@pancakeswap/uikit";
import { SvgProps } from "components/wedgit/Menu/interface/SvgProps";
import React from "react";
// import { SvgProps } from "../../../components/Svg";
// import Text from "../../../components/Text/Text";
// import Dropdown from "../../../components/Dropdown/Dropdown";
// import Button from "../../../components/Button/Button";
import * as IconModule from "../icons";
import { LangType } from "../types";
import MenuButton from "./MenuButton";
import { HeaderButtonIconSun } from "./ThemeSwitcher";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { LanguageIcon } = Icons;

interface Props {
  currentLang: string;
  langs: LangType[];
  setLang: (lang: LangType) => void;
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang }) => (
  <HeaderButtonIconSun>
  <Dropdown
    target={
      <Button variant="text">
        <Text>{currentLang?.toUpperCase()}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton  
      key={lang.code}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: "30px", height: "40px" }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
  </HeaderButtonIconSun>
);

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang);
