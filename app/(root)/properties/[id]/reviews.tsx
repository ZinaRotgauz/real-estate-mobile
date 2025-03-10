import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useAppwrite } from "@/lib/useAppwrite";
import { getPropertyById } from "@/lib/appwrite";
import Comment from "@/components/Comment";

const ReviewsPage = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Fetch the full property data
  const { data: property, loading } = useAppwrite({
    fn: getPropertyById,
    params: { id: id! },
  });

  if (loading) {
    return <Text className="text-center mt-10">Loading reviews...</Text>;
  }

  const reviews = Array.isArray(property?.reviews) ? property.reviews : [];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="p-5">
        <Text className="text-black-300 text-xl font-rubik-bold mb-5">
          Property Reviews
        </Text>

        {reviews.length > 0 ? (
          reviews.map((review: any, index: number) => (
            <Comment key={index} item={review} />
          ))
        ) : (
          <Text className="text-black-200">No reviews available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ReviewsPage;
