import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState, useRef } from 'react';

function Scanner() {

    const [scanResult, setScanResult] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        // Prevent double initialization
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        scannerRef.current = scanner;

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.warn(err);
        }

        scanner.render(success, error);

        // Cleanup function
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => {
                    console.error("Failed to clear scanner:", err);
                });
                scannerRef.current = null;
            }
        };

    }, []);

    return (
        <div className="Scanner">
            
            { scanResult
            ? <div>Success: {scanResult}</div>
            : <div id="reader"></div>
            }
        </div>
    );

}

export default Scanner;