import RootNavigation from "./navigation";
import * as React from "react";
import { AppRegistry, Platform } from "react-native";
// import { AppRegistry } from "react-native-web";


export default function App() {
  if (Platform.OS === "web") {
    // AppRegistry.registerComponent("App", () => RootNavigationWeb);
    // todo: create a web support
    return <RootNavigation />;
  } else {
    AppRegistry.registerComponent("App", () => RootNavigation);
    return <RootNavigation />;
  }

}
