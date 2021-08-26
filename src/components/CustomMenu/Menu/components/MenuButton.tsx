import { Button } from "@pancakeswap/uikit";
import styled from "styled-components";

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.primaryBright};
  padding: 0 8px;
  border-radius: 8px;
  margin-bottom: 10px;
  height: auto ;
`;
MenuButton.defaultProps = {
  variant: "text",
  size: "sm",
};

export default MenuButton;
