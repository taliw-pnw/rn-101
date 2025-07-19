import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const formatPrice = (price: string, priceSign: string) => {
    if (!price || price === "0.0") return "Price not available";
    return `${priceSign || "$"}${price}`;
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
      <Text style={{ marginTop: 8, color: "#6B7280" }}>
        {product.description}
      </Text>
      <Image
        source={{ uri: product.api_featured_image }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={{ marginTop: 16, fontSize: 20, color: "#1F2937" }}>
        {formatPrice(product.price, product.price_sign)}
      </Text>

      <Text style={{ marginTop: 8, color: "#6B7280" }}>
        Brand: {product.brand}
      </Text>
      <Text style={{ marginTop: 8, color: "#6B7280" }}>
        Category: {product.product_type}
      </Text>

      <Text style={{ marginTop: 8, color: "#6B7280" }}>Color</Text>
      <View>
        {product.product_colors.map((color, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: color.hex_value,
                marginRight: 8,
              }}
            />
            <Text style={{ color: "#1F2937" }}>{color.colour_name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    marginTop: 16,
  },
});
