import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>Welcome to MOM App</Text>
      <TouchableOpacity
        onPress={() => router.push("/Donar/front")}
        style={{
          backgroundColor: "#00A99D",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>Register as Donor</Text>
      </TouchableOpacity>
    </View>
  );
}

