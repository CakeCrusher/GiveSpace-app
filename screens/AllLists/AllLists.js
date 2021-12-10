import React, { useState, useEffect } from "react";
import {
  Text,
  Heading,
  Button,
  Avatar,
  Box,
  HStack,
  VStack,
  ScrollView,
  Fab,
  Icon,
} from "native-base";
import { connect } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { ListPreview } from "../../components";

const AllLists = ({ route, navigation, userState }) => {
  const { userId, tabName } = route.params;
  const [lists, setLists] = useState(null);

  useEffect(() => {
    console.log(userId, userState.id);
    if (userId === userState.id) {
      console.log(userState.lists);
      setLists(userState.lists);
    } else {
      // TODO: Make a Fetch
      setLists([]);
    }
  }, []);

  const handleLoadList = (listData) => {
    navigation.navigate(tabName, {
      screen: "List",
      params: { listData, userId },
    });
  };

  return (
    <VStack space="4" p="4" flex="1" bg="#dfdfdf" safeArea>
      <HStack flex="1" alignItems="center">
        <Avatar bg="#FAA" source={{ uri: "" }}>
          EX
        </Avatar>
        <Heading ml="4">
          {userId === userState.id ? "Your " : `${userState.username}'s `}
          Lists
        </Heading>
      </HStack>
      <VStack flex="15">
        <ScrollView>
          {lists &&
            lists.map((list, index) => (
              <Box mb="4">
                <ListPreview
                  key={list.id}
                  listData={list}
                  onPress={() => handleLoadList(list)}
                />
              </Box>
            ))}
        </ScrollView>
      </VStack>
      {userId === userState.id && (
        <Button
          position="absolute"
          borderRadius="32"
          h="16"
          w="16"
          bottom="4"
          right="4"
          zIndex="99"
        >
          <Icon as={<Feather name="plus" />} size="sm" color="white" />
        </Button>
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});

export default connect(mapStateToProps, {})(AllLists);
