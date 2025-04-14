{\rtf1\ansi\ansicpg1252\cocoartf2821
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    const imageUpload = document.getElementById('imageUpload');\
    const fileNameSpan = document.getElementById('fileName');\
    const imagePreview = document.getElementById('imagePreview');\
    const previewArea = document.getElementById('previewArea');\
    const motionOptionsDiv = document.getElementById('motionOptions');\
    const motionOptions = document.querySelectorAll('input[name="motionEffect"]');\
    const convertButton = document.getElementById('convertButton');\
    const statusArea = document.getElementById('statusArea');\
    const downloadArea = document.getElementById('downloadArea');\
    const downloadLink = document.getElementById('downloadLink');\
\
    let selectedFile = null;\
    let selectedEffect = null;\
\
    // --- Handle Image Upload ---\
    imageUpload.addEventListener('change', (event) => \{\
        const files = event.target.files;\
        if (files && files[0]) \{\
            selectedFile = files[0];\
            fileNameSpan.textContent = selectedFile.name;\
\
            const reader = new FileReader();\
            reader.onload = (e) => \{\
                imagePreview.src = e.target.result;\
                previewArea.style.display = 'block';\
                motionOptionsDiv.style.display = 'block';\
                resetConversionState(); // Reset if a new image is uploaded\
                updateConvertButtonState();\
            \}\
            reader.readAsDataURL(selectedFile);\
        \} else \{\
            // No file selected or selection cancelled\
            selectedFile = null;\
            fileNameSpan.textContent = 'No file chosen';\
            previewArea.style.display = 'none';\
            imagePreview.src = '#';\
            motionOptionsDiv.style.display = 'none';\
            resetConversionState();\
            updateConvertButtonState();\
        \}\
    \});\
\
    // --- Handle Motion Effect Selection ---\
    motionOptions.forEach(radio => \{\
        radio.addEventListener('change', (event) => \{\
            if (event.target.checked) \{\
                selectedEffect = event.target.value;\
                resetConversionState(); // Reset if effect changes\
                updateConvertButtonState();\
                 console.log("Selected effect:", selectedEffect); // For debugging\
            \}\
        \});\
    \});\
\
    // --- Enable/Disable Convert Button ---\
    function updateConvertButtonState() \{\
        if (selectedFile && selectedEffect) \{\
            convertButton.disabled = false;\
            convertButton.textContent = 'Convert to Video';\
        \} else if (selectedFile) \{\
             convertButton.disabled = true;\
             convertButton.textContent = 'Select an Effect';\
        \}\
        else \{\
            convertButton.disabled = true;\
            convertButton.textContent = 'Select Image & Effect';\
        \}\
    \}\
\
    // --- Reset Status and Download Areas ---\
    function resetConversionState() \{\
        statusArea.textContent = '';\
        statusArea.className = 'status-area'; // Reset class\
        downloadArea.style.display = 'none';\
        downloadLink.href = '#'; // Clear previous link\
    \}\
\
    // --- Handle Conversion Request (Simulated Backend Interaction) ---\
    convertButton.addEventListener('click', async () => \{\
        if (!selectedFile || !selectedEffect) \{\
            alert('Please upload an image and select a motion effect.');\
            return;\
        \}\
\
        resetConversionState();\
        convertButton.disabled = true;\
        statusArea.textContent = 'Processing request...';\
\
        // ** THIS IS WHERE THE BACKEND CALL HAPPENS **\
        // In a real application, you would use FormData to send the image\
        // and the selected effect to your server endpoint using fetch or XMLHttpRequest.\
\
        const formData = new FormData();\
        formData.append('image', selectedFile);\
        formData.append('effect', selectedEffect);\
\
        // Example using fetch (replace '/api/convert' with your actual backend endpoint)\
        try \{\
            statusArea.textContent = 'Uploading and converting... This might take a moment.';\
            statusArea.classList.add('loading'); // Add loading dots\
\
            // Simulate backend processing delay (REMOVE THIS IN PRODUCTION)\
            await new Promise(resolve => setTimeout(resolve, 4000)); // Simulate 4 seconds delay\
\
            /*\
            // --- ACTUAL FETCH CALL (COMMENTED OUT FOR DEMO) ---\
            const response = await fetch('/api/convert', \{ // <-- YOUR BACKEND URL\
                method: 'POST',\
                body: formData\
                // Headers might be needed depending on your backend (e.g., 'Accept': 'application/json')\
            \});\
\
            statusArea.classList.remove('loading'); // Remove loading dots\
\
            if (!response.ok) \{\
                 // Try to get error message from backend response if available\
                let errorMsg = `HTTP error! Status: $\{response.status\}`;\
                try \{\
                    const errorData = await response.json();\
                    errorMsg = errorData.message || errorMsg;\
                \} catch(e) \{ /* Ignore if response is not JSON * / \}\
                throw new Error(errorMsg);\
            \}\
\
            // Assuming the backend responds with JSON containing the download URL\
            const result = await response.json(); // e.g., \{ downloadUrl: '/path/to/video.mp4' \}\
\
            if (result.downloadUrl) \{\
                statusArea.textContent = 'Conversion Successful!';\
                downloadLink.href = result.downloadUrl; // Set the actual download link\
                downloadArea.style.display = 'block';\
            \} else \{\
                 throw new Error('Backend did not provide a download URL.');\
            \}\
            // --- END OF ACTUAL FETCH CALL ---\
            */\
\
            // --- SIMULATED SUCCESS (REMOVE THIS IN PRODUCTION) ---\
            statusArea.classList.remove('loading');\
            statusArea.textContent = 'Conversion Successful! (Simulated)';\
            // In the simulation, we don't have a real URL, so the download won't work correctly\
            downloadLink.href = '#'; // Placeholder link\
            // You could potentially generate a dummy blob URL for testing if needed\
            // const dummyBlob = new Blob(["dummy video data"], \{ type: "video/mp4" \});\
            // downloadLink.href = URL.createObjectURL(dummyBlob);\
            downloadLink.setAttribute('download', `output_$\{selectedEffect\}.mp4`); // Set dynamic filename\
            downloadArea.style.display = 'block';\
            // --- END OF SIMULATED SUCCESS ---\
\
\
        \} catch (error) \{\
            console.error('Conversion Error:', error);\
            statusArea.classList.remove('loading');\
            statusArea.textContent = `Error: $\{error.message || 'Conversion failed. Please try again.'\}`;\
            statusArea.classList.add('error');\
            convertButton.disabled = false; // Re-enable button on error\
            updateConvertButtonState(); // Ensure correct state\
        \}\
    \});\
\});}