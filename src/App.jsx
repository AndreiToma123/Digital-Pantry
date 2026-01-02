import { useState } from 'react'
import './App.css'

function App() {
  function handleSubmit(e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);

      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }
    
  return (
    <main className="container">
      <h1>Digital Pantry</h1>
      <form method="post" onSubmit={handleSubmit}>
      <label>
        Item: <input name="myItem" />
      </label>
      <label>
        Expiry date: <input name="expiryDate" />
      </label>
      <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App
