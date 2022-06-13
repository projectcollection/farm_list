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
import { SignUpProps } from "../navigation/types";
import { Farm as FarmData } from "../screens/types";
import { AddFarmForm, Farm } from "./components";

export default function Main({ navigation }: SignUpProps) {
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

    function toggle() {
        setAdd(!add);
    }

    return (
        <>
            {!add ? (
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

                    <Button onPress={() => toggle()} title="add farm" />
                    <Button onPress={() => signOut(auth)} title="sign out" />
                </ScrollView>
            ) : (
                <AddFarmForm
                    back={() => {
                        toggle();
                    }}
                />
            )}
        </>
    );
}
