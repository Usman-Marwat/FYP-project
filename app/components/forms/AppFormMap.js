import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import MyMap from "../MyMap";
import ErrorMessage from "./ErrorMessage";

const AppFormMap = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleAddLocation = (latlan) => {
    setFieldValue(name, latlan);
  };

  return (
    <>
      <MyMap onAddlocation={handleAddLocation} style={{ height: 400 }} />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormMap;

const styles = StyleSheet.create({});
