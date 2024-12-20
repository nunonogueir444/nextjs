"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../page.module.css';

//##############################################################################
//##############################################################################
//##############################################################################

export default function EditPAR() {
  const router = useRouter();
  const pathname = usePathname();
  const [tableHeaders, setTableHeaders] = useState(Array(13).fill(''));
  const [firstColumnData, setFirstColumnData] = useState(Array(1500).fill(''));

  const handleBlur = (event) => {
    event.target.blur();
  };

  const loadDecodeFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n');

        // Set headers from first line
        const headers = lines[0].split(';');
        setTableHeaders(headers.slice(0, 13).map(h => h.trim()));

        // Set first column data from remaining lines
        const columnData = lines.slice(1).map(line => {
          const values = line.split(';');
          return values[0] || '';
        });
        setFirstColumnData(columnData);
      };
      reader.readAsText(file);
    }
  };

  const generateTableRows = () => {
    const rows = [];
    for (let i = 0; i < 1500; i++) {
      rows.push(
        <tr key={i}>
          {Array.from({ length: 13 }).map((_, index) => (
            <td key={index}>{index === 0 ? firstColumnData[i] : ''}</td>
          ))}
        </tr>
      );
    }
    return rows;
  };
//##############################################################################

//##############################################################################







//##############################################################################
//##############################################################################
//##############################################################################

    return (
      <div>
        <main className={styles.main} style={{ overflowX: 'auto' }}>
{/*##########################################################################*/}
        <div className={styles.navigationButtons}>
          <button
            className={`${styles.navigationButton} ${pathname === '/' ? styles.active : ''}`}
            onClick={() => router.push('/')}
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
              //loadPARFile(e);
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


        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {generateTableRows()}
            </tbody>
          </table>
        </div>


{/*##########################################################################*/}













{/*##########################################################################*/}
      </main>
    </div>
  );
}