import { Box, Button, Flex, HStack, Heading, Spacer } from "@chakra-ui/react";
//For Nav Buttons
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Flex as="nav" p="10px" alignItems="center">
        <Heading as="h1" fontSize="xl">
          TrueVoice
        </Heading>
        <Spacer />
        <HStack spacing="10px">
          <Button as={NavLink} to="/profile" colorScheme="green">
            Contact Us
          </Button>
        </HStack>
      </Flex>
    </>
  );
}
