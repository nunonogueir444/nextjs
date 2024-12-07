"use client";

import { useState } from 'react';
import styles from './page.module.css';

// Loading Spinner Component
// Loading message instead of spinner
const LoadingMessage = () => (
  <div className={styles.loadingMessage}>
    Loading file, please wait...
  </div>
);

export default function Home() {
  const [fileContent, setFileContent] = useState('');
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    column7: ''
  });

  const column2Values = [
    'Generic Op.',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    'Developer Op.'
  ];
  const column3Values = [
    'first service reset ',
    'standard service reset ',
    'full service reset',
    'first service interval is changed',
    'standard service interval is changed',
    'standard service interval is changed',
    'confirm button is pressed',
    'Time/Date updated',
    'Export Logs',
    'Import new Parameters',
    'Export Parameters',
    'MOCAS_HI_LEVEL_SUCCESS',
    'MOCAS_HI_LEVEL_FAIL',
    'MOCAS_HOURMETER_SUCCESS',
    'MOCAS_HOURMETER_FAIL',
    'MOCAS_OTHER_MODULE_SUCCESS',
    'MOCAS_OTHER_MODULE_FAIL',
    'Retrieving data. Wait a few seconds and try to cut or copy again.',
    'Export Text Lists',
    'Export Backup Files',
    'Hourmeters Mismatch Popup Screen',
    'Hourmeters Mismatch Popup Pump',
    'Hourmeters Mismatch Sync Screen',
    'Retrieving data. Wait a few seconds and try to cut or copy again.',
    'PLC App version',
    'PLC RTS version',
    'Screen version',
    'Pump VCL App Version',
    'Pump OS/Profile version',
    'Pump App version',
    'TRR VCL App Version',
    'TRR OS/Profile version',
    'TRR App version',
    'TRL VCL App Version',
    'TRL OS/Profile version',
    'TRL App version',
    'TFR VCL App Version',
    'TFR OS/Profile version',
    'TFR App version',
    'TFL VCL App Version',
    'TFL OS/Profile version',
    'TFL App version',
    'SRR OS/Profile versions',
    'SRL OS/Profile versions',
    'SRL OS/Profile versions',
    'SFL OS/Profile versions',
    'Pump HW info',
    'TRR HW info',
    'TRR HW info',
    'TFR HW info',
    'TFL HW info',
    'SRR HW info',
    'SRL HW info',
    'SRL HW info',
    'SFL HW info',
    'Pre-check done',
    'Drivers Presence changed',
    'Parameter Value Change',
    'Parameter Value Change when Download Par from the Controllers',
    'Download PAR from the Controllers',
    'Upload PAR to the Controllers',
    'Save Current PAR to Defaults',
    'Load PAR Defaults',
    'Load PAR Factory'
  ];

  const chunkSize = 256 * 1024;

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        const content = reader.result;
        const lines = content.split('\n');
        
        let filePages = [];
        let currentChunk = '';
        let currentSize = 0;
        
        const header = lines[0];
        
        let dataLines = lines.slice(1); 

        dataLines.forEach(line => {
          const lineSize = new Blob([line]).size;

          if (currentSize + lineSize > chunkSize) {
            filePages.push(currentChunk);
            currentChunk = line + '\n';
            currentSize = lineSize;
          } else {
            currentChunk += line + '\n';
            currentSize += lineSize;
          }
        });

        if (currentChunk) {
          filePages.push(currentChunk);
        }

        setPages(filePages);
        setIsLoading(false);
        setFileContent(content);
      };

      setIsLoading(true);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      const newPage = prevPage + direction;
      if (newPage >= 0 && newPage < pages.length) {
        return newPage;
      }
      return prevPage;
    });
  };

  const currentPageContent = pages[currentPage] || '';

  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value.toLowerCase()
    }));
  };

  const filteredContent = currentPageContent
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line) => {
      const values = line.split(';');

      if (values.length === 7) {
        const updatedValues = values.map((value, valueIndex) => {
          const trimmedValue = value.trim();
          if (valueIndex === 0) {
            const epoch = parseInt(trimmedValue, 10);
            if (!isNaN(epoch)) {
              const date = new Date(epoch * 1000);
              return date.toLocaleString();
            }
          }
          if (valueIndex === 1 ) {
            if (trimmedValue === '0') return 'Generic Op.';
            if (trimmedValue === '1') return '11';
            if (trimmedValue === '2') return '22';
            if (trimmedValue === '3') return '33';
            if (trimmedValue === '4') return '44';
            if (trimmedValue === '5') return '55';
            if (trimmedValue === '6') return '66';
            if (trimmedValue === '7') return '77';
            if (trimmedValue === '8') return 'Developer Op.';
          }
          if (valueIndex === 2) {
            if (trimmedValue === '101') return 'first service reset';
            if (trimmedValue === '102') return 'standard service reset ';
            if (trimmedValue === '103') return 'full service reset';
            if (trimmedValue === '104') return 'first service interval is changed';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
            if (trimmedValue === '') return '';
          }
          return value;
        });

        return updatedValues;
      }
      return null; 
    })
    .filter((row) => row !== null)
    .filter((row) => {
      return (
        (filters.column1 === '' || row[0].toLowerCase().includes(filters.column1)) &&
        (filters.column2 === '' || row[1].toLowerCase().includes(filters.column2)) &&
        (filters.column3 === '' || row[2].toLowerCase().includes(filters.column3)) &&
        (filters.column4 === '' || row[3].toLowerCase().includes(filters.column4)) &&
        (filters.column5 === '' || row[4].toLowerCase().includes(filters.column5)) &&
        (filters.column6 === '' || row[5].toLowerCase().includes(filters.column6)) &&
        (filters.column7 === '' || row[6].toLowerCase().includes(filters.column7))
      );
    });

  const headerColumns = fileContent ? fileContent.split('\n')[0].split(';') : [];

  return (
    <main className={styles.main}>
      <div>
        <a href="/demoFile.txt" download="demoFile.txt">
          &nbsp;&nbsp;&nbsp;&nbsp; Download Demo File
        </a>
      </div>

      <div>
        <h1>Upload Activity File</h1>
        <input type="file" accept=".txt" onChange={handleFileChange} />

        {isLoading && <LoadingMessage />} {/* Use the loading message */}

        <div><br></br></div>

        {/* Filter section moved above the table */}
        <h2>Filter:</h2>
        <div className={styles.filters}>
          <select
            value={filters.column1}
            onChange={(e) => handleFilterChange('column1', e.target.value)}
          >
            <option value="">All Dates</option>
            {filteredContent.map((row, index) => (
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

        {pages.length > 0 && (
          <>
            <div className={styles.pageNavigation}>
              <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {pages.length}</span>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                Next
              </button>
            </div>

            <h2>Activity Logs</h2>
            <table border="1" className={styles.table}>
              <thead>
                <tr>
                  {headerColumns.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
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
          </>
        )}
      </div>
    </main>
  );
}
