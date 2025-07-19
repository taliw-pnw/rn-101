import { fetchProductById } from "@/api/makeup";
import { Product } from "@/types/product";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import ProductDetail from "@/components/ProductDetail";

export default function ProductScreen() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  //   get id from route params
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Failed to load product:", error);
      Alert.alert("Error", "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.push("/")
          }
          style={styles.headerActionContainer}
        >
          <ChevronLeft size={20} color="#9CA3AF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        {/* Placeholder for right header action, e.g., favorite button */}
        <View style={styles.headerActionContainer} />
      </View>

      {loading ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Loading ...
          </Text>
        </View>
      ) : product ? (
        <ProductDetail product={product} />
      ) : (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text>Product not found</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  headerActionContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
