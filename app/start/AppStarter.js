import {} from "react-native";
import React from "react";
import CustomerNavigator from "../navigation/CustomerNavigation/CustomerNavigatior";
import ContractNavigator from "../navigation/CustomerNavigation/ContractNavigator";

const AppStarter = ({ actor }) => {
  if (actor === "Customer") return <CustomerNavigator />;
  else if (actor === "Contractor") return null;
};

export default AppStarter;
