import React from "react";
import { connect } from "react-redux";
import {
  Text,
  Heading,
  Button,
  VStack,
  ScrollView,
  Box,
  HStack,
  View,
  Avatar,
} from "native-base";

import { ListPreview } from "../../components";

const FriendAccountPage = ({ navigation, userState, friendsState }) => {
  return (
    <VStack safeArea p="4">
      <ScrollView>
        <HStack alignItems="center" space="4">
          <Box flex="2">
            <Avatar
              bg="#FAA"
              size="xl"
              source={{
                uri: userState.profile_pic_url || "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
              }}
            >
              EX
            </Avatar>
          </Box>
          <VStack flex="5" ml="auto">
            <Text fontSize="3xl">{userState.username}</Text>
            {/*
          TODO: Description to be added
          <Text noOfLines={2}>
            ttestetstes tstsetsetse testetests estestestets etstestets
            etsettestest ests etse testsetseteste sette
          </Text>
          */}
          </VStack>
        </HStack>

        <HStack space="4" mt="4">
          {/*TODO: Change these*/}
          <HStack space="2">
            <Text>_</Text>
            <Text>Birthday</Text>
          </HStack>
          <HStack space="2">
            <Text>_</Text>
            <Text>State, City</Text>
          </HStack>
        </HStack>

        <VStack flex="5" space="2">
          <Text fontSize="2xl">My Lists</Text>
          {userState.lists ? (
            <>
              <View maxH="80">
                <ScrollView>
                  {userState.lists.map((e) => (
                    <ListPreview key={e.id} listData={e} mb="2" />
                  ))}
                  {userState.lists.map((e) => (
                    <ListPreview key={e.id} listData={e} mb="2" />
                  ))}
                  {userState.lists.map((e) => (
                    <ListPreview key={e.id} listData={e} mb="2" />
                  ))}
                  {userState.lists.map((e) => (
                    <ListPreview key={e.id} listData={e} mb="2" />
                  ))}
                </ScrollView>
              </View>
              <View h="2" />
              <Button
                variant="outline"
                onPress={() => navigation.navigate("My Lists")}
              >
                All Lists
              </Button>
            </>
          ) : (
            <Text fontSize="2xl">You don't have any lists!</Text>
          )}
        </VStack>

        <VStack>
          <Text fontSize="3xl">Friends</Text>
          {/* Add Friends */}
          <HStack flexWrap="wrap">
            {friendsState.list.map((e) => (
              <Box
                key={e.id}
                flexBasis="25%"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar size="md" bg="#FAF" />
              </Box>
            ))}
          </HStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

export default connect(mapStateToProps, null)(FriendAccountPage);
