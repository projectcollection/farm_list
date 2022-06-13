import { useState, useEffect } from "react";
import { View, Button, ScrollView, Text } from "react-native";
import {
    query,
    collection,
    onSnapshot,
    DocumentData,
} from "firebase/firestore";

import { signOut } from "firebase/auth";

import { db, auth } from "../config/firebase";
import { MainProps, MainStackRoute } from "../navigation/types";
import { Farm as FarmData } from "../screens/types";
import { Farm } from "./components";

export default function Main({ navigation }: MainProps) {
    const [farms, setFarms] = useState<DocumentData>([]);
    const [add, setAdd] = useState<boolean>(false);

    const q = query(collection(db, "farms"));

    useEffect(() => {
        const unsubscribe = onSnapshot(q, (q_snap) => {
            const farms_data = q_snap.docs.map((doc) => doc.data());
            setFarms(farms_data);
        });

        return unsubscribe;
    }, []);

    return (
        <>
            <ScrollView
                style={{
                    flexDirection: "column",
                }}
            >
                {farms.length > 0 ? (
                    farms.map((data: DocumentData) => (
                        <Farm key={data.name} {...(data as FarmData)} />
                    ))
                ) : (
                    <Text>No farms yet</Text>
                )}

                <Button
                    onPress={() => navigation.navigate(MainStackRoute.AddFarm)}
                    title="ADD FARM"
                />
                <Button onPress={() => signOut(auth)} title="SIGN OUT" />
            </ScrollView>
        </>
    );
}
