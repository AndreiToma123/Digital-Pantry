export default function Header() {
  return (
    <header className="text-center animate-fade-in">
      <h1 style={{ fontSize: '2.5rem', background: 'linear-gradient(to right, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Digital Pantry
      </h1>
      <p style={{ color: 'var(--text-muted)' }}>Track your groceries in style</p>
    </header>
  );
}
