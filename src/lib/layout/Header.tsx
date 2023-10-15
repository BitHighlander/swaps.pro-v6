import {
  Card,
  Button,
  Box,
  Flex,
  HStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  VStack,
  Badge,
  Spinner,
} from "@chakra-ui/react";
import { usePioneer } from "@pioneer-sdk/pioneer-react";
import type React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

const PROJECT_NAME = "Swaps.PRO";

interface Wallet {
  type: string;
  icon: string;
  status: string;
}

const HeaderNew: React.FC = () => {
  const { state, connectWallet } = usePioneer();
  const [isOpen, setIsOpen] = useState(false);
  const [connectingWalletType, setConnectingWalletType] = useState<
    string | null
  >(null); // New state to track wallet being connected

  const handleOpen = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const handleWalletClick = async (walletType: string) => {
    setConnectingWalletType(walletType);

    // Here, simulate the wallet connection process. In a real-world scenario, replace this with your actual connection logic.
    await connectWallet(walletType);

    // After connecting (or failing), clear the spinner.
    setConnectingWalletType(null);
  };

  return (
    <Flex
      as="header"
      width="full"
      alignSelf="flex-start"
      gridGap={2}
      justifyContent="space-between"
      alignItems="center"
      p={5}
      bg="gray.900"
      borderColor="gray.200"
    >
      {state.app && state.app.wallets && (
        <Drawer isOpen={isOpen} placement="right" onClose={handleClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Wallets</DrawerHeader>
              <DrawerBody>
                {state.app.wallets.map((wallet: Wallet) => (
                  <Card key={wallet.type}>
                    <Box
                      key={wallet.type}
                      p={4}
                      boxShadow="md"
                      borderRadius="md"
                      maxW="sm"
                      w="full"
                      mt={4}
                      onClick={() => handleWalletClick(wallet.type)}
                    >
                      <HStack spacing={4}>
                        <Avatar src={wallet.icon} name={wallet.type} />
                        <VStack alignItems="start" spacing={1}>
                          <Text fontWeight="bold">{wallet.type}</Text>
                          <HStack spacing={2}>
                            {connectingWalletType === wallet.type &&
                            wallet.status === "offline" ? (
                              <Spinner />
                            ) : (
                              <Badge
                                colorScheme={
                                  wallet.status === "offline" ? "red" : "green"
                                }
                              >
                                {wallet.status.toUpperCase()}
                              </Badge>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>
                    </Box>
                  </Card>
                ))}
              </DrawerBody>
              <DrawerFooter />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
      <HStack spacing={8}>
        <RouterLink to="/">
          <Box>
            <Text fontSize="3xl">{PROJECT_NAME}</Text>
          </Box>
        </RouterLink>
      </HStack>
      <Button onClick={handleOpen}>Connect</Button>
    </Flex>
  );
};

export default HeaderNew;
