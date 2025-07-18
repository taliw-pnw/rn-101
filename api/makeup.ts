const BASE_URL = "https://playground-api.taliwhub.dev/api/makeup";

export async function fetchProducts(): Promise<any[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<any | null> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/products?brand=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("Failed to search products");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}

export async function fetchProductsByCategory(
  category: string
): Promise<any[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/products?product_type=${encodeURIComponent(category)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products by category");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}
