import React from "react";
import { Share } from "react-native";
import { Button, HStack, Icon, Text, View } from "native-base";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ShareButton = ({ message }) => {
  const handleShare = async () => {
    console.log("handleshare");
    // https://give-space-website.vercel.app/list/e2d57ee5-43bc-4f10-93e5-3d2b1604ec5a
    try {
      const result = await Share.share({
        message,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity p={0} h={7} bg="#ffffff00" onPress={handleShare}>
      <View flexDirection="row">
        <Icon as={<Feather name="share-2" />} size="sm" />
        <Text pl={1}>Share</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ShareButton;
