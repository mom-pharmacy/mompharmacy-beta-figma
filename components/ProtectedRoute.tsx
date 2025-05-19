import { userAuth } from "@/Context/authContext";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

function ProtectedRoute({ children }) {
  const { userDetails , isLoggedIn  } = userAuth();

  if (!userDetails && !isLoggedIn) {
    return  router.replace("/Login/Login");
  }

  return <View>{children}</View>;
}

export default ProtectedRoute;