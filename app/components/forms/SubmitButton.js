import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title, bg }) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      style={{ marginTop: 10, backgroundColor: bg }}
    />
  );
}

export default SubmitButton;
