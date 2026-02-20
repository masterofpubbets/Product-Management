import { useState } from "react";

export const useImage = () => {
  const [imgError, setImgError] = useState("");
  const [binaryData, setBinaryData] = useState("");
  const [binaryData64, setBinaryData64] = useState("");

  const convertImageToBinary = (file) => {
    try {
      setImgError("");
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        // Convert the ArrayBuffer to a Uint8Array (common for binary handling)
        const uint8Array = new Uint8Array(arrayBuffer);

        // Optional: Convert Uint8Array to a binary string for specific use cases (like sending raw data)
        // Note: Sending data via API usually involves Blob/FormData or Base64 encoding instead of a raw binary string.
        let binaryString = "";
        uint8Array.forEach((byte) => {
          binaryString += String.fromCharCode(byte);
        });

        // Set the binary data to state (use Uint8Array for most modern applications)
        // For this example, we log a snippet of the data.
        setBinaryData(uint8Array);
        setBinaryData64(uint8Array.toBase64());
        //console.log(
        //"Binary String snippet:",
        //binaryString.substring(0, 50) + "..."
        //);
      };

      // Read the file as an ArrayBuffer
      reader.readAsArrayBuffer(file);
    } catch (er) {
      setImgError("Error while convertinig");
      setBinaryData(null);
      setBinaryData64(null);
    }
  };

  const convertBinary64ToImage = (base64Data) => {
    const src = `data:image/jpeg;base64,${base64Data}`; // Adjust 'image/jpeg' to your actual image type
    return src;
  };

  return {
    convertImageToBinary,
    imgError,
    convertBinary64ToImage,
    binaryData,
    binaryData64,
  };
};
