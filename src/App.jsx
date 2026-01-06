import { useEffect, useState } from 'react'
import './App.css'
import { calculateDaysLeft } from './utils';  

function App() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");


  useEffect(() => {
    const savedItems = localStorage.getItem("pantryItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());

    const updatedItems = ([...items, formJson]);
    setItems(updatedItems);
    localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    form.reset();
    console.log(formJson);
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
      <form method="post" onSubmit={handleSubmit}>
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
              {item.myItem}: {item.expiryDate}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App
