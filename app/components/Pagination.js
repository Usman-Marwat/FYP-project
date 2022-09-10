import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import PaginationDot from "react-native-animated-pagination-dot";

const Pagination = ({
  activeDotColor = "black",
  curPage,
  maxPage,
  sizeRatio,
  style,
}) => {
  return (
    <View style={style}>
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
  container: {},
});
