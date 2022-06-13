import { View, Text } from "react-native";

import { AddFarmForm } from "./components";
import { AddFarmProps, MainStackRoute } from "../navigation/types";

export default function AddFarm({ navigation }: AddFarmProps) {
    return (
        <View>
            <Text>Add your farm</Text>
            <AddFarmForm
                back={() => {
                    navigation.navigate(MainStackRoute.Main);
                }}
            />
        </View>
    );
}
