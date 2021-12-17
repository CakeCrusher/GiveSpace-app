import React from "react";
import { Text, Button, HStack, VStack, Box, ScrollView } from "native-base";

import { ListPreview, ActivityCard, InnerTitle } from "../../components";
import { connect } from "react-redux";

const Feed = ({ friendsState, handleLoadList }) => {
  const now = new Date();
  const assignLabelAndScore = (friendObj) => {
    const created = new Date(friendObj.list.date_created);
    const nowToCreated = now.getTime() - created.getTime();
    const nowToCreatedHours = nowToCreated / 3600000;
    const nowToCreatedDays = nowToCreated / 86400000;

    const modified = new Date(friendObj.list.date_modified);
    const nowToModified = now.getTime() - modified.getTime();
    const nowToModifiedHours = nowToModified / 3600000;
    const nowToModifiedDays = nowToModified / 86400000;

    const difCreatedToUpdated = modified.getTime() - created.getTime();
    const difCreatedToUpdatedDays = difCreatedToUpdated / 86400000;
    const daysAgo = Math.ceil(difCreatedToUpdated / 86400000);

    const dateEvent = new Date(friendObj.list.date_event);
    const nowToEvent = dateEvent.getTime() - now.getTime();
    const nowToEventDays = nowToEvent / 86400000;

    if (nowToEvent > 0 && nowToEventDays <= 7) {
      // Event
      const score = 7 / nowToEventDays;
      console.log("!Event", friendObj.username, nowToEvent);

      return { label: "event", score };
    } else if (difCreatedToUpdatedDays > 1) {
      // Update
      if (nowToModifiedDays < 0.5) {
        const score = 12 / nowToModifiedHours;
        console.log("!update", nowToModifiedHours);

        return { label: "update", score };
      } else {
        const score = 2 / nowToModifiedDays;

        return { label: "update", score };
      }
    } else if (difCreatedToUpdatedDays <= 1) {
      // Create
      if (nowToCreatedDays < 0.5) {
        const score = 3;

        return { label: "create", score };
      } else {
        const score = 1 / nowToCreatedDays;

        return { label: "create", score };
      }
    }
  };

  const friendsWithLists = friendsState.list.filter(
    (friend) => friend.lists.length > 0
  );

  const friendLists = [];
  friendsWithLists.forEach((friend) => {
    friend.lists.forEach((list) => {
      const friendCopy = { ...friend };
      delete friendCopy.lists;

      const friendObj = {
        ...friendCopy,
        list,
      };

      const scoreAndLabel = assignLabelAndScore(friendObj);
      friendObj.label = scoreAndLabel.label;
      friendObj.score = scoreAndLabel.score;

      friendLists.push(friendObj);
    });
  });
  // reorder friendLists by score
  const sortedFriendLists = friendLists.sort((a, b) => {
    return b.score - a.score;
  });
  console.log(
    "!sortedFriendLists",
    sortedFriendLists.map((fl) => ({
      username: fl.username,
      score: fl.score,
      title: fl.list.title,
    }))
  );

  const orderedLists = [];

  // const created = new Date(listData.date_created);
  // const modified = new Date(listData.date_modified);
  // const dif = modified.getTime() - created.getTime();
  // const isCreated = dif < 8640000;

  return (
    <VStack flex="1" pt="2" space="4">
      {sortedFriendLists.map((friend, index) => (
        <Box w="full" key={`${friend.id}${friend.list.id}`}>
          <ActivityCard
            key={`${friend.id}${friend.score}`}
            friendObj={friend}
            onPress={() => handleLoadList(friend.list, friend)}
            flex="1"
          />
        </Box>
      ))}
    </VStack>
  );
};

const mapStateToProps = (state) => ({
  friendsState: state.friends,
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
