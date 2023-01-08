import { View, Text, TouchableOpacity} from 'react-native'
import { NativeWindStyleSheet } from "nativewind";
import {  FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FETCHING_ERROR, FETCHING_START, FETCHING_SUCCESS } from '../state/actionTypes/taskActionsTypes';
import { useGStore } from '../context/globalStore';
import { useToast } from '../tost';
NativeWindStyleSheet.setOutput({
    default: "native",
  });
export default function Task({data,userData}) {

  const {state , dispatch} = useGStore();

  if(state.loading){
    return ;
  }

    const navigation = useNavigation(); 
    const handleDelete = (id) => {
      dispatch({type : FETCHING_START})
        fetch(`https://my-todo-server-sage.vercel.app/userData/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((result) => {
          console.log(result);
          }).catch((err) => {
            console.log(err);
          })
        const newData = userData.filter((data) => data._id !== id);
        dispatch({type : FETCHING_SUCCESS , payload : newData});
    }

    const handleComplete = async (id) =>{
      dispatch({type : FETCHING_START})
       try {
        const res = await fetch(`https://my-todo-server-sage.vercel.app/userData/${id}`, {
            method: "PUT",
          })
       const result = await res.json();
       console.log(result?.newData);
      
        dispatch({type : FETCHING_SUCCESS ,payload : result?.newData})
        useToast("This Task Work is Done")
       
       } catch (error) {
        console.log(error);
        dispatch({type : FETCHING_ERROR})
       }
          }
  return (
    <View className="mt-2">
          <View  className={`border ${data?.taskCompleted ?"border-green-200" :"border-blue-200" }  px-4 py-2 my-1 rounded-md ${data?.taskCompleted ?"bg-gray-300" :"bg-white" }`}>
            <View className="flex-row items-center">
              <TouchableOpacity onPress={()=> navigation.navigate('Details',{data})} className="flex-1">
                <Text className="text-xs text-gray-500 ">Date : {data?.date}</Text>
                <Text className="text-[20px] font-semibold text-gray-600">
                  {data?.title}
                </Text>
                <Text className="text-[16px] font-semibold text-gray-500 py-2">
                  { data?.detail}
                </Text>
              </TouchableOpacity>
             {
                data?.taskCompleted ?<Text className="bg-green-800 opacity-60 p-2 font-bold text-white text-[20px] rounded-md">Done</Text>:<><TouchableOpacity
              onPress={()=>handleComplete(data?._id)}
                className="px-3 border-x-2 border-gray-200"
              >
                <FontAwesome5 name="check" color="green" size={24} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(data?._id)}
                className="p-2"
              >
                <FontAwesome5 name="trash-alt" color="red" size={24} />
              </TouchableOpacity></> 
             }
            </View>
          </View>
      </View>
  )
}