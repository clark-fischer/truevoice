import { Box, Container, Heading, Text } from "@chakra-ui/react";

//react USA Map
import USAMap from "../components/Map";

export default function Dashboard() {
  return (
    <>
      <Container>
        <USAMap></USAMap>
        <Heading my="30px" p="10px">
          Dashboard
        </Heading>
        <Text marginLeft="30px">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
          magnam inventore eos quaerat id, sapiente tempora sunt quasi et
          temporibus vero rem quo, nobis provident blanditiis minus saepe
          recusandae odio?
        </Text>
        <Box>
          <Text>This is a box</Text>
        </Box>
      </Container>
    </>
  );
}
