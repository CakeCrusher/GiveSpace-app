import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { HStack, VStack, Text, Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";

const DateInput = ({ date, onDateChange, isUser, placeholder }) => {
  const [showDateInput, setShowDateInput] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDateInput(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleShowDate = () => {
    setShowDateInput(true);
  };

  return (
    <VStack opacity={0.7}>
      {isUser ? (
        <TouchableOpacity onPress={handleShowDate}>
          <HStack
            alignContent="center"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Icon as={<Feather name="calendar" />} mr={1} size="xs" />
            {date ? (
              <Text fontSize="sm">{date.toLocaleDateString()}</Text>
            ) : (
              <Text fontSize="sm" opacity={0.7}>
                {placeholder}
              </Text>
            )}
          </HStack>
        </TouchableOpacity>
      ) : (
        date && (
          <HStack
            alignContent="center"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Icon as={<Feather name="calendar" />} size="xs" />
            <Text fontSize="sm">{date.toLocaleDateString()}</Text>
          </HStack>
        )
      )}

      {showDateInput && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date ? date : new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </VStack>
  );
};

export default DateInput;
