import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

import { SharedElement } from "react-navigation-shared-element";

import Icon from "../../components/Icon";
import ContractTable from "../../components/ContractTable";

const { height, width } = Dimensions.get("window");
const SPACING = 10;
const CELL_WIDTH = width * 0.64;
const buttons = ["Lump sum bid", "Per square foot bid"];

const DURATION = 400;
const animation = {
  0: { opacity: 0, translateY: 100 },
  1: { opacity: 1, translateY: 0 },
};
const createAnimation = (from) => ({
  0: { opacity: 0, translateY: -100, translateX: from },
  1: { opacity: 1, translateY: 0, translateX: 0 },
});
const animations = [
  createAnimation(100),
  createAnimation(0),
  createAnimation(-100),
];

const detailsIcons = [
  { color: "#9FD7F1", icon: "chatbox-outline", family: "ionicons" },
  { color: "#F3B000", icon: "grid", family: "ionicons" },
  { color: "#F2988F", icon: "account", family: "mci" },
];
const ReceivedContractDetails = ({ navigation, route }) => {
  const { item, DB, imageUri } = route.params;
  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleIconPress = (detail) => {
    if (detail.icon === "grid") setIsTableVisible(true);
  };

  if (DB)
    return (
      <>
        <View>
          <SharedElement
            id={`item.${item.key}.bg`}
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "#C1CEE077", borderRadius: 16 },
            ]}
          >
            <View style={[StyleSheet.absoluteFillObject]} />
          </SharedElement>
          <SharedElement id={`item.${item.key}.meta`}>
            <View style={styles.textContainer}>
              <Text style={styles.type}>{item.title}</Text>
              <Text style={styles.subType}>subType</Text>
            </View>
          </SharedElement>
          <View style={{ marginTop: height * 0.1 }}>
            <SharedElement id={`item.${item.key}.image`} style={styles.image}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </SharedElement>
            <View style={styles.iconImageContainer}>
              {detailsIcons.map((detail, index) => {
                return (
                  <Animatable.View
                    animation={animations[index]}
                    delay={DURATION}
                    useNativeDriver
                    key={index}
                  >
                    <TouchableOpacity onPress={() => handleIconPress(detail)}>
                      <Icon
                        size={64}
                        backgroundColor={detail.color}
                        name={detail.icon}
                        family={detail.family}
                      />
                    </TouchableOpacity>
                  </Animatable.View>
                );
              })}
            </View>
          </View>
          <View style={{ padding: SPACING }}>
            <Animatable.Text
              useNativeDriver
              animation={animation}
              delay={DURATION + 300}
              style={styles.price}
            >
              $4.3027
            </Animatable.Text>
            <Animatable.Text
              useNativeDriver
              animation={animation}
              delay={DURATION + 400}
              style={styles.description}
            >
              Some Description that is presented by the Customer to the
              Contractor
            </Animatable.Text>
          </View>
          <ContractTable
            allValues={item.allValues}
            descriptions={item.descriptions}
            imageUris={item.images}
            keys={item.keys}
            isVisible={isTableVisible}
            onModalVisible={() => setIsTableVisible(false)}
          />
        </View>
        {buttons.map((text, index) => {
          return (
            <Animatable.View
              useNativeDriver
              animation={animation}
              delay={300 + (index + 1) * 100}
              key={index}
            >
              <RowButton
                text={text}
                navigation={navigation}
                contract_id={item._id}
              />
            </Animatable.View>
          );
        })}
      </>
    );

  //--------------------------------------------------------------------------
  return (
    <View>
      <SharedElement
        id={`item.${item.key}.bg`}
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: item.color, borderRadius: 16 },
        ]}
      >
        <View style={[StyleSheet.absoluteFillObject]} />
      </SharedElement>
      <SharedElement id={`item.${item.key}.meta`}>
        <View style={styles.textContainer}>
          <Text style={styles.type}>{item.type}</Text>
          <Text style={styles.subType}>{item.subType}</Text>
        </View>
      </SharedElement>
      <View style={{ marginTop: height * 0.1 }}>
        <SharedElement id={`item.${item.key}.image`} style={styles.image}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </SharedElement>
        <View style={styles.iconImageContainer}>
          {item.subCategories.map((subCategory, index) => {
            return (
              <Animatable.View
                animation={animations[index]}
                delay={DURATION}
                useNativeDriver
                key={index}
                style={{
                  backgroundColor: "white",
                  padding: SPACING,
                  borderRadius: 50,
                }}
              >
                <Image
                  style={styles.iconImage}
                  source={{ uri: subCategory.image }}
                />
              </Animatable.View>
            );
          })}
        </View>
      </View>
      <View style={{ padding: SPACING }}>
        <Animatable.Text
          useNativeDriver
          animation={animation}
          delay={DURATION + 300}
          style={styles.price}
        >
          {item.price}
        </Animatable.Text>
        <Animatable.Text
          useNativeDriver
          animation={animation}
          delay={DURATION + 400}
          style={styles.description}
        >
          {item.description}
        </Animatable.Text>
      </View>
    </View>
  );
};

export default ReceivedContractDetails;

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "rgba(0,0,0,0.7)",
  },
  image: {
    width: CELL_WIDTH * 0.7,
    height: CELL_WIDTH * 0.7,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: SPACING * 2,
    marginBottom: SPACING * 4,
    zIndex: 2,
  },
  iconImageContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: SPACING * 3,
  },
  iconImage: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: SPACING / 2,
  },
  subType: {
    color: "grey",
  },
  type: { fontWeight: "800" },
  textContainer: {
    position: "absolute",
    left: SPACING * 2,
    top: SPACING * 4,
  },
});

const RowButton = ({ text, navigation, contract_id }) => {
  const obj = { contract_id, bidType: text };
  const handlePress = () => {
    navigation.navigate("BidInputScreen", { ...obj });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          flexDirection: "row",
          padding: SPACING * 2,
          justifyContent: "space-between",
          borderColor: "rgba(0,0,0,0.1)",
          borderBottomWidth: 1,
          borderTopWidth: 1,
        }}
      >
        <Text style={{ fontSize: 14 }}>{text}</Text>
        <Icon
          family="antDesign"
          name="arrowright"
          color="rgba(0,0,0,0.8)"
          size={17}
        />
      </View>
    </TouchableOpacity>
  );
};
