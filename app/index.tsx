import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> Estou no /index</Text>
      <Link href={"/status"}>Status Page</Link>
    </View>
  );
}
