import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { logout, updateUserImage } from "../redux/actions/user";

import { VStack, Button, Image, Avatar } from "native-base";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { fetchGraphQL } from "../utils/helperFunctions";
import { UPDATE_USER_IMAGE } from "../utils/schemas";

const GalleryButton = ({ userState, updateUserImage }) => {
  const [imageUri, setImageUri] = useState(null);

  const handleOnButtonPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
      console.log("!result.uri", result.uri);
      const imageBase64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const extension = result.uri.split(".").pop();
      console.log("!vars", {
        image_type: extension,
        user_id: userState.id,
        old_image_url: userState.profile_pic_url,
      });
      updateUserImage(result.uri);
      console.log("!updateUserImage1", userState.profile_pic_url);
      fetchGraphQL(UPDATE_USER_IMAGE, {
        image_type: extension,
        user_id: userState.id,
        old_image_url: userState.profile_pic_url,
        image_base64: imageBase64,
      })
        .then((fetchRes) => {
          console.log("!fetchRes", fetchRes);
          if (
            fetchRes.data.update_user_image.updateUserImageUserIdToUser
              .profile_pic_url
          ) {
            updateUserImage(
              fetchRes.data.update_user_image.updateUserImageUserIdToUser
                .profile_pic_url
            );
            console.log("!updateUserImage", userState.profile_pic_url);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <Button bg="#00000000" onPress={handleOnButtonPress}>
      <Avatar
        bg="#FAA"
        size="xl"
        source={{
          uri: imageUri
            ? imageUri
            : userState.profile_pic_url ||
              "https://via.placeholder.com/50/66071A/FFFFFF?text=GS",
        }}
      >
        EX
      </Avatar>
    </Button>
  );
};

const mapStateToProps = (state) => ({
  userState: state.user,
});
const mapDispatchToProps = (dispatch) => ({
  updateUserImage: (profile_pic_url) =>
    dispatch(updateUserImage(profile_pic_url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GalleryButton);
