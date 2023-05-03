import RootNavigation from "./navigation";
import * as React from "react";
import { AppRegistry, Platform } from "react-native";


export default function App() {


  if (Platform.OS === "web") {
    // AppRegistry.registerComponent("App", () => RootNavigationWeb);
    // todo: create a web support
    return <RootNavigation />;
  } else {
    // add a screen timeout to add opening animation from ./assets/animations/starting_screen.json

    AppRegistry.registerComponent("App", () => RootNavigation);
    return <RootNavigation />;
  }
}
