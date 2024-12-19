"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../page.module.css';

export default function EditPAR() {
  const router = useRouter();
  const pathname = usePathname();

    const handleBlur = (event) => {
    event.target.blur();
  };

  // Generate table data
  const generateTableData = () => {
    const data = [];
    for (let i = 1; i <= 1500; i++) {
      const row = {
        id: i,
        number: i,
        ...Array(18).fill('').reduce((acc, _, index) => {
          acc[`col${index + 3}`] = '';
          return acc;
        }, {})
      };
      data.push(row);
    }
    return data;
  };

  const [tableValues, setTableValues] = useState({});

  const DINT_MIN = -2147483648;
  const DINT_MAX = 2147483647;
  const handleCellChange = (rowId, colIndex, value) => {
    if (value === '' || (/^\d*$/.test(value) && 
        Number(value) >= DINT_MIN && 
        Number(value) <= DINT_MAX)) {
      setTableValues(prev => ({
        ...prev,
        [`${rowId}-${colIndex}`]: value
      }));
    }
  };

  const tableData = generateTableData();

//##############################################################################
//##############################################################################
//##############################################################################

    return (
      <div>
        <main className={styles.main} style={{ overflowX: 'auto' }}>
{/*##########################################################################*/}
        <div className={styles.navigationButtons}>
          <button
            className={`${styles.navigationButton} ${pathname === '/Activities' ? styles.active : ''}`}
            onClick={() => router.push('/Activities')}
          >
            Activities
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/Faults' ? styles.active : ''}`}
            onClick={() => router.push('/Faults')}
          >
            Faults
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/EditPAR' ? styles.active : ''}`}
            onClick={() => router.push('/EditPAR')}
          >
            Edit PAR
          </button>
          <button
            className={`${styles.navigationButton} ${pathname === '/CreateDemoFile' ? styles.active : ''}`}
            onClick={() => router.push('/CreateDemoFile')}
          >
            Create Demo File
          </button>
          <div className={styles.brandingContainer}>
            <h5>v1.0 @nunonogueir444</h5>
            <div className={styles.poweredBy}>
              <span>Powered by:&nbsp;&nbsp;</span>
              <img
                src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png"
                alt="Next.js Logo"
                className={`${styles.techLogo} ${styles.nextLogo} ${styles.glow}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                alt="React Logo"
                className={`${styles.techLogo} ${styles.reactLogo}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                alt="JavaScript Logo"
                className={`${styles.techLogo} ${styles.jsLogo}`}
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"
                alt="CSS Logo"
                className={`${styles.techLogo} ${styles.cssLogo}`}
              />
              <img
                src="https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"
                alt="HTML Logo"
                className={`${styles.techLogo} ${styles.htmlLogo}`}
              />
            </div>
          </div>
        </div>
{/*##########################################################################*/}
        <div className={styles.logsLabel}>
          <label>Edit PAR</label>
        </div>
{/*##########################################################################*/}
        <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load PAR File:
              </label>
          </div>
          <div>
            <input
            type="file"
            accept=".clp"
            onChange={(e) => {
              loadPARFile(e);
              handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none',
            }}
            />
          </div>
        </div>
        <div className={styles.inputContainer}
          onClick={(e) => {
              handleBlur(e);
          }}>
          <div>
            <label>Load Decode File:
              </label>
          </div>
          <div>
            <input
            type="file"
            accept=".dec"
            onChange={(e) => {
              loadDecodeFile(e);
              handleBlur(e);
            }}
            style={{
              width: '800px',
              maxWidth: 'none',
            }}
            />
          </div>
        </div>
{/*##########################################################################*/}




<table style={{ borderCollapse: 'collapse', margin: '20px 0' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #ddd', padding: '4px' }}>1</th>
      <th style={{ border: '1px solid #ddd', padding: '4px' }}>2</th>
      {Array(18).fill(0).map((_, index) => (
        <th key={index} style={{ border: '1px solid #ddd', padding: '4px' }}>
          {index + 3}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
      {tableData.map((row) => (
        <tr key={row.id}>
          <td style={{ border: '1px solid #ddd', padding: '4px' }}></td>
          <td style={{ border: '1px solid #ddd', padding: '4px' }}>{row.number}</td>
          {Array(18).fill(0).map((_, index) => (
            <td key={index} style={{ border: '1px solid #ddd', padding: '4px' }}>
              {index < 11 ? (
                <input
                  type="text"
                  value={tableValues[`${row.id}-${index}`] || ''}
                  onChange={(e) => handleCellChange(row.id, index, e.target.value)}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  maxLength={10}
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: '2px',
                    background: 'transparent'
                  }}
                />
              ) : (
                row[`col${index + 3}`]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
</table>











{/*##########################################################################*/}
      </main>
    </div>
  );
}