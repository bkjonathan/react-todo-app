import { Stack } from "expo-router";

export default function RootLayout() {
  // return <Stack screenOptions={{ headerShown: false }} />;
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false ,title: "Home"}} />
  </Stack>;
}
