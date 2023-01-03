import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useLayoutEffect, useState } from "react";
import { useToast } from "./tost";

NativeWindStyleSheet.setOutput({
  default: "native",
});
export default function App() {
  const date = new Date().toLocaleDateString();
  const [userText, setUserText] = useState({});
  const [userData, setUserData] = useState([]);

  const handleAddNewTask = () => {
    userText.data = date;
    const userDataWithDate = {
      title : userText.title,
      detail : userText.detail,
      date : date
    }
    useToast("New Task Add");
    fetch("https://my-todo-server-sage.vercel.app/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataWithDate),
    });
    setUserData([...userData, userText]);
  };

  useLayoutEffect(() => {
    fetch("https://my-todo-server-sage.vercel.app/userData")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        console.log(data);
      });
  }, []);

  const handleDelete = (id) => {
    console.log(id);
  
    fetch(`https://my-todo-server-sage.vercel.app/userData/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
      
      });
    const newData = userData.filter((data) => data._id !== id);
    setUserData(newData);
  };
  return (
    <View>
      <ScrollView className="mx-4 mb-12 mt-3">
        <View className="flex-row justify-center my-2 py-2 bg-gray-100 rounded-md">
          <Text className="text-2xl font-black text-red-600 text-center">
            Today Task
          </Text>
          <Text className="text-2xl font-black text-blue-900 text-center">
            {" "}
            {date}
          </Text>
        </View>
        <View>
          <TextInput
            onChangeText={(newText) =>
              setUserText({ ...userText, title: newText })
            }
            placeholder="Title"
            className="flex-1 font-semibold border border-gray-200 p-2 rounded-md mx-1 my-2"
          />
          <View className="flex-row">
            <TextInput
              onChangeText={(newText) =>
                setUserText({ ...userText, detail: newText })
              }
              placeholder="Detail"
              className="flex-1 font-semibold border border-gray-200 p-2 rounded-md mx-1"
            />
            <Button
              onPress={() => {
                handleAddNewTask();
              }}
              title="Add New"
            />
          </View>
        </View>
        <View className="mt-12">
          {userData.map((data, i) => (
            <View
              key={i}
              className="border border-blue-200 px-4 py-2 my-1 rounded-md bg-white"
            >
              <View className="flex-row items-center">
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-700">
                    {data?.title}
                  </Text>
                  <Text className="text-sm font-semibold text-gray-700 py-2">
                    {data?.detail}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => handleDelete(data._id)}
                  className="p-2"
                >
                  <FontAwesome5 name="trash-alt" color="red" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}
