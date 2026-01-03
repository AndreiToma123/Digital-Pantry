import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [items, setItems] = useState([]);

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
      const updatedItems = items.filter((item, index) => index!== indexToDelete);
      setItems(updatedItems);
      localStorage.setItem("pantryItems", JSON.stringify(updatedItems));
    }



  return (
    <main className="container">
      <h1>Digital Pantry</h1>
      <form method="post" onSubmit={handleSubmit}>
      <label>
        Item: <input name="myItem" />
      </label>
      <label>
        Expiry date: <input name="expiryDate" type="date" />
      </label>
      <button type="submit">Submit</button>
      </form>

      <h2>Pantry Items</h2>
      <ul>
        {items.map((item, index) => (
        <li key={index}>
          {item.myItem}: {item.expiryDate}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
        ))}
      </ul>
    </main>
  );
}

export default App
