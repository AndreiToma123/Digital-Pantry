export default function Stats({ items }) {
    const expiringSoon = items.filter(item => {
        const today = new Date();
        const expiry = new Date(item.expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays >= 0;
    }).length;

    if (expiringSoon === 0) return null;

    return (
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="card glass text-center" style={{
                padding: '0.75rem 1rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderColor: 'rgba(245, 158, 11, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                width: 'auto'
            }}>
                <span style={{ color: 'var(--warning)', fontSize: '1.25rem' }}>⚠</span>
                <span style={{ color: 'var(--warning)', fontWeight: 600 }}>
                    {expiringSoon} items expiring soon
                </span>
            </div>
        </div>
    );
}
