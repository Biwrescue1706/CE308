import { Text, View } from "react-native";
import ImageEdit from "./ImageEdit";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageEdit />
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
    </View>
  );
}
