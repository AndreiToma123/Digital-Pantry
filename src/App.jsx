import { useEffect, useState } from 'react'
import { calculateDaysLeft, fetchProductByBarcode } from './utils'
import Scanner from './Scanner'
import './App.css'

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("pantryItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

async function lookupBarcode(barcodeValue) {
  setLoading(true);
  setError("");

  const productData = await fetchProductByBarcode(barcodeValue);

  if (productData.success) {
    document.querySelector('input[name="myItem"]').value = productData.productName;
    setBarcode("");
    setShowScanner(false); 
    setError(""); 
  } else {
    setError(productData.message);
    setBarcode(barcodeValue);
    setShowScanner(false); 
  }

  setLoading(false);
}

  async function handleBarcodeSubmit(e) {
    e.preventDefault();
    
    if (!barcode) {
      setError("Please enter a barcode");
      return;
    }

    await lookupBarcode(barcode);
  }

  function handleScanSuccess(scannedBarcode) {
    lookupBarcode(scannedBarcode);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const updatedItems = ([...items, formJson]);
    setItems(updatedItems);
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    form.reset();
  }

  function handleDelete(indexToDelete) {
    const updatedItems = items.filter((item, index) => index !== indexToDelete);
    setItems(updatedItems);
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
  }

  const sortedItems = [...items].sort((a, b) => {
    return new Date(a.expiryDate) - new Date(b.expiryDate);
  });

  const filteredItems = sortedItems.filter(item => 
    item.myItem.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="container">
      <h1>Digital Pantry</h1>
      
      <label>
        Search: <input type="text" onChange={e => setQuery(e.target.value)} />
      </label>

      <div>
        <h3>Add by Barcode</h3>
        <button onClick={() => setShowScanner(!showScanner)}>
          {showScanner ? "Hide Scanner" : "Show Scanner"}
        </button>
        
        {showScanner && <Scanner onScanSuccess={handleScanSuccess} />}
        
        <form onSubmit={handleBarcodeSubmit}>
          <label>
            Or enter barcode manually: 
            <input 
              type="text" 
              value={barcode}
              onChange={e => setBarcode(e.target.value)}
              placeholder="Enter barcode number"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Look Up Product"}
          </button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <h3>Add Item</h3>
        <label>
          Item <input name="myItem" />
        </label>
        <label>
          Expiry date <input name="expiryDate" type="date" />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Pantry Items</h2>
      <ul>
        {filteredItems.map((item, index) => {
          const daysLeft = calculateDaysLeft(item.expiryDate);
          return (
            <li key={index}>
              {item.myItem}: {item.expiryDate} ({daysLeft} days left)
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App