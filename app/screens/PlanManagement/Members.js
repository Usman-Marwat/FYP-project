import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styles/screens/membersStyle";
import { EmptyListComponent } from "../components/EmptyListComponent";
import { addMember, getMembers } from "../db/demo";
import membersApi from "../api/members";

const unsplashApiKey = "suzlDEXmdc2xWOrHZzzJ6Qi5hjR5IxwucQSEodEnnnA";
export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      let response = await fetch(
        `https://api.unsplash.com/photos?page=20&per_page=10&client_id=${unsplashApiKey}`
      );
      let response2 = await fetch(
        `https://api.unsplash.com/photos?page=10&per_page=10&client_id=${unsplashApiKey}`
      );
      response = await response.json();
      response2 = await response2.json();
      const data = [...response, ...response2];
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // const filterMembers = async (data) => {
  //   try {
  //     let membersDb = await membersApi.getMembers();
  //     console.log(membersDb.data);
  //     membersDb = membersDb.data;
  //     console.log(Object.keys(membersDb).length);
  //     data = data.filter(checkMember);
  //     function checkMember(item) {
  //       let count = 0;
  //       for (let memberDb in membersDb) {
  //         // console.log(membersDb[memberDb]);
  //         if (membersDb[memberDb].id !== item.user.id) {
  //           count++;
  //           continue;
  //         } else {
  //           continue;
  //         }
  //       }
  //       if (count == Object.keys(membersDb).length) return true;
  //       else return false;
  //     }
  //     return data;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const addMember2 = async (member) => {
    const user = {
      id: member.id,
      name: member.name,
      portfolio_url: member.portfolio_url,
      profile_image: member.profile_image,
    };
    const memberdb = await membersApi.addMember(user);
    console.log(memberdb);
  };

  return (
    <SafeAreaView style={styles.container}>
      {members?.length ? (
        <View style={styles.membersWrapper}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={members}
            onRefresh={() => getData()}
            refreshing={loading}
            renderItem={({ item }) => (
              <View style={styles.singleMember}>
                <Image
                  style={styles.singleMemberPhoto}
                  source={{
                    uri: item?.user.profile_image.large,
                  }}
                />
                <View style={styles.singleMemberInfo}>
                  <Text
                    style={styles.selectedMemberName}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item?.user.name}
                  </Text>
                  <Text style={styles.selectedMemberLastSeen}>
                    {item?.user.username}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => addMember2(item.user)}
                  style={styles.plusBtnContainer}
                >
                  <MaterialCommunityIcons name="plus" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      ) : (
        <EmptyListComponent />
      )}
    </SafeAreaView>
  );
}
