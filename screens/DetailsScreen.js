import { View, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

export default function DetailsScreen() {
    const {params : {data}} = useRoute();
  return (
    <View className="px-4 py-4 ">
      {
        data?.taskCompleted && <Text className="text-center text-3xl font-bold text-green-600">This Task is Completed</Text>
      }
      <Text className="text-center text-3xl font-bold text-blue-600">{data?.date}</Text>
      <Text className="text-2xl font-bold text-gray-600">{data?.title}</Text>
      <Text className="text-lg  ">{data?.detail}</Text>
    </View>
  )
}