import { useEffect } from "react";
//Chakra UI
import {

  Container,
  Heading,
  ScaleFade,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
//react USA Map
import USAMap from "../components/Map";
//Marquee(Fancy moving text)
import Marquee from "../components/Marquee";

export default function Dashboard() {
  // useEffect(() => {
  //   setIsOpen(true);
  // }, []);
  const { isOpen, onToggle } = useDisclosure();
  // const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // setHasLoaded(true);
    if (!isOpen) onToggle();
  }, [isOpen, onToggle]);

  return (
    <>
      <ScaleFade initialScale={0.7} in={isOpen}>
        <Container centerContent maxW="1000px">
          <Heading>Explore Gerrymandering in your state.</Heading>
          <span>
            Click on a state to learn more about the effects of SMDs and how the
            FRA aims to help.
          </span>
        </Container>
      </ScaleFade>
      <Marquee />
      <USAMap></USAMap>
      
      <DropdownMenu />
    </>
  );
}

function DropdownMenu() {
  const handleChange = (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      window.location.href = selectedUrl;
    }
  };

  return (

    <Center>
    <div style={{fontSize: "50px"}}>
      <label htmlFor="site-dropdown">Go to: </label>
      <select id="site-dropdown" onChange={handleChange}>
        <option value="">--Select--</option>
        <option value="http://localhost:5173/colorado">Colorado</option>
        <option value="http://localhost:5173/nevada">Nevada</option>
      </select>
    </div>
    </Center>
  );
}
