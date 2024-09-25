import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <Wrap>
      <WrapItem>
        <Avatar name="Clark Fischer" src="https://bit.ly/broken-link" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Melissa Sanchez" src="https://bit.ly/broken-link" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Hojun Kwak" src="https://bit.ly/broken-link" />
      </WrapItem>
      <WrapItem>
        <Avatar name="Hanseung Choi" src="https://bit.ly/broken-link" />
      </WrapItem>
    </Wrap>
  );
}
