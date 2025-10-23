import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { collection, getDocs } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../utils/firebase";

interface FirestoreState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useFirestoreCollection<T = any>(collectionName: string) {
  const [state, setState] = useState<FirestoreState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState({ data: [], loading: true, error: null });
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const docs = querySnapshot.docs.map(
          (doc: FirebaseFirestoreTypes.DocumentSnapshot) => ({
            id: doc.id,
            ...doc.data(),
          })
        ) as T[];
        setState({ data: docs, loading: false, error: null });
      } catch (e: any) {
        setState({
          data: [],
          loading: false,
          error: e.message || "Failed to fetch data.",
        });
      }
    };
    fetchData();
  }, [collectionName]);

  return state;
}
