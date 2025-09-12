import * as React from "react"
import { useState } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Heading,
  Flex,
  Spacer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  useToast
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"

const CreditsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" margin="0 1rem">
        Credits
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credits</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Aaron Yee</Text>
            <Text>Derrin Chong</Text>
            <Text>Paul Wheeler</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Navbar = () => (
  <Flex as="nav" bg="teal.500" color="white" padding="1.5rem" align="center">
    <Box>
      <Heading size="md">Demo App</Heading>
    </Box>
    <Logo h="5vmin" pointerEvents="none" ml={2} />
    <Spacer />
    <Box>
      <CreditsModal />
    </Box>
  </Flex>
);

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Box textAlign="center" fontSize="xl" >
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={4} mt={-20}>
          <NameForm />
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)

const NameForm = () => {
  const [name, setName] = useState("");
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("https://doe-demo-api-675849533921.us-west1.run.app/submit", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      toast({
        title: "Response",
        description: data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={-20}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name">
          <FormLabel>Hello, what is your name?</FormLabel>
          <Flex align="center">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mr={2}
            />
            <Button colorScheme="teal" type="submit">
              Submit
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};


