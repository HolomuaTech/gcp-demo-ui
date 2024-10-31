import * as React from "react"
import { ReactElement, useContext, useEffect, useMemo, useState } from "react"
import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Spinner,
  Text,
  theme,
  useDisclosure
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadFull } from "tsparticles"
import { useParticlesOptions } from './particlesOptions'
import { NameForm } from './NameForm'
import { ApiStatusContext, ApiStatusProvider } from './apiStatusContext'

const CreditsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" margin="0 1rem">
        Credits
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Credits</ModalHeader>
          <ModalCloseButton/>
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

const Navbar = () => {
  const { apiStatus } = useContext(ApiStatusContext);
  return (<Flex as="nav" bg="teal.500" color="white" padding="1.5rem" align="center">
    <Box>
      <Heading size="md">Demo App</Heading>
    </Box>
    <Logo h="5vmin" pointerEvents="none" ml={2}/>
    <Spacer/>
    { apiStatus.loading && <Spinner/> }
    <Spacer/>
    <Box>
      <CreditsModal/>
    </Box>
  </Flex>);
}

export const ParticlesEngineProxy = {
  initParticlesEngine
}

const Background = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    ParticlesEngineProxy.initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useParticlesOptions();

  const cssOptions = useMemo<Partial<CSSStyleDeclaration>>(() => ({
    position: 'absolute',
  }), [])

  return (<Box display={"flex"} flexDir={"column"} flexGrow={1} position={"relative"}>
    {init && <Particles
        options={{ ...particlesOptions, style: cssOptions }}
    />}

    {children}
  </Box>)
}

export const App = () => {
  return <ChakraProvider theme={theme}>
    <ApiStatusProvider>
      <Box display={"flex"} flexDir={"column"} height={"100vh"}>
        <Navbar/>
        <Background>
          <Box textAlign="center" fontSize="xl" flexGrow={1}>
            <Grid p={3} height={"100%"}>
              <ColorModeSwitcher justifySelf="flex-end" gridRow={1} gridColumn={1}/>
              <NameForm/>
            </Grid>
          </Box>
        </Background>
      </Box>
    </ApiStatusProvider>
  </ChakraProvider>
}
