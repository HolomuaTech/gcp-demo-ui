import * as React from 'react';
import { useCallback, useContext, useState } from 'react';
import { Box, Button, Flex, FormControl, FormLabel, Input, useColorMode, useToast } from '@chakra-ui/react';
import { ApiStatusContext } from './apiStatusContext';

export const NameForm = () => {
  const [name, setName] = useState("");
  const toast = useToast();

  const {
    startRequest,
    requestSuccess,
    requestError
  } = useContext(ApiStatusContext);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        startRequest()
        const res = await fetch("https://doe-demo-api-675849533921.us-west1.run.app/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        requestSuccess()
        toast({
          title: "Response",
          description: data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        const msg = error instanceof Error ? error.message : "An error occurred";
        requestError(msg);
        toast({
          title: "Error",
          description: msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [startRequest, requestSuccess, requestError, name, toast]
  );

  const { colorMode } = useColorMode();

  return (
    <Box width={"fit-content"} margin={"auto"} gridRow={1} gridColumn={1}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name">
          <FormLabel>Hello, what is your name?</FormLabel>
          <Flex align="center">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              mr={2}
              backgroundColor={colorMode === "light" ? "#eee" : "#111"}
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
