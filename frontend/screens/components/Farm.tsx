import { View, Text, Image, Pressable } from "react-native";

import { uploadBytes, getDownloadURL } from "firebase/storage";

import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    ExpandImagePickerResult,
    ImageInfo,
    ImagePickerOptions,
} from "expo-image-picker";

import { Farm as FarmData } from "../types";
import { storage_ref } from "../../config/firebase";
import { update_doc, timestamp_to_date } from "../../utils/firebase/firestore";
import { uri_to_blob, optional } from "../../utils/";

export default function Farm({
    name,
    displayName,
    phone,
    openHours,
    image,
    created_at,
}: FarmData) {
    async function handle_image_change(farm_name: string) {
        const res = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
        });

        //https:github.com/expo/examples/blob/4600394d2bc76e6564d639f690d7105a89f64a77/with-firebase-storage-upload/App.js#L193
        const blob = await uri_to_blob(res?.uri);

        const ref = storage_ref(`farm_images/${farm_name}`);

        await uploadBytes(ref, blob, {
            contentType: blob.type,
            cacheControl: "public,max-age=4000",
        });
        const img_url = await getDownloadURL(ref);

        update_doc("farms", farm_name, {
            image: img_url,
        });
    }

    return (
        <View key={name} style={{ marginBottom: 10 }}>
            <Pressable
                onPress={() => {
                    handle_image_change(name);
                }}
            >
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        borderWidth: 2,
                        borderColor: "red",
                    }}
                    source={{
                        uri: image ? image : "https://i.imgur.com/Bvcva1l.jpeg",
                    }}
                />
                {!image && (
                    <Text
                        style={{
                            position: "relative",
                            top: -55,
                            left: 25,
                            right: 0,
                            bottom: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                        }}
                    >
                        change
                    </Text>
                )}
            </Pressable>
            <Text>name: {name}</Text>
            <Text>display name: {displayName}</Text>
            <Text>phone: {optional(phone)}</Text>
            <Text>open hours: {optional(openHours)}</Text>
            {created_at && (
                <Text>
                    created_at:{" "}
                    {optional(timestamp_to_date(created_at)).toString()}
                </Text>
            )}
        </View>
    );
}
