
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Stats from './components/Stats'
import AddItem from './components/AddItem'
import PantryList from './components/PantryList'

function App() {
  const [items, setItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("pantryItems");
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse items", e);
      }
    }
  }, []);

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("pantryItems", JSON.stringify(newItems));
  }

  const handleAdd = (newItem) => {
    const itemWithId = { ...newItem, id: Date.now().toString() };
    const updatedItems = [...items, itemWithId];
    saveItems(updatedItems);
    setIsAddModalOpen(false);
  }

  const handleDelete = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    saveItems(updatedItems);
  }

  return (
    <main className="container" style={{ paddingBottom: '6rem' }}>
      <Header />
      <Stats items={items} />

      <div className="flex flex-col gap-4">
       
        <PantryList items={items} onDelete={handleDelete} />
      </div>

      <button
        onClick={() => setIsAddModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
          zIndex: 50
        }}
        className="animate-fade-in"
      >
        +
      </button>

      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem'
        }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
          className="animate-fade-in"
        >
          <div style={{ width: '100%', maxWidth: '500px' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Add New Item</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'transparent', padding: '0.5rem', fontSize: '1.5rem', lineHeight: 1 }}
              >
                ×
              </button>
            </div>
            <AddItem onAdd={handleAdd} />
          </div>
        </div>
      )}

      <footer className="text-center" style={{ marginTop: '4rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} Digital Pantry</p>
      </footer>
    </main>
  );
}

export default App