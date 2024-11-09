import { Heading } from "@chakra-ui/react";
//For Nav Buttons
import { NavLink, useLocation } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <>
//       <Flex as="nav" p="10px" alignItems="center" justifyContent="space-between">
//         <Heading as={NavLink} to="/" fontSize="xl">
//           TrueVoice:  Nevada
//         </Heading>

//         <Spacer />
//         <HStack spacing="10px">
//           <Button
//             as={NavLink}
//             to="https://www.congress.gov/bill/117th-congress/house-bill/3863"
//             variant="outline"
//             colorScheme="green"
//           >
//             Read the Bill
//           </Button>

//           <Button as={NavLink} to="/profile" colorScheme="green">
//             Contact Us
//           </Button>
//         </HStack>
//       </Flex>
//     </>
//   );
// }

const Navbar = () => {
  const location = useLocation();
  const selectedState =
    location.pathname === "/nevada"
      ? "Nevada"
      : location.pathname === "/colorado"
      ? "Colorado"
      : "TrueVoice";
  return (
    <nav
      style={{
        width: "100%",
        height: "64px",
        backgroundColor: "white",
        // boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 24px",
        // paddingBottom: '15px',
        position: "relative",
      }}
    >
      {/* Left side */}
      <Heading as={NavLink} to="/" fontSize="xl">
        TrueVoice
      </Heading>

      {/* Center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            margin: 0,
            // paddingBottom: '15px'
          }}
        >
          {selectedState}
        </h1>
      </div>

      {/* Right side */}
      <div
        style={{
          display: "flex",
          gap: "16px",
        }}
      >
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#3B82F6",
            border: "1px solid #3B82F6",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
