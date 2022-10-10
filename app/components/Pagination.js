import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PaginationDot from "react-native-animated-pagination-dot";

import colors from "../config/colors";

const Pagination = ({
  activeDotColor = colors.medium,
  curPage,
  maxPage,
  sizeRatio,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <PaginationDot
        activeDotColor={activeDotColor}
        curPage={curPage}
        maxPage={maxPage}
        sizeRatio={sizeRatio}
      />
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    bottom: 30,
  },
});
