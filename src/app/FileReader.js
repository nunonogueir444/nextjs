"use client";

import { useState } from "react";

export default function FileReader() {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();

      reader.onload = () => {
        setFileContent(reader.result);
      };

      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  return (
    <div>
      <h1>Upload a Text File</h1>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      
      <h2>File Content:</h2>
      <pre>{fileContent}</pre>
    </div>
  );
}
