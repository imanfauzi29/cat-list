import {
  Animated,
  Button,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function ListItem({ item }) {
  const [toggle, setToggle] = useState(false);

  const toggleItem = () => {
    setToggle(!toggle);
  };

  const stars = (star) =>
    Array.from(Array(5).keys()).map((_item, i) =>
      i < star ? (
        <AntDesign key={i} name="star" size={12} color="#f2de4b" />
      ) : (
        <AntDesign key={i} name="staro" size={12} color="#f2de4b" />
      )
    );

  const openWikipediaBrowser = (url) => {
    Linking.canOpenURL(url).then((supported) =>
      supported ? Linking.openURL(url) : console.log("Can't open url!")
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleItem}>
        <View style={styles.item}>
          <View style={styles.itemList}>
            <Text style={styles.Text}>{item.name}</Text>
            <Text style={styles.originText}>{item.origin}</Text>
          </View>
          <Animated.View
            style={{ height: toggle ? null : 0, overflow: "hidden" }}
          >
            <View
              style={{
                borderBottomColor: "black",
                borderBottomWidth: StyleSheet.hairlineWidth,
                margin: 10,
              }}
            />
            <View>
              <Text style={styles.detailText}>{item.description}</Text>
              <Text style={styles.detailText}>
                Temprament: {item.temperament}
              </Text>
              <Text style={styles.detailText}>
                Affection Level: {stars(item.affection_level)}
              </Text>
              <Text style={styles.detailText}>
                Child friendly: {stars(item.child_friendly)}
              </Text>
              <Text style={styles.detailText}>
                Dog friendly: {stars(item.dog_friendly)}
              </Text>
              <Text style={styles.detailText}>
                Intelligence: {stars(item.intelligence)}
              </Text>
              <Text style={styles.detailText}>
                Health issue: {stars(item.health_issues)}
              </Text>
            </View>
            <Button
              title="Wikipedia"
              onPress={() => openWikipediaBrowser(item.wikipedia_url)}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 10,
    backgroundColor: "white",
    width: "100%",
    borderRadius: 15,
  },
  detailText: {
    fontSize: 12,
    color: "#5b5b5b",
    marginBottom: 10,
  },
  itemList: {
    marginTop: 5,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  secondRow: {
    marginBottom: 10,
  },
  title: { fontWeight: "bold" },
  imageStyle: {
    width: "100%",
    height: 200,
  },
  originText: {
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "black",
    fontSize: 12,
  },
});
