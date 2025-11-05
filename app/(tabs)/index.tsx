import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getDatabase, ref, onValue } from "@react-native-firebase/database";

type Data = {
  cli?: {
    version?: string;
  };
}

const Home = () => {
  const database = getDatabase();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const rootRef = ref(database, "/");
    onValue(rootRef, (snapshot) => {
      const val = snapshot.val();
      setData(val);
    });
  }, [database]);

  return (
    <View className="flex items-center justify-center h-full bg-background">
      <Text>Home</Text>
      <Text>{data?.cli?.version ?? "No version available"}</Text>
    </View>
  );
};

export default Home;
