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
  onSnapshot,
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
      const ref = query(collection(db, "Content"));

      const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          contentList.push({ id: doc.id, ...doc.data() });
        });
        setContentList(contentList);
      });
      return unsubscribe;
    };

    setContentListFiltered(contentList);

    getContentList();
  }, []);

  return (
    <View>
      {contentListFiltered.map((content) => (
        <View key={content.id}>
          <Text>{content.title}</Text>
        </View>
      ))}
    </View>
  );
};

export default ViewContentListSubPage;
