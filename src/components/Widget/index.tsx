import React, { useRef, useState } from "react";
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
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.expand();
  };

  const handleRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  const handleFeedbackSent = () => {
    setFeedbackSent(true);
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
        children={
          feedbackSent ? (
            <Success onSendAnotherFeedback={handleRestartFeedback} />
          ) : (
            <>
              {feedbackType ? (
                <Form
                  feedbackType={feedbackType}
                  onFeedbackSent={handleFeedbackSent}
                  onFeedbackCanceled={handleRestartFeedback}
                />
              ) : (
                <Options onFeedbackTypeChanged={setFeedbackType} />
              )}
            </>
          )
        }
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      />
    </>
  );
};

export default gestureHandlerRootHOC(Widget);
