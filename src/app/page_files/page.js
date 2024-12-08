"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function PageFiles() {
  const router = useRouter();
  const [lineCount, setLineCount] = useState('');
  const [error, setError] = useState('');
  const [fileType, setFileType] = useState('type1');

  // Function to generate a random integer between min and max (inclusive)
  const getRandomNumber = (min = 1, max = 1000) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate a random epoch time between Jan 1, 2020 and now
  const getRandomEpochTime = () => {
    const start = Math.floor(new Date('2020-01-01T00:00:00Z').getTime() / 1000);
    const end = Math.floor(Date.now() / 1000);
    return Math.floor(Math.random() * (end - start)) + start;
  };

  const getRandomGroupEventNodes = () => {
    const ranges = [
      { min: 2, max: 5 },
      { min: 36, max: 39 },
      { min: 50, max: 50 },

    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventFaults = () => {
    const ranges = [
      { min: 601, max: 601 },

    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  const getRandomGroupEventActivities = () => {
    const ranges = [
      { min: 101, max: 107 },
      { min: 204, max: 204 },
      { min: 206, max: 217 },
      { min: 220, max: 222 },
      { min: 229, max: 260 },
      { min: 401, max: 402 },
      { min: 501, max: 502 },
      { min: 701, max: 705 },
    ];
    const selectedRange = ranges[Math.floor(Math.random() * ranges.length)];
    return Math.floor(Math.random() * (selectedRange.max - selectedRange.min + 1)) + selectedRange.min;
  };

  // Handler for generating and downloading the file
  const handleGenerateFile = () => {
    const count = parseInt(lineCount, 10);

    // Validate the input
    if (isNaN(count) || count <= 0) {
      setError('Please enter a valid positive number.');
      return;
    }

    setError('');

    // Generate an array of lines
    const lines = [];
    for (let i = 0; i < count; i++) {
      let numbers;
      if (fileType === 'type1') {
        numbers = [
          getRandomNumber(0, 8),       // User Level between 0 and 8
          getRandomGroupEventFaults(),       // Group Event between 101-107 or 201-260
          getRandomGroupEventNodes(),
          getRandomNumber(),
          getRandomNumber(),
          getRandomNumber(0, 0),
        ];
      } else if (fileType === 'type2') {
        // Define separate random values for type2
        numbers = [
          getRandomNumber(0, 8),       // User Level between 0 and 8
          getRandomGroupEventActivities(),       // Group Event between 101-107 or 201-260
          getRandomNumber(0, 2147483647),    // Example different range
          getRandomNumber(0, 2147483647),
          getRandomNumber(0, 2147483647),
          getRandomNumber(0, 2147483647),
        ];
      }

      lines.push({
        epoch: getRandomEpochTime(),
        numbers: numbers,
      });
    }

    // Sort lines in reverse order based on epoch time (newest first)
    lines.sort((a, b) => b.epoch - a.epoch);

    // Build the file content
    let content = 'Timestamp;User Level;Group Event;Value1;Value2;Value3;Value4\n';
    lines.forEach(line => {
      const formattedLine = [line.epoch, ...line.numbers].join(';');
      content += formattedLine + '\n';
    });

    // Create a Blob from the content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a link to download the Blob
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileType === 'type1' ? 'generatedFile1.log' : 'generatedFile2.log';
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className={styles.main}>
      {/* Go Back Button */}
      <button className={styles.button} onClick={() => router.back()}>
        Go Back
      </button>

      <h1>Create File</h1>

      {/* Input Section */}
      <div className={styles.inputContainer}>
        <label htmlFor="lineCount">Number of Lines:</label>
        <input
          type="number"
          id="lineCount"
          value={lineCount}
          onChange={(e) => setLineCount(e.target.value)}
          placeholder="Enter number of lines"
          min="1"
          className={styles.inputBox}
        />
      </div>

      {/* File Type Selection */}
      <div className={styles.inputContainer}>
        <label htmlFor="fileType">Select File Type:</label>
        <select
          id="fileType"
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
        >
          <option value="type1">Faults</option>
          <option value="type2">Activities</option>
        </select>
      </div>

      {/* Error Message */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Generate File Button */}
      <button className={styles.button} onClick={handleGenerateFile}>
        Generate and Download File
      </button>
    </main>
  );
}