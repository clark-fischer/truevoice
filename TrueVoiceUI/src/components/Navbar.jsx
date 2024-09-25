import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
//For Nav Buttons
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Flex as="nav" p="10px" alignItems="center">
        <Heading as="h1">TrueVoice</Heading>
        <Spacer />
        <HStack spacing="10px">
          <Box bg="green.400" p="10px">
            HK
          </Box>
          <Text>hojun.kwak@stonybrook.edu</Text>
          <Button colorScheme="green"> logout</Button>
        </HStack>
      </Flex>
      <Flex
        as="nav"
        p="10px"
        justifyContent="center"
        gap="200px"
        alignItems="center"
        padding="20px"
      ></Flex>
      <Tabs colorScheme="green" align="center" isFitted padding="10px">
        <TabList>
          <Tab>
            <NavLink to="/">Home</NavLink>
          </Tab>
          <Tab>
            <NavLink to="bgInfo">Background Info</NavLink>
          </Tab>
          <Tab>
            <NavLink to="profile">About Us</NavLink>
          </Tab>
        </TabList>
      </Tabs>
    </>
  );
}
