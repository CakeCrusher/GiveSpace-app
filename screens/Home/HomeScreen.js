import React from "react";
import { connect } from "react-redux";
import { Text, Button, HStack, VStack, Center, ScrollView } from "native-base";

import { ScreenContainer, ListPreview, InnerTitle } from "../../components";

import Feed from "./Feed";

const HomeScreen = ({ userState, friendsState, navigation }) => {
  const navigateMyLists = () => {
    navigation.navigate('My Lists');
  };

  const handleLoadList = (listData, userData) => {
    navigation.navigate("Home", {
      screen: "List",
      params: {
        listData,
        userData,
      },
    });
  };

  //console.log(splitFriends);
  let dateNow = new Date().toLocaleDateString();
  let hourNow = new Date().getHours();
  let greeting;
  if (hourNow < 12) {
    greeting = "Good morning";
  } else if (hourNow < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  // get the hour of timeNow

  // transform time to readable format
  return (
    <ScreenContainer>
      <ScrollView stickyHeaderIndices={[0, 3]}>
        <HStack justifyContent="space-between" bg="#f1f1f1">
          <Text fontSize="md">
            {greeting}, {userState.username}
          </Text>
          <Text fontSize="md">{dateNow}</Text>
        </HStack>

        <InnerTitle mb={2}>Recent</InnerTitle>
        <VStack flex="5" mb={4} space="2">
          {userState.lists[0] ? (
            <>
              <ListPreview
                key={
                  userState.lists[0]
                    ? userState.lists[0].items
                        .map((item) => item.name[0])
                        .toString()
                    : ""
                }
                onPress={() => handleLoadList(userState.lists[0], userState)}
                username={userState.username}
                listData={userState.lists[0]}
                flex="1"
              />
              <Button
                mt="2"
                _text={{ fontSize: "xl" }}
                variant="outline"
                onPress={() => navigation.navigate("My Lists")}
              >
                All Lists
              </Button>
            </>
          ) : (
            <Center bg="#e4e4e4" borderRadius="8" py="16" px="8">
              <Text color="#707070">You don't have any lists yet.</Text>
              <Text color="#707070">
                Create one in&nbsp;
                <Text onPress={navigateMyLists} underline>
                  My Lists
                </Text>
                !
              </Text>
            </Center>
          )}
        </VStack>

        <InnerTitle bg="#f1f1f1" w="100%" mb={2}>
          Activity
        </InnerTitle>
        <VStack flex="7" space="2">
          <Feed handleLoadList={handleLoadList} />
        </VStack>
      </ScrollView>
    </ScreenContainer>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
