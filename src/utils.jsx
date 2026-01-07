
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
        message: "Product not found in database"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Error fetching product data"
    };
  }
}