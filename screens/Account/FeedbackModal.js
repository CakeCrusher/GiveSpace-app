import React, { useEffect, useState } from "react";
import {
  Modal,
  VStack,
  HStack,
  Button,
  TextArea,
  Center,
  Text,
} from "native-base";
import { fetchGraphQL, useField } from "../../utils/helperFunctions";
import { SEND_FEEDBACK } from "../../utils/schemas";

const FeedbackModal = ({ isOpen, onClose }) => {
  const body = useField("text", "");
  const [feedbackSent, setFeedbackSent] = useState(false);
  useEffect(() => {
    setFeedbackSent(false);
  }, [onClose]);
  const handleSendFeedback = () => {
    fetchGraphQL(SEND_FEEDBACK, {
      body: body.value,
    });
    body.onChangeText("");
    setFeedbackSent(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <Modal.Header>How can we improve</Modal.Header>
        <Modal.Body>
          {feedbackSent ? (
            <Center>
              <Text fontSize="2xl">🤗 Thank you</Text>
            </Center>
          ) : (
            <VStack space="4">
              <Center>
                <TextArea
                  {...body}
                  h={20}
                  w="90%"
                  placeholder="Once upon a time..."
                />
                <Button px={10} mt={4} onPress={handleSendFeedback}>
                  Submit feedback
                </Button>
              </Center>
            </VStack>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default FeedbackModal;
