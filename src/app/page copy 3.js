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
    '0 Generic Op.',
    '1 Low Op.',
    '2 Standard Op.',
    '3 High Op.',
    '4 Service Op.',
    '5 Manager Op.',
    '6 Dealer Op.',
    '7 Combilift Op.',
    '8 Developer Op.'
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
    if (file && (file.type === 'text/plain' || file.name.endsWith('.log'))) {
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

      reader.onerror = () => {
        alert('Error reading file. Please try again.');
        setIsLoading(false);
      };

      setIsLoading(true);
    } else {
      alert('Please upload a valid .log file');
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
            if (trimmedValue === '0') return '0 Generic Op.';
            if (trimmedValue === '1') return '1 Low Op.';
            if (trimmedValue === '2') return '2 Standard Op.';
            if (trimmedValue === '3') return '3 High Op.';
            if (trimmedValue === '4') return '4 Service Op.';
            if (trimmedValue === '5') return '5 Manager Op.';
            if (trimmedValue === '6') return '6 Dealer Op.';
            if (trimmedValue === '7') return '7 Combilift Op.';
            if (trimmedValue === '8') return '8 Developer Op.';
          }
          if (valueIndex === 2) {
            if (trimmedValue === '101') return 'first service reset';
            if (trimmedValue === '102') return 'standard service reset ';
            if (trimmedValue === '103') return 'full service reset';
            if (trimmedValue === '104') return 'first service interval is changed';
            if (trimmedValue === '105') return 'standard service interval is changed';
            if (trimmedValue === '106') return 'full service interval is changed';
            if (trimmedValue === '107') return 'confirm button is pressed';
            if (trimmedValue === '204') return 'Time/Date updated';
            if (trimmedValue === '206') return 'Export Logs';
            if (trimmedValue === '207') return 'Import new Parameters';
            if (trimmedValue === '208') return 'Export Parameters';
            if (trimmedValue === '209') return 'MOCAS_HI_LEVEL_SUCCESS';
            if (trimmedValue === '210') return 'MOCAS_HI_LEVEL_FAIL';
            if (trimmedValue === '211') return 'MOCAS_HOURMETER_SUCCESS';
            if (trimmedValue === '212') return 'MOCAS_HOURMETER_FAIL';
            if (trimmedValue === '213') return 'MOCAS_OTHER_MODULE_SUCCESS';
            if (trimmedValue === '214') return 'MOCAS_OTHER_MODULE_FAIL';
            if (trimmedValue === '215') return 'Read new Text List';
            if (trimmedValue === '216') return 'Export Text Lists';
            if (trimmedValue === '217') return 'Export Backup Files';
            if (trimmedValue === '220') return 'Hourmeters Mismatch Popup Screen';
            if (trimmedValue === '221') return 'Hourmeters Mismatch Popup Pump';
            if (trimmedValue === '222') return 'Hourmeters Mismatch Sync Screen';
            if (trimmedValue === '229') return 'OS Screen version';
            if (trimmedValue === '230') return 'PLC App version';
            if (trimmedValue === '231') return 'PLC RTS version';
            if (trimmedValue === '232') return 'Screen version';
            if (trimmedValue === '233') return 'Pump VCL App Version';
            if (trimmedValue === '234') return 'Pump OS/Profile version';
            if (trimmedValue === '235') return 'Pump App version';
            if (trimmedValue === '236') return 'TRR VCL App Version';
            if (trimmedValue === '237') return 'TRR OS/Profile version';
            if (trimmedValue === '238') return 'TRR App version';
            if (trimmedValue === '239') return 'TRL VCL App Version';
            if (trimmedValue === '240') return 'TRL OS/Profile version';
            if (trimmedValue === '241') return 'TRL App version';
            if (trimmedValue === '242') return 'TFR VCL App Version';
            if (trimmedValue === '243') return 'TFR OS/Profile version';
            if (trimmedValue === '244') return 'TFR App version';
            if (trimmedValue === '245') return 'TFL VCL App Version';
            if (trimmedValue === '246') return 'TFL OS/Profile version';
            if (trimmedValue === '247') return 'TFL App version';
            if (trimmedValue === '248') return 'SRR OS/Profile versions';
            if (trimmedValue === '249') return 'SRL OS/Profile versions';
            if (trimmedValue === '250') return 'SFR OS/Profile versions';
            if (trimmedValue === '251') return 'SFL OS/Profile versions';
            if (trimmedValue === '252') return 'Pump HW info';
            if (trimmedValue === '253') return 'TRR HW info';
            if (trimmedValue === '254') return 'TRL HW info';
            if (trimmedValue === '255') return 'TFR HW info';
            if (trimmedValue === '256') return 'TFL HW info';
            if (trimmedValue === '257') return 'SRR HW info';
            if (trimmedValue === '258') return 'SRL HW info';
            if (trimmedValue === '259') return 'SFR HW info';
            if (trimmedValue === '260') return 'SFL HW info';
            if (trimmedValue === '401') return 'Pre-check done';
            if (trimmedValue === '402') return 'Drivers Presence changed';
            if (trimmedValue === '501') return 'Parameter Value Change';
            if (trimmedValue === '502') return 'Parameter Value Change when Download Par from the Controllers';
            if (trimmedValue === '701') return 'Download PAR from the Controllers';
            if (trimmedValue === '702') return 'Upload PAR to the Controllers';
            if (trimmedValue === '703') return 'Save Current PAR to Defaults';
            if (trimmedValue === '704') return 'Retrieving data. Wait a few seconds and try to cut or copy again.';
            if (trimmedValue === '705') return 'Load PAR Defaults';
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

//##############################################################################
//##############################################################################
//##############################################################################

  return (
    <main className={styles.main}>
      <div>
        <a href="/demoFile.log" download="demoFile.log">
          &nbsp;&nbsp;&nbsp;&nbsp; Download Demo File
        </a>
      </div>

      <div>
        <h1>Upload Activity File</h1>
        <input type="file" accept=".log" onChange={handleFileChange} />

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
            <h2>Activity Logs</h2>
            <div className={styles.pageNavigation}>
              <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {pages.length}</span>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                Next
              </button>
            </div>

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

            <div className={styles.pageNavigation}>
              <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {pages.length}</span>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
