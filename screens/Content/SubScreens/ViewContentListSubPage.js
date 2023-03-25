import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";

/* */
const ViewContentListSubPage = () => {
  const navigation = useNavigation();
  const [contentList, setContentList] = useState([]);
  const [contentListFiltered, setContentListFiltered] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getContentList = async () => {
      const ref = query(
        collection(db, "Content"),
        where("status", "==", "accepted")
      );

      const unsubscribe = onSnapshot(ref, (querySnapshot) => {
        const contentList = [];
        querySnapshot.forEach((doc) => {
          contentList.push({ id: doc.id, ...doc.data() });
        });
        setContentList(contentList);
        setContentListFiltered(contentList);
      });
      return unsubscribe;
    };

    getContentList();
  }, []);

  const Categories = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.buttonContainer}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("")}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("Business")}
        >
          <Text style={styles.buttonText}>Business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("IT")}
        >
          <Text style={styles.buttonText}>IT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("App Development")}
        >
          <Text style={styles.buttonText}>App Development</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("Tutoring")}
        >
          <Text style={styles.buttonText}>Tutoring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("Online Marketing")}
        >
          <Text style={styles.buttonText}>Online Marketing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("Financial Health")}
        >
          <Text style={styles.buttonText}>Financial Health</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterContent("Other")}
        >
          <Text style={styles.buttonText}>Other</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const searchContent = (text) => {
    setSearchText(text);

    setContentListFiltered(
      contentList.filter((content) =>
        content.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const filterContent = (text) => {
    setSearchText("");

    setContentListFiltered(
      contentList.filter((content) =>
        content.category.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <View>
      <View>
        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          multiline={false}
          style={styles.input}
          value={searchText}
          onChangeText={(text) => searchContent(text)}
        />
        <Image
          source={{
            uri: "https://img.icons8.com/ios/50/000000/search--v1.png",
          }}
          style={styles.searchIcon}
        />
        <Categories />
      </View>

      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.contentContainer}
        >
          <View>
            {contentListFiltered.map((content) => (
              <View key={content.id}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ViewContent", {
                      data: content,
                    })
                  }
                >
                  <View style={styles.contentCard}>
                    <View style={styles.contentTopHeader}>
                      <Text style={styles.contentAuthor}>
                        By {content.authorName}
                      </Text>
                      <Text style={styles.contentDate}>{content.date}</Text>
                    </View>
                    <Text style={styles.contentName}>{content.title}</Text>
                    <Text style={styles.contentDescription} numberOfLines={3}>
                      {content.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#EBF0F9",
    height: "100%",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
  searchIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  contentCard: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  image: {
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
  contentName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  contentTopHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  contentAuthor: {
    fontSize: 13,
    marginTop: 5,
    color: "#19212B",
    fontWeight: "400",
  },
  contentDate: {
    fontSize: 13,
    marginTop: 5,
    color: "#19212B",
    fontWeight: "400",
  },
  contentDescription: {
    fontSize: 13,
    marginVertical: 10,
    color: "#19212B",
    fontWeight: "400",
  },
  contentContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 170,
  },
  buttonContainer: {
    marginHorizontal: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 13,
    color: "#19212B",
    fontWeight: "400",
  },
});

export default ViewContentListSubPage;
