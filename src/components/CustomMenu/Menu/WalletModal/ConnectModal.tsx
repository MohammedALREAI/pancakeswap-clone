import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Grid,Box ,Text,Heading,Button} from "@pancakeswap/uikit";
import getThemeValue from "components/CustomMenu/Modal/getThemeValue";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../../Modal";
import config, { walletLocalStorageKey } from "./config";
import { Config, Login } from "./types";
import WalletCard,{ MoreWalletCard } from "./WalletCard";
import getExternalLinkProps from "./getExternalLinkProps";

interface Props {
  login: Login;
  onDismiss?: () => void;
  displayCount?: number;
}

const WalletWrapper = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
const getPreferredConfig = (walletConfig: Config[]) => {
  const preferredWalletName = localStorage.getItem(walletLocalStorageKey);
  const sortedConfig = walletConfig.sort((a: Config, b: Config) => a.priority - b.priority);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
};

const ConnectModal: React.FC<Props> = ({ login, onDismiss = () => null, displayCount = 3 }) => {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const sortedConfig = getPreferredConfig(config);
  const displayListConfig = showMore ? sortedConfig : sortedConfig.slice(0, displayCount);

  return (
    <ModalContainer minWidth="320px">
      <ModalHeader background={getThemeValue("colors.gradients.bubblegum")(theme)}>
        <ModalTitle>
          <Heading>Connect Wallet</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody width={["320px", null, "340px"]}>
        <WalletWrapper py="24px" maxHeight="453px" overflowY="auto">
          <Grid gridTemplateColumns="1fr 1fr">
            {displayListConfig.map((wallet) => (
              <Box key={wallet.title}>
                <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
              </Box>
            ))}
            {!showMore && <MoreWalletCard onClick={() => setShowMore(true)} />}
          </Grid>
        </WalletWrapper>
        <Box p="24px">
          <Text textAlign="center" color="textSubtle" as="p" mb="16px">
            Haven&#39;t got a crypto wallet yet?
          </Text>
          <Button
            as="a"
            href="https://docs.pancakeswap.finance/get-started/connection-guide"
            variant="subtle"
            width="100%"
            {...getExternalLinkProps()}
          >
            Learn How to Connect
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default ConnectModal;
