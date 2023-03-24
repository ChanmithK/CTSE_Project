import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
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
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabs, { bottomTabIcons } from "../Common/BottomTabs";
import { SafeAreaView } from "react-native-safe-area-context";

const ClientHome = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#3D3EEF"
          style={{ marginVertical: "100%" }}
        />
      ) : (
        <SafeAreaView style={styles.MainContainer}>
          <Header />
          <Categories />
          <Mentors />
          <Articles />
          <BottomTabs icons={bottomTabIcons} />
        </SafeAreaView>
      )}
    </>
  );
};

const Header = () => {
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const value = await AsyncStorage.getItem("UserID");
      const user = JSON.parse(value);

      const userDoc = doc(db, "Users", user);
      const docSnap = await getDoc(userDoc);
      setUserProfile(docSnap.data());
    };
    getProfile();
  }, []);

  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{
          uri: userProfile.image,
        }}
        style={styles.userImage}
      />
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", marginLeft: 8, marginTop: -4 }}>
          <Text style={{ color: "#1A2042", fontWeight: "400", fontSize: 24 }}>
            Hi,
          </Text>
          <Text style={{ color: "#3D3EEF", fontWeight: "700", fontSize: 24 }}>
            {" "}
            {userProfile.name ? userProfile.name.split(" ")[0] : ""}
          </Text>
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ color: "#818184", fontSize: 18, fontWeight: "400" }}>
            How do you feel today?
          </Text>
        </View>
      </View>
    </View>
  );
};

const Categories = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: "#1A2042",
          marginTop: 35,
        }}
      >
        Categories
      </Text>
      <View style={styles.CategoryContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewContentList")}
        >
          <View style={styles.CategoryBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/null/external-content-ux-and-ui-flatart-icons-lineal-color-flatarticons.png",
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.CategoryBoxText}>Articles</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ViewMentorsServices")}
        >
          <View style={styles.CategoryBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-mentorship-social-media-agency-flaticons-lineal-color-flat-icons-2.png",
              }}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.CategoryBoxText}>Mentors</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Mentors = () => {
  const [mentorList, setMentorList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getMentors = async () => {
      const mentors = await getDocs(
        query(collection(db, "Users"), where("role", "==", "Mentor"))
      );
      setMentorList(mentors.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMentors();
  }, []);
  return (
    <View style={styles.UserContainer}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A2042" }}>
          Top Mentors
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewMentorsServicesScreen")}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#3D3EEF" }}>
            view all
          </Text>
        </TouchableOpacity>
      </View>
      {mentorList.slice(0, 3).map((mentor, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("ViewServiceScreen", {
              service: mentor,
            })
          }
        >
          <View style={styles.UserBox}>
            <Image source={{ uri: mentor.image }} style={styles.UserImage} />
            <View style={styles.UserDetails}>
              <Text style={styles.UserName}>{mentor.name}</Text>
              <Text style={styles.UserPosition}>{mentor.position}</Text>
            </View>
            <View
              style={{
                position: "absolute",
              }}
            ></View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Articles = () => {
  const [articleList, setArticleList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getArticles = async () => {
      const articles = await getDocs(collection(db, "Content"));
      setArticleList(articles.docs.map((doc) => doc.data()));
    };
    getArticles();
  }, []);

  return (
    <View style={styles.ArticleContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", color: "#1A2042" }}>
          Top Articles
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("ViewArticlesScreen")}
        >
          <Text style={{ fontSize: 16, fontWeight: "500", color: "#3D3EEF" }}>
            view all
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {articleList.slice(0, 3).map((article, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate("ViewArticleScreen", {
                article: article,
              })
            }
          >
            <View style={styles.ArticleBox}>
              {/* <Image
                source={{ uri: article.image }}
                style={styles.ArticleImage}
              /> */}
              <View style={styles.ArticleDetails}>
                <Text style={styles.ArticleTitle}>{article.title}</Text>
                <Text style={styles.ArticleDescription} numberOfLines={3}>
                  {article.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userImage: {
    width: 51,
    height: 51,
    borderRadius: 100,
  },
  MainContainer: {
    padding: 15,
    height: "100%",
  },
  CategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  CategoryBox: {
    backgroundColor: "#fff",
    width: 180,
    height: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  CategoryBoxText: {
    color: "#000000",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 10,
  },
  UserContainer: {
    marginTop: 20,
  },
  UserBox: {
    position: "relative",
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: -5,
  },
  UserDetails: {
    marginLeft: 20,
    justifyContent: "center",
  },
  UserName: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  UserPosition: {
    color: "#818184",
    fontSize: 10,
    fontWeight: "400",
  },
  UserImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  ArticleContainer: {
    marginTop: 20,
  },
  ArticleBox: {
    position: "relative",
    flexDirection: "row",
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    marginVertical: -5,
    marginRight: 20,
    width: 250,
  },
  ArticleDetails: {
    justifyContent: "center",
  },
  ArticleTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  ArticleImage: {
    width: 250,
    height: 160,
    borderRadius: 10,
  },
  ArticleDescription: {
    color: "#818184",
    fontSize: 10,
    fontWeight: "400",
    marginTop: 10,
  },
});

export default ClientHome;
