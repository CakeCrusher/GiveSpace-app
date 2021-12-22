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
  Spacer,
  Flex,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import InnerTitle from "../InnerTitle/InnerTitle";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

const ActivityCard = (props) => {
  const timeAgo = new TimeAgo("en-US");
  const { friendObj, onPress } = props;

  let info;

  if (friendObj.label === "event") {
    const now = new Date();
    const event = new Date(friendObj.list.date_event);
    const nowToEvent = event.getTime() - now.getTime();
    const nowToEventHours = nowToEvent / 3600000;
    const nowToEventDays = Math.ceil(nowToEvent / 86400000);

    info = {
      timeAgo: "",
      message: `list due in ${nowToEventDays} ${
        nowToEventDays === 1 ? "day" : "days"
      }`,
      icon: "calendar",
    };
  }
  if (friendObj.label === "update") {
    info = {
      timeAgo: timeAgo.format(
        new Date(friendObj.list.date_modified),
        "round-minute"
      ),
      message: "updated",
      icon: "edit-3",
    };
  }
  if (friendObj.label === "create") {
    info = {
      timeAgo: timeAgo.format(
        new Date(friendObj.list.date_created),
        "round-minute"
      ),
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
              <HStack alignItems="center" space="2" w="100%">
                <Icon as={<Feather name={info.icon} />} size="xs" />
                <HStack justifyContent="space-between" w="86%">
                  <HStack>
                    <Text pr={1}>
                      {friendObj.label === "event"
                        ? friendObj.username + "'s"
                        : friendObj.username}
                    </Text>
                    <Text color="secondary.500">{" " + info.message}</Text>
                  </HStack>
                  <Text opacity={0.5} alignSelf="flex-end">
                    {info.timeAgo}
                  </Text>
                </HStack>
              </HStack>
              <VStack>
                <InnerTitle fontSize="lg">{friendObj.list.title}</InnerTitle>
              </VStack>
            </VStack>
          </HStack>
        </Pressable>
      </Box>
    </ZStack>
  );
};

export default ActivityCard;
