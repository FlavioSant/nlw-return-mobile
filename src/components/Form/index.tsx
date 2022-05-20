import { ArrowLeft } from "phosphor-react-native";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { captureScreen } from "react-native-view-shot";
import { feedbackTypes } from "../../utils/feedbackTypes";

import { Button } from "../Button";
import { FeedbackType } from "../Widget";
import { ScreenshotButton } from "../ScreenshotButton";

import { styles } from "./styles";
import { theme } from "../../theme";
import { useState } from "react";

interface Props {
  feedbackType: FeedbackType;
}

export const Form = ({ feedbackType }: Props) => {
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleScreenshot = () => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    })
      .then((uri) => setScreenshot(uri))
      .catch((error) => console.log(error));
  };

  const handleRemoveScreenshot = () => {
    setScreenshot(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo."
        placeholderTextColor={theme.colors.text_secondary}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          screenshot={screenshot}
          onTakeShot={handleScreenshot}
          onRemoveShot={handleRemoveScreenshot}
        />
        <Button isLoading={false} />
      </View>
    </View>
  );
};
