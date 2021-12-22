import { Feather } from "@expo/vector-icons";
import { Button, HStack, Icon, Input } from "native-base";
import React, { useState } from "react";
import { connect } from "react-redux";

const ItemInput = ({ itemName, handleItemSubmit }) => {
  const [loading, setLoading] = useState(false);
  const onItemInput = () => {
    setLoading(true);
    setTimeout(() => {
      handleItemSubmit();
    }, 1);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <HStack>
      <Input {...itemName} placeholder="item name" borderRightRadius="0" />
      <Button
        onPress={onItemInput}
        isLoading={loading}
        borderRadius="3"
        borderLeftRadius="0"
      >
        <Icon as={<Feather name="plus" />} size="sm" color="white" />
      </Button>
    </HStack>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
  friendsState: state.friends,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ItemInput);
