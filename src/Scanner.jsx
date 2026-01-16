import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

function Scanner({ onScanSuccess }) {

    const scannerRef = useRef(null);
    const hasScanned = useRef(false);

    useEffect(() => {
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
            if (hasScanned.current) return;
            hasScanned.current = true;
            
            scanner.clear();
            scannerRef.current = null;
            
            if (onScanSuccess) {
                onScanSuccess(result);
            }
        }

        function error(err) {
            console.warn(err);
        }

        scanner.render(success, error);

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear().catch(err => {
                    console.error("Failed to clear scanner:", err);
                });
                scannerRef.current = null;
            }
            hasScanned.current = false;
        };

    }, [onScanSuccess]);

    return (
        <div className="Scanner">
            <div id="reader"></div>
        </div>
    );

}

export default Scanner;