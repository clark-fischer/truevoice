import {
  Box,
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

//react USA Map
import USAMap from "../components/Map";

export default function Dashboard() {
  return (
    <>
      <Container>
        <USAMap></USAMap>
        <Heading my="30px" p="10px">
          Colorado, Utah, Nevada
        </Heading>
        <Text>
          Colorado, Utah, and Nevada each have unique congressional districts,
          reflecting their population sizes, demographics, and political
          landscapes.
        </Text>
        <Box p={5}>
          <Heading as="h2" size="lg" mb={4}>
            Congressional Districts Overview
          </Heading>

          <Box mb={8}>
            <Heading as="h3" size="md" mb={2}>
              Colorado
            </Heading>
            <Text mb={2}>
              As of the 2020 Census, Colorado has 8 congressional districts:
            </Text>
            <UnorderedList>
              <ListItem>
                <strong>District 1:</strong> Covers Denver and its inner
                suburbs. Heavily Democratic.
              </ListItem>
              <ListItem>
                <strong>District 2:</strong> Encompasses Boulder and parts of
                the northern Front Range. Leans Democratic.
              </ListItem>
              <ListItem>
                <strong>District 3:</strong> Covers western and southern
                Colorado. More conservative.
              </ListItem>
              <ListItem>
                <strong>District 4:</strong> Northeastern Colorado, including
                Greeley and Fort Collins. Leans Republican.
              </ListItem>
              <ListItem>
                <strong>District 5:</strong> Includes Colorado Springs. A
                Republican stronghold.
              </ListItem>
              <ListItem>
                <strong>District 6:</strong> Suburbs of Denver like Aurora.
                Leans Democratic.
              </ListItem>
              <ListItem>
                <strong>District 7:</strong> Western suburbs of Denver.
                Typically competitive, leans Democratic.
              </ListItem>
              <ListItem>
                <strong>District 8:</strong> A newly created district in the
                Denver metro area, expected to be competitive.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box mb={8}>
            <Heading as="h3" size="md" mb={2}>
              Utah
            </Heading>
            <Text mb={2}>
              Utah has 4 congressional districts as of the 2020 Census:
            </Text>
            <UnorderedList>
              <ListItem>
                <strong>District 1:</strong> Covers northern Utah, including
                Weber and Davis counties. Generally Republican.
              </ListItem>
              <ListItem>
                <strong>District 2:</strong> Encompasses central and southern
                Utah, including Salt Lake City suburbs. Also Republican.
              </ListItem>
              <ListItem>
                <strong>District 3:</strong> Includes parts of Utah County,
                leaning Republican.
              </ListItem>
              <ListItem>
                <strong>District 4:</strong> Covers urban areas in Salt Lake
                County and Utah County, competitive.
              </ListItem>
            </UnorderedList>
          </Box>

          <Box mb={8}>
            <Heading as="h3" size="md" mb={2}>
              Nevada
            </Heading>
            <Text mb={2}>Nevada has 4 congressional districts:</Text>
            <UnorderedList>
              <ListItem>
                <strong>District 1:</strong> Primarily includes Las Vegas urban
                core, heavily Democratic.
              </ListItem>
              <ListItem>
                <strong>District 2:</strong> Covers northern Nevada, including
                Reno, leaning Republican.
              </ListItem>
              <ListItem>
                <strong>District 3:</strong> Encompasses southern Nevada,
                including Henderson, competitive and often Democratic.
              </ListItem>
              <ListItem>
                <strong>District 4:</strong> Mix of urban and rural areas,
                competitive with a Democratic lean.
              </ListItem>
            </UnorderedList>
          </Box>
        </Box>
        <Text fontWeight="bold">Summary</Text>
        Each state’s congressional districts are shaped by various factors,
        including population density, urban versus rural divides, and historical
        voting patterns. In general, Colorado and Nevada tend to have more
        competitive and Democratic-leaning districts, while Utah maintains a
        strong Republican presence across its districts.
      </Container>
    </>
  );
}
