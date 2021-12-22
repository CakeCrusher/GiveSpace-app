import React, { useState } from "react";
import {
  Text,
  Avatar,
  Icon,
  Button,
  Pressable,
  Input,
  Modal,
  Center,
  Box,
  Flex,
  HStack,
  VStack,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import {
  ItemInput,
  ItemCard,
  Flare,
  ScreenContainer,
  DateInput,
  ShareButton,
  PopoverIcon,
  Fab,
  InnerTitle,
} from "../../components";
import { useField, fetchGraphQL } from "../../utils/helperFunctions";
import {
  SCRAPE_ITEM,
  UPDATE_LIST_TITLE,
  MARK_ITEM_FOR_PURCHASE,
  CANCEL_ITEM_FOR_PURCHASE,
  UPDATE_LIST_DATE_EVENT,
} from "../../utils/schemas";

import SelectItemModal from "./SelectItemModal";

const ListDisplay = ({
  navigation,
  list,
  isUser,
  handleConfirmDelete,
  userData,
  userState,
  addListItem,
  editListTitle,
  editListDateEvent,
}) => {
  const title = useField("text", list.title);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const itemName = useField("text");

  const [enableSearch, setEnableSearch] = useState(false);
  const searchInput = useField("text");

  const [selectItem, setSelectItem] = useState(null);

  const [enableDelete, setEnableDelete] = useState(false);
  const [selectDelete, setSelectDelete] = useState(new Set());
  const [deleteModal, setDeleteModal] = useState(false);

  const [date, setDate] = useState(
    list.date_event ? new Date(list.date_event) : null
  );

  /** OTHER USER functions **/
  const handlePurchaseItem = (itemId, cb) => {
    fetchGraphQL(MARK_ITEM_FOR_PURCHASE, {
      item_id: itemId,
      user_id: userState.id,
    })
      .then((res) => {
        if (res.errors) {
          console.warn(res.errors);
        }
        cb();
      })
      .catch((err) => console.warn(err));
  };

  const handleCancelPurchase = (itemId, cb) => {
    fetchGraphQL(CANCEL_ITEM_FOR_PURCHASE, {
      item_id: itemId,
    })
      .then((res) => {
        if (res.errors) {
          console.warn(res.errors);
        }
        cb();
      })
      .catch((err) => console.warn(err));
  };

  /** LIST OWNER functions **/
  const handleItemSubmit = () => {
    setIsSubmitting(true);
    // create a promise called that resolves after 2 seconds
    fetchGraphQL(SCRAPE_ITEM, {
      list_id: list.id,
      item_name: itemName.value,
    })
      .then((res) => {
        if (res.errors || !res.data.scrape_item.itemIdToItem) {
          itemName.onChangeText("");
          setIsSubmitting(false);
        } else {
          addListItem(list.id, res.data.scrape_item.itemIdToItem);
          itemName.onChangeText("");
          setIsSubmitting(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      itemName.onChangeText("");
    }, 500);
  };

  const handleEnableDelete = () => {
    setEnableDelete(true);
  };

  const handleCancelDelete = () => {
    setDeleteModal(false);
    setEnableDelete(false);
    setSelectDelete(new Set());
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const handleCardPress = (item) => {
    setSelectItem(item.id);
  };

  const handleClearSelect = () => {
    setSelectItem(null);
  };

  const handleTitleSet = () => {
    fetchGraphQL(UPDATE_LIST_TITLE, {
      list_id: list.id,
      title: title.value,
    })
      .then((res) => {
        if (res.errors) {
          console.warn(res.errors);
        }
        const resData = res.data.update_list.returning[0];
        editListTitle(resData.id, resData.title);
      })
      .catch((err) => console.warn(err));
  };

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    editListDateEvent(list.id, selectedDate.toISOString());
    fetchGraphQL(UPDATE_LIST_DATE_EVENT, {
      list_id: list.id,
      date_event: selectedDate.toISOString(),
    })
      .then((fetchRes) => {
        if (fetchRes.errors || !fetchRes.data.update_list.returning[0]) {
          console.warn(fetchRes.errors);
        } else {
          editListDateEvent(
            list.id,
            fetchRes.data.update_list.returning[0].date_event
          );
        }
      })
      .catch((err) => console.warn(err));
  };

  let listFilter =
    enableSearch && searchInput.value !== ""
      ? list.items.filter((item) =>
          item.name.toLowerCase().includes(searchInput.value.toLowerCase())
        )
      : list.items;

  listFilter = isSubmitting
    ? [...listFilter, { id: 0, name: "loading..." }]
    : listFilter;

  const handleSelectDelete = (itemId) => {
    console.log(itemId);
    setSelectDelete((prev) => {
      if (prev.has(itemId)) {
        prev.delete(itemId);
      } else {
        prev.add(itemId);
      }
      return prev;
    });
  };

  const handleEnableSearch = () => {
    setEnableSearch((prev) => !prev);
  };

  if (list.title.includes("Christmas")) {
    console.log("!list", list);
  }

  const handleLoadAccount = () => {
    console.log("handleLoadAccount");
    // navigation.navigate("FriendAccount", {
    //   userId: userData.id,
    // });
    if (isUser) {
      navigation.navigate("Account");
    } else {
      navigation.navigate("Friends", {
        screen: "FriendAccount",
        params: { userId: userData.id },
      });
    }
  };

  return (
    <ScreenContainer>
      {/* Nav, ListTitle, Username*/}
      <HStack flex="3" alignItems="center" mx="-2">
        <Box flex="1">
          <Pressable onPress={() => navigation.goBack()}>
            <Icon as={<Feather name="chevron-left" />} size="xl" />
          </Pressable>
        </Box>
        <Center flex="1">
          <Pressable onPress={handleLoadAccount}>
            <Avatar
              key={userData.profile_pic_url}
              bg="#FAA"
              size="lg"
              source={{
                uri:
                  userData.profile_pic_url ||
                  "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
              }}
            />
          </Pressable>
        </Center>
        <VStack flex="5" pl="4" justifyContent="center">
          <Text fontSize="lg">{isUser ? "You" : userData.username}</Text>
          {isUser ? (
            <Flex h="10">
              <Input
                backgroundColor="#ffffff00"
                borderColor="#ffffff00"
                placeholder="list title"
                fontSize="2xl"
                p="0"
                onEndEditing={handleTitleSet}
                {...title}
              />
            </Flex>
          ) : (
            <InnerTitle fontSize="2xl" isTruncated>
              {list.title}
            </InnerTitle>
          )}
          <DateInput
            date={date}
            isUser={isUser}
            onDateChange={onDateChange}
            placeholder="Event date"
          />
        </VStack>
      </HStack>

      {/* Share, Search, Options*/}
      <VStack flex="2">
        <HStack
          alignItems="center"
          justifyContent="space-between"
          flex="1"
          p="2"
        >
          <ShareButton
            message={`https://give-space-website.vercel.app/list/${list.id}`}
          />

          <HStack flex="3">
            <HStack ml="auto" space="4" alignItems="center">
              {enableSearch && <Input h="8" ml="4" {...searchInput} />}
              <Pressable onPress={handleEnableSearch}>
                <Icon as={<Feather name="search" />} size="sm" />
              </Pressable>
              {isUser && (
                <PopoverIcon iconName="more-vertical" menuTitle="List Options">
                  {enableDelete ? (
                    <Pressable onPress={handleCancelDelete}>
                      <Box p="2">
                        <Text color="blue.500">Cancel Delete</Text>
                      </Box>
                    </Pressable>
                  ) : (
                    <Pressable onPress={handleEnableDelete}>
                      <Box p="2">
                        <Text color="red.500">Delete Items</Text>
                      </Box>
                    </Pressable>
                  )}
                </PopoverIcon>
              )}
            </HStack>
          </HStack>
        </HStack>
      </VStack>

      {/* Add Item, Item Modal, Display Items*/}
      {isUser && (
        <VStack flex="2">
          <ItemInput
            itemName={itemName}
            handleItemSubmit={handleItemSubmit}
            listId={list.id}
          />
        </VStack>
      )}

      <VStack flex="16">
        <ScrollView>
          <HStack flexWrap="wrap" justifyContent="space-between">
            {listFilter.map((item) => (
              <Flex onPress={handleCardPress} key={item.id} w="48%">
                {enableDelete ? (
                  <ItemCard
                    item={item}
                    check={{
                      isChecked: selectDelete.has(item.id),
                      onPress: () => handleSelectDelete(item.id),
                    }}
                  />
                ) : (
                  <ItemCard
                    item={item}
                    handlePress={() => handleCardPress(item)}
                  />
                )}
              </Flex>
            ))}
            {isSubmitting && <Flex onPress={() => {}} w="48%"></Flex>}
          </HStack>
        </ScrollView>
      </VStack>

      {selectItem && (
        <SelectItemModal
          navigation={navigation}
          isOpen={selectItem !== null}
          onClose={handleClearSelect}
          item={list.items.find((e) => e.id === selectItem)}
          isUser={isUser}
          userState={userState}
          handlePurchaseItem={handlePurchaseItem}
          handleCancelPurchase={handleCancelPurchase}
        />
      )}
      {enableDelete && <Fab onPress={openDeleteModal} iconName="trash" />}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal}>
        <Modal.Content>
          <Modal.Header>
            Are you sure you want to delete these items?
          </Modal.Header>
          <Modal.Body>
            <VStack space="4">
              <HStack space="4">
                <Button
                  onPress={handleCancelDelete}
                  flex="1"
                  colorScheme="info"
                >
                  No
                </Button>
                <Button
                  onPress={() =>
                    handleConfirmDelete([...selectDelete], handleCancelDelete)
                  }
                  flex="1"
                  colorScheme="danger"
                >
                  Yes
                </Button>
              </HStack>
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </ScreenContainer>
  );
};

export default ListDisplay;
