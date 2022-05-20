import React, { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { ChatTeardropDots } from "phosphor-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Form } from "../Form";
import { Options } from "../Options";
import { Success } from "../Success";

import { styles } from "./styles";
import { theme } from "../../theme";

export type FeedbackType = keyof typeof feedbackTypes;

const Widget: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        children={<Form feedbackType="BUG" />}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      />
    </>
  );
};

export default gestureHandlerRootHOC(Widget);
