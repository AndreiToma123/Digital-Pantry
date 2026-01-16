import { calculateDaysLeft } from '../utils';

export default function PantryList({ items, onDelete }) {
    if (items.length === 0) {
        return (
            <div className="text-center" style={{ marginTop: '2rem', opacity: 0.6 }}>
                <p>Your pantry is empty. Add some items!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 style={{ fontSize: '1.25rem' }}>Pantry Items</h2>
            <div className="flex flex-col gap-2">
                {items.map((item, index) => {
                    const daysLeft = calculateDaysLeft(item.expiryDate);
                    let statusColor = 'var(--success)';
                    if (daysLeft < 0) statusColor = 'var(--danger)';
                    else if (daysLeft <= 3) statusColor = 'var(--warning)';

                    const key = item.id || index;

                    return (
                        <div key={key} className="card glass flex justify-between items-center" style={{ padding: '1rem', animationDelay: `${index * 0.05}s` }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.myItem}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    Expires: {item.expiryDate}
                                    <span className="expiry-badge" style={{
                                        marginLeft: '0.5rem',
                                        color: statusColor,
                                        fontWeight: 600,
                                        backgroundColor: `rgba(0,0,0,0.2)`
                                    }}>
                                        {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => onDelete(index)}
                                className="delete-btn"
                                title="Delete Item"
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
