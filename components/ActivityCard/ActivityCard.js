import React from "react";
import {
  Icon,
  Avatar,
  Text,
  Box,
  VStack,
  HStack,
  ZStack,
  Pressable,
} from "native-base";
import { Feather } from "@expo/vector-icons";

const ActivityCard = (props) => {
  const { friendObj, onPress } = props;

  let info;

  if (friendObj.label === "event") {
    const now = new Date();
    const modified = new Date(friendObj.list.date_modified);
    const nowToModified = now.getTime() - modified.getTime();
    const nowToModifiedHours = nowToModified / 3600000;
    const nowToModifiedDays = Math.ceil(nowToModified / 86400000);

    info = {
      message: `list due in ${nowToModifiedDays} days`,
      icon: "calendar",
    };
  }
  if (friendObj.label === "update") {
    info = {
      message: "updated",
      icon: "edit-3",
    };
  }
  if (friendObj.label === "create") {
    info = {
      message: "created",
      icon: "upload",
    };
  }

  return (
    <ZStack minH="18">
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="95%"
        w="95%"
        bg="#DEDEDE"
        borderRadius="8"
      />

      <Box
        position="absolute"
        bottom="2"
        left="2"
        h="95%"
        w="95%"
        bg="#FFF"
        borderRadius="8"
      >
        <Pressable onPress={onPress}>
          <HStack space="2" p="2">
            <Avatar
              size="xs"
              bg="secondary"
              source={{ uri: friendObj.profile_pic_url }}
            />

            <VStack>
              <HStack alignItems="center" space="2">
                <Icon as={<Feather name={info.icon} />} size="xs" />
                <HStack>
                  <Text pr={1}>
                    {friendObj.label === "event"
                      ? friendObj.username + "'s"
                      : friendObj.username}
                  </Text>
                  <Text color="secondary.500">{" " + info.message}</Text>
                </HStack>
              </HStack>
              <VStack>
                <Text fontSize="lg">{friendObj.list.title}</Text>
              </VStack>
            </VStack>
          </HStack>
        </Pressable>
      </Box>
    </ZStack>
  );
};

export default ActivityCard;
