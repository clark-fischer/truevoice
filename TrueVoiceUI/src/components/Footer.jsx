import React from "react";
import { Box, Text, Divider, Link, Stack } from "@chakra-ui/react";

export default function Footer() {
  return (
    <footer position="fixed" bottom="0">
      <Box as="footer" bg="gray.800" color="gray.200" py={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          px={8}
        >
          <Text fontSize="sm">&copy; {new Date().getFullYear()} TrueVoice</Text>
          <Stack direction="row" spacing={6}>
          <p>Data was sourced from <Link href="https://redistrictingdatahub.org/">https://redistrictingdatahub.org/</Link>, <Link href="https://ballotpedia.org//">https://ballotpedia.org/</Link></p>
          </Stack>
        </Stack>
        <Divider mt={6} />
        <Text textAlign="center" mt={6} fontSize="xs" color="gray.500">
          CSE416: FINAL PROJECT!! :)
        </Text>
      </Box>
    </footer>
  );
}
