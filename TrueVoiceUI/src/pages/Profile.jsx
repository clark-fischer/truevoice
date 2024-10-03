import {
  Avatar,
  Button,
  Flex,
  Box,
  Text,
  Heading,
  Textarea,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const profiles = [
    {
      name: "Clark Fischer",
      role: "Front-End Developer",
      studentId: "12345678",
      email: "clark.fischer@stonybrook.edu",
    },
    {
      name: "Melissa Sanchez",
      role: "SeaWulf Developer",
      studentId: "23456789",
      email: "melissa.sanchezpena@stonybrook.edu",
    },
    {
      name: "Hojun Kwak",
      role: "Front-End Developer",
      studentId: "113949335",
      email: "hojun.kwak@stonybrook.edu",
    },
    {
      name: "Hanseung Choi",
      role: "Back-End Developer",
      studentId: "45678901",
      email: "hanseung.choi@stonybrook.edu",
    },
  ];

  // State to store the currently selected profile
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);

  return (
    <>
      {/* <Button as={NavLink} to="/" colorScheme="green" ml="30px" my="20px">
        Home
      </Button> */}

      {/* List of profiles to click */}
      <Flex justify="center" flexWrap="nowrap" gap="30px">
        {profiles.map((profile, index) => (
          <Box
            key={index}
            p="4"
            boxShadow="md"
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
            minWidth="150px"
            flexShrink={1}
            transform="scale(0.9)"
            _hover={{ transform: "scale(1)", cursor: "pointer" }}
            transition="transform 0.2s ease-in-out"
            onClick={() => setSelectedProfile(profile)} // Update selected profile
          >
            <Avatar
              name={profile.name}
              size={["sm", "md", "lg", "xl"]}
              mb="4"
            />
            <Heading size="md" mb="2" fontSize={["16px", "18px", "20px"]}>
              {profile.name}
            </Heading>
            <Text fontWeight="bold" fontSize={["12px", "14px", "16px"]}>
              {profile.role}
            </Text>
            <Text fontSize={["10px", "12px", "14px"]} color="gray.500">
              ID: {profile.studentId}
            </Text>
            <Text fontSize={["10px", "12px", "14px"]} color="blue.500">
              {profile.email}
            </Text>
          </Box>
        ))}
      </Flex>

      {/* Display the selected profile next to the question page */}
      <Flex justify="center" mt="30px">
        <Box maxW="800px" w="full">
          <HStack align="start" spacing="30px">
            <Box
              p="4"
              boxShadow="md"
              borderWidth="1px"
              borderRadius="lg"
              minWidth="200px"
            >
              <Avatar name={selectedProfile.name} size="xl" mb="4" />
              <Heading size="md" mb="2">
                {selectedProfile.name}
              </Heading>
              <Text fontWeight="bold">{selectedProfile.role}</Text>
              <Text fontSize="sm" color="gray.500">
                ID: {selectedProfile.studentId}
              </Text>
              <Text fontSize="sm" color="blue.500">
                {selectedProfile.email}
              </Text>
            </Box>

            <VStack align="start" spacing="20px" w="full">
              <Input placeholder="Title" width="full" borderColor="green.500" />
              <Textarea
                placeholder="Ask us anything!"
                width="full"
                height="200px"
                borderColor="green.500"
              />
              <Button colorScheme="green" marginBottom="30%">
                {/* Have to resolve footer location */}
                Submit
              </Button>
            </VStack>
          </HStack>
        </Box>
      </Flex>
    </>
  );
}
