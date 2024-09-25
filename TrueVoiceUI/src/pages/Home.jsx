import { Box, Container, Heading, Text } from "@chakra-ui/react";
//Leaflet/Map
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Dashboard() {
  return (
    <>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      <Container>
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
