import React from 'react';
import {Tabs} from "expo-router";
import {Ionicons} from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{title: "Todos",tabBarIcon:({color,size})=>  <Ionicons name="flash-outline" size={size} color={color} />}}/>
      <Tabs.Screen name="settings" options={{title: "Settings",tabBarIcon:({color,size})=>  <Ionicons name="settings-outline" size={size} color={color} />}}/>
    </Tabs>
  );
};

export default TabsLayout