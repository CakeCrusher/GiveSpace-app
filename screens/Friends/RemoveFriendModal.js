import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import { Modal, Text, Icon, Input, HStack, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

import AddFriendRow from "./AddFriendRow";

import { debounce, friendState } from "../../utils/helperFunctions";
import { fetchGraphQL } from "../../utils/helperFunctions";
import { SEARCH_FOR_USERS, CREATE_FRIEND_REL } from "../../utils/schemas";
import { addPendingThem } from "../../redux/actions/friends";

const RemoveFriendModal = ({ isOpen, onClose, handleRemoveFriend }) => {
  const handleConfirm = () => {
    handleRemoveFriend();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="85%">
        <Modal.CloseButton />
        <Modal.Header>
          <Text fontSize="2xl">Are you sure?</Text>
        </Modal.Header>
        <Modal.Body>
          <HStack space="4">
            <Button variant="outline" onPress={handleConfirm} flex="1">
              Yes
            </Button>
            <Button flex="1" onPress={onClose}>
              No
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFriendModal);
