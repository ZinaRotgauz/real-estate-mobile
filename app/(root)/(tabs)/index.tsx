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
      <Text className="font-bold my-10 text-lg" >WElcome to ReaState</Text>
      <Link href='/SignIn'> Sign In</Link>
      <Link href='/Explore'> Explore</Link>
      <Link href='/Profile'> Profile</Link>
      <Link href='/properties/[id]'> Propertz</Link>
    </View>
  );
}
