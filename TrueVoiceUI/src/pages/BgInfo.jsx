import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";

export default function BgInfo() {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="md" textTransform="uppercase">
              Summary
            </Heading>
            <Text pt="2" fontSize="sm">
              The project addresses gerrymandering and fair representation in
              congressional elections by comparing two electoral systems:
              Single-Member Districts (SMD) and Multi-Member Districts (MMD).
              Gerrymandering refers to manipulating electoral district
              boundaries to favor a particular political party or group, often
              resulting in skewed representation.
            </Text>
          </Box>
          <Box>
            <Heading size="md" textTransform="uppercase">
              Key Concepts
            </Heading>
            <Text pt="2" fontSize="sm">
              <Text pt="3" fontWeight="bold">
                1. Single-Member Districts (SMD):
              </Text>{" "}
              Each district elects one representative. The candidate with the
              most votes (usually through a "winner-takes-all" system) wins the
              seat. This system can sometimes result in disproportionate
              outcomes, where a party with a minority of the votes can win a
              majority of the seats.{" "}
            </Text>
            <Text pt="2" fontSize="sm">
              <Text pt="3" fontWeight="bold">
                2. Multi-Member Districts (MMD):
              </Text>{" "}
              Each district elects multiple representatives. This is often
              combined with ranked-choice voting (RCV) or the Single
              Transferable Vote (STV), which allows for more proportional
              representation. Voters rank candidates by preference, and
              candidates are elected in rounds.
            </Text>
            <Text pt="2" fontSize="sm">
              <Text pt="3" fontWeight="bold">
                3. Gerrymandering:{" "}
              </Text>
              The practice of redrawing electoral district boundaries to
              advantage one party or group, leading to uncompetitive elections
              and disproportionate representation.
            </Text>
            <Text pt="2" fontSize="sm">
              <Text pt="3" fontWeight="bold">
                4. Fair Representation Act (FRA):{" "}
              </Text>
              The FRA proposes using MMDs with ranked-choice voting to create
              fairer elections, particularly to reduce the effects of partisan
              gerrymandering.
            </Text>
          </Box>
          <Box>
            <Heading size="md" textTransform="uppercase">
              Analysis
            </Heading>
            <Text pt="2" fontSize="sm">
              MCMC, MGGG, Box/Whisker Plot, Bar Charts, Partisn Bias/symmetry
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
}
