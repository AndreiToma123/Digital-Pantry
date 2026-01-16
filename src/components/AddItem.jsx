import { useState } from 'react';
import Scanner from '../Scanner';
import { fetchProductByBarcode } from '../utils';

export default function AddItem({ onAdd }) {
    const [mode, setMode] = useState('manual'); 
    const [itemName, setItemName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [barcode, setBarcode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showScanner, setShowScanner] = useState(false);

    const handleLookup = async (code) => {
        setLoading(true);
        setError('');
        const result = await fetchProductByBarcode(code);
        setLoading(false);

        if (result.success) {
            setItemName(result.productName);
            setMode('manual'); 
            setBarcode('');
            setShowScanner(false);
        } else {
            setError(result.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!itemName || !expiryDate) return;
        onAdd({ myItem: itemName, expiryDate });
        setItemName('');
        setExpiryDate('');
        setBarcode('');
        setMode('manual');
    };

    return (
        <div className="card glass animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="flex gap-4" style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                <button
                    className={mode === 'manual' ? '' : 'text-muted'}
                    style={{ flex: 1, backgroundColor: mode === 'manual' ? 'var(--primary)' : 'transparent', color: mode === 'manual' ? 'white' : 'var(--text-muted)' }}
                    onClick={() => setMode('manual')}
                >
                    Manual Entry
                </button>
                <button
                    className={mode === 'barcode' ? '' : 'text-muted'}
                    style={{ flex: 1, backgroundColor: mode === 'barcode' ? 'var(--primary)' : 'transparent', color: mode === 'barcode' ? 'white' : 'var(--text-muted)' }}
                    onClick={() => setMode('barcode')}
                >
                    Barcode / Scan
                </button>
            </div>

            {mode === 'manual' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Item Name</label>
                        <input
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="e.g., Milk"
                            required
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Expiry Date</label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                            style={{ colorScheme: 'dark' }}
                        />
                    </div>
                    <button type="submit" style={{ marginTop: '0.5rem' }}>Add to Pantry</button>
                </form>
            )}

            {mode === 'barcode' && (
                <div className="flex flex-col gap-4">
                    <button
                        type="button"
                        onClick={() => setShowScanner(!showScanner)}
                        style={{ backgroundColor: showScanner ? 'var(--danger)' : 'var(--bg-card)', border: '1px solid var(--primary)' }}
                    >
                        {showScanner ? 'Close Scanner' : 'Open Scanner'}
                    </button>

                    {showScanner && (
                        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)' }}>
                            <Scanner onScanSuccess={(code) => handleLookup(code)} />
                        </div>
                    )}

                    <div className="flex gap-2 items-center">
                        <div style={{ height: '1px', backgroundColor: '#334155', flex: 1 }}></div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR</span>
                        <div style={{ height: '1px', backgroundColor: '#334155', flex: 1 }}></div>
                    </div>

                    <div className="flex gap-2">
                        <input
                            value={barcode}
                            onChange={(e) => setBarcode(e.target.value)}
                            placeholder="Enter barcode number"
                        />
                        <button
                            onClick={() => handleLookup(barcode)}
                            disabled={loading || !barcode}
                        >
                            {loading ? '...' : 'Search'}
                        </button>
                    </div>
                    {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem' }}>{error}</p>}
                </div>
            )}
        </div>
    );
}
