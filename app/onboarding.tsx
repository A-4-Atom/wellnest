import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUserStore } from "../store/userStore";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";

interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Onboarding = () => {
  const {
    data: slides,
    loading,
    error,
  } = useFirestoreCollection<Slide>("onboardingSlides");
  const [currentIndex, setCurrentIndex] = useState(0);
  const setOnboarded = useUserStore((state) => state.setOnboarded);
  const hasOnboarded = useUserStore((state) => state.hasOnboarded);
  const router = useRouter();

  useEffect(() => {
    if (hasOnboarded) {
      router.replace("/login");
    }
  }, [hasOnboarded, router]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setOnboarded(true);
      router.replace("/login");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#6c47ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </View>
    );
  }

  if (!slides.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No onboarding slides found.</Text>
      </View>
    );
  }

  const slide = slides[currentIndex];

  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      <Image
        source={{ uri: slide.imageUrl }}
        style={{ width: 250, height: 250, resizeMode: "contain" }}
      />
      <Text className="text-2xl font-bold mt-8 mb-2 text-center">
        {slide.title}
      </Text>
      <Text className="text-lg text-center mb-8">{slide.description}</Text>
      <TouchableOpacity
        className="bg-[#6c47ff] px-8 py-3 rounded-md"
        onPress={handleNext}
      >
        <Text className="text-white text-lg font-bold">
          {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-6">
        {slides.map((_, idx) => (
          <View
            key={idx}
            className={`w-3 h-3 mx-1 rounded-full ${idx === currentIndex ? "bg-[#6c47ff]" : "bg-gray-300"}`}
          />
        ))}
      </View>
    </View>
  );
};

export default Onboarding;
