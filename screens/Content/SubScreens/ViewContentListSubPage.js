import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
  } from "firebase/firestore";
  import { db } from "../../../firebase";
  import { useNavigation } from "@react-navigation/native"; 

const ViewContentListSubPage = () => {
    const navigation = useNavigation();
    const [contentList, setContentList] = useState([]);
    const [contentListFiltered, setContentListFiltered] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const getContentList = async () => {
            const contentList = [];
            const contentListQuery = query(
                collection(db, "content"),
                where("mentorId", "==", "123")
            );
            const contentListQuerySnapshot = await getDocs(contentListQuery);
            contentListQuerySnapshot.forEach((doc) => {
                contentList.push(doc.data());
            });
            setContentList(contentList);
            setContentListFiltered(contentList);
        };
        getContentList();
    }, []);

  return (
    <View>
      <Text>ViewContentListSubPage</Text>
    </View>
  );
};

export default ViewContentListSubPage;
