
export function calculateDaysLeft(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const timeDifference = expiry - today;
  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

export async function fetchProductByBarcode(barcode) {
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`
    );
    
    if (!response.ok) {
      return {
        success: false,
        message: `Product with barcode ${barcode} not found in Open Food Facts database. You can add it manually.`
      };
    }
    
    const data = await response.json();
    
    if (data.status === 1) {
      return {
        success: true,
        productName: data.product.product_name || "Unknown Product",
        brands: data.product.brands || "",
        categories: data.product.categories || "",
        imageUrl: data.product.image_url || null
      };
    } else {
      return {
        success: false,
        message: `Product with barcode ${barcode} not found. You can add it manually.`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error connecting to Open Food Facts. Please check your internet connection or add the item manually."
    };
  }
}
