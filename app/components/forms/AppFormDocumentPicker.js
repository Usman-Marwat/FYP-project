import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import DocumentPicker from "../DocumentPicker";

const AppFormDocumentPicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const filesUris = values[name];

  const handleAdd = async (uri) => {
    setFieldValue(name, [...filesUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      filesUris.filter((fileUri) => fileUri !== uri)
    );
  };

  return (
    <>
      <DocumentPicker
        filesUris={filesUris}
        onAddFile={handleAdd}
        onRemoveFile={handleRemove}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormDocumentPicker;

const styles = StyleSheet.create({});
