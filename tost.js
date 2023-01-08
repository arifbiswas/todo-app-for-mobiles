import { ToastAndroid } from "react-native";

export const useToast = (text) => {
    ToastAndroid.show(`${text}`,ToastAndroid.LONG
    )};