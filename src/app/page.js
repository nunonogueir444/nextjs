"use client";

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [fileContent, setFileContent] = useState('');
  const [processedContent, setProcessedContent] = useState([]);
  const [filters, setFilters] = useState({
    column1: '',
    column2: '',
    column3: ''
  });

  const column2Values = ['Developer', 'Other'];  // Predefined values for Column 2
  const column3Values = [
    'Hourmeters Mismatch Popup Screen', 
    'Hourmeters Mismatch Popup Pump', 
    'Hourmeters Mismatch Sync Screen', 
    'Other'
  ];  // Predefined values for Column 3

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result;
        setFileContent(content);

        // Split content into lines and filter out empty lines
        const lines = content.split('\n').filter(line => line.trim() !== '');

        // Process all lines
        const processedLines = lines.map((line) => {
          const values = line.split(';');

          // Convert all first values from epoch to date if it's an epoch timestamp
          const updatedValues = values.map((value, valueIndex) => {
            const trimmedValue = value.trim();
            if (valueIndex === 0) {
              const epoch = parseInt(trimmedValue, 10);
              if (!isNaN(epoch)) {
                const date = new Date(epoch * 1000); // Convert epoch to milliseconds
                return date.toLocaleString(); // Return the formatted date
              }
            }

            // Check if the second column value is '8', and if so, change it to "Developer"
            if (valueIndex === 1 && trimmedValue === '8') {
              return 'Developer';
            }

            // Check if the third column value is '220', '221', or '222', and replace accordingly
            if (valueIndex === 2) {
              if (trimmedValue === '220') return 'Hourmeters Mismatch Popup Screen';
              if (trimmedValue === '221') return 'Hourmeters Mismatch Popup Pump';
              if (trimmedValue === '222') return 'Hourmeters Mismatch Sync Screen';
            }

            return value; // Return the original value for all other cases
          });

          return updatedValues;
        });

        // Set the processed content
        setProcessedContent(processedLines);
      };

      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  // Handle filter selection change
  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value.toLowerCase() // Convert filter to lowercase for case-insensitive comparison
    }));
  };

  // Apply filtering to the processed content
  const filteredContent = processedContent.filter((row) => {
    return (
      (filters.column1 === '' || row[0].toLowerCase().includes(filters.column1)) &&
      (filters.column2 === '' || row[1].toLowerCase().includes(filters.column2)) &&
      (filters.column3 === '' || row[2].toLowerCase().includes(filters.column3))
    );
  });

  return (
    <main className={styles.main}>
      <div>
        <a href="/demoFile.txt" download="demoFile.txt">
          &nbsp;&nbsp;&nbsp;&nbsp; Download Demo File
        </a>
      </div>

      <div>
        <h1>Upload a Text File</h1>
        <input type="file" accept=".txt" onChange={handleFileChange} />

        <h2>Filter by Columns:</h2>
        <div className={styles.filters}>
          <select
            value={filters.column1}
            onChange={(e) => handleFilterChange('column1', e.target.value)}
          >
            <option value="">All Dates</option>
            {processedContent.map((row, index) => (
              <option key={index} value={row[0]}>
                {row[0]}
              </option>
            ))}
          </select>

          <select
            value={filters.column2}
            onChange={(e) => handleFilterChange('column2', e.target.value)}
          >
            <option value="">All Values</option>
            {column2Values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select
            value={filters.column3}
            onChange={(e) => handleFilterChange('column3', e.target.value)}
          >
            <option value="">All Values</option>
            {column3Values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <h2>Original File Content:</h2>
        <pre>{fileContent}</pre>

        <h2>Processed File Content in Table:</h2>
        <table border="1" className={styles.table}>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
