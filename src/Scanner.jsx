import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

function Scanner() {

    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5, //if too fast it can lag
        });

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.log(err);
        }

    }, []);

    return (
        <div className="Scanner">
            
            { scanResult
            ? <div>Success: scanResult</div>
            : <div id="reader"></div>
            }
        </div>
    );

}



export default Scanner;