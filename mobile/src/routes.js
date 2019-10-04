import { createAppContainer, createSwitchNavigator } from "react-navigation";

import List from "./pages/List"
import Login from "./pages/Login"
import Book from "./pages/Book"

const Routes = createAppContainer(
  createSwitchNavigator({
    Login, 
    List,
    Book
  })
);

export default Routes;