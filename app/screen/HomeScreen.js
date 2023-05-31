import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import ListItem from "../components/ListItem";
import LoadingIndicator from "../components/LoadingIndicator";
import ErrorMessage from "../components/ErrorMessage";

export default function HomeScreen() {
  const [limit] = useState(10);
  const [page, setPage] = useState(0);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery(
      ["catlist"],
      ({ pageParam = 0 }) => getCatList({ pageParam }),
      {
        refetchOnWindowFocus: false,
      }
    );

  const getCatList = async ({ pageParam }) => {
    const newParams = {
      limit,
      page: pageParam,
    };

    const response = await axios
      .get("https://api.thecatapi.com/v1/breeds", { params: newParams })
      .then((res) => res.data);

    return response;
  };

  const renderItem = React.useCallback(({ item }) => {
    return <ListItem item={item} />;
  }, []);

  const footerComponent = () => {
    return <View>{isFetchingNextPage && <ActivityIndicator />}</View>;
  };

  const fetchNextPageParam = () => {
    const nextPage = page + 1;
    fetchNextPage({ pageParam: nextPage });
    setPage(nextPage);
  };

  const onSearch = (e) => {
    console.log("Saya cari tidak ada endpoint ataupun params buat search cat.");
  };

  if (isLoading) return <LoadingIndicator />;

  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <>
      <Stack.Screen options={{ title: "Cat List" }} />
      <View style={styles.container}>
        <View style={styles.main}>
          <View>
            <TextInput
              placeholder="Search here..."
              style={styles.search}
              onChangeText={onSearch}
            />
          </View>
          <Text style={styles.title}>List of cat.</Text>

          <FlatList
            data={data.pages}
            renderItem={({ item }) => {
              return (
                <View>
                  <FlatList
                    data={item}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              );
            }}
            keyExtractor={(_item, index) => index}
            onEndReached={fetchNextPageParam}
            ListFooterComponent={footerComponent}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    width: "100%",
    marginHorizontal: "auto",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4c4c4c",
  },
  search: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: "#e5e5e5",
    marginBottom: 20,
    lineHeight: 20,
    backgroundColor: "white",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
