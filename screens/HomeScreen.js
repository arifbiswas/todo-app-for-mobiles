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
  
  
import { useContext, useLayoutEffect, useState } from "react";
import { useToast } from "../tost";
import { NativeWindStyleSheet } from "nativewind";
import { useNavigation } from "@react-navigation/native";
import Task from "../components/Task";
import { useGStore } from "../context/globalStore";
import { FETCHING_ERROR, FETCHING_START, FETCHING_SUCCESS } from "../state/actionTypes/taskActionsTypes";

NativeWindStyleSheet.setOutput({
    default: "native",
  });

export default function HomeScreen() {
  const {state,dispatch} = useGStore();
// console.log(state?.data, state?.loading, state?.error)

//  console.log(state?.data)
    const navigation = useNavigation(); 
    const sortDate = new Date();
  const date = new Date().toLocaleDateString();
  const [userText, setUserText] = useState(null);
  
 


(state?.data).sort((a, b) => { return new Date(b.sortDate) - new Date(a.sortDate)})

  const handleAddNewTask = () => {
    
    
    if(!userText) return useToast("Please input a valid information");
    
      userText.data = date;
    const userDataWithDate = {
      title : userText.title,
      detail : userText.detail,
      date : date,
      sortDate : sortDate,
      taskCompleted : false
    }
    useToast("New Task Add");
   dispatch({type : FETCHING_START})
    fetch("https://my-todo-server-sage.vercel.app/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDataWithDate),
    }).then(res => res.json()).then(result => {
      dispatch({type : FETCHING_SUCCESS, payload :[...state.data, userDataWithDate]})
    }).catch(err => {
      dispatch({type : FETCHING_ERROR})
    })
    setUserText({})
    
    
  };




  return (
    <View>
    <ScrollView className="mx-4 mt-3">
      <View className="flex-row justify-center my-2 py-2 bg-gray-100 rounded-md">
        <Text className="text-2xl font-black text-red-600 text-center">
          Today Task ,
        </Text>
        <Text className="text-2xl font-black text-blue-900 text-center">
          { date}
        </Text>
      </View>
      <View>
        <TextInput
          onChangeText={(newText) =>
            setUserText({ ...userText, title: newText })
          }
          value={userText?.title}
          placeholder="Title"
          className="flex-1 text-[20px] font-semibold border border-gray-300 p-2 rounded-md mx-1 my-2"
        />
        <View className="flex-row">
          <TextInput
            onChangeText={(newText) =>
              setUserText({ ...userText, detail: newText })
            }
            value={userText?.detail}
            placeholder="Detail"
            className="flex-1 text-[20px] font-semibold border border-gray-300 p-2 rounded-md mx-1"
          /> 
          <Button
            onPress={() => {
              handleAddNewTask();
            }}
            title="Add New"

          />
        </View>
      </View>
      <View className="my-5">
            {
                state?.loading ? <Text className="text-center py-12 text-2xl"> Loading ....</Text> :  state?.data?.map((data,i) =><Task key={i} data={data} userData={state?.data} dispatch={dispatch} loginData={state?.loading}></Task>)
            }
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  </View>
  )
}