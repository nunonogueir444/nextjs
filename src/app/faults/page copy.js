"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

const LoadingMessage = () => (
  <div className={styles.loadingMessage}>
    Loading file, please wait...
  </div>
);

export default function Home() {

  const router = useRouter();
  const [fileContent, setFileContent] = useState('');
  const [pages, setPages] = useState([]);
  const [originalPages, setOriginalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    column7: '',
    column8: '',
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  const column4Values = [
    'FAULT',
  ];

  const column5Values = [
    'PLC',
    'TRR',
    'TRL',
    'TFR',
    'TFL',
    'SRR',
    'SRL',
    'SFR',
    'SFL',
    'Pump'
  ];

  const column6Values = [
    //'100 > Connection Fault',
    '8449 - 13-2 - Phase PWM Mismatch',
    '8450 - 3-11 - Misalignment Error',
    '8451 - 3-10 - Motor Setup Needed',
    '8452 - 13-1 - Lift Input',
    '8453 - 13-4 - Lower Input',
    '8454 - 12-7 - Analog 31 Out of Range',
    '8455 - 12-8 - Invalid CAN Port',
    '8456 - 12-9 - VCL Watchdog',
    '8457 - 1-11 - Critical OS General',
    '8458 - 1-12 - OS General 2',
    '8459 - 12-4 - Torque Input',
    '8460 - 12-13 - PWM Input 28 Out of Range',
    '8461 - 12-12 - PWM Input 29 Out of Range',
    '8462 - 1-14 - Motor Short',
    '8463 - 12-15 - Force Feedback Fault',
    '8464 - 1-13 - Reset Rejected',
    '8465 - 12-10 - Auto Baud Failure On Ancillary',
    '8466 - 13-0 - Steering Traction Msg Count',
    '8467 - 12-11 - Primary State Error',
    '8468 - 13-13 - IMU Failure',
    '8470 - 13-0 - Delayed Shutdown',
    '8471 - 8-0 - Secondary Command Input',
    '8472 - 8-1 - Secondary Feedback Input',
    '8474 - 8-4 - Motor Braking Impaired',
    '8476 - 13-6 - Hazardous Movement',
    '8477 - 8-3 - Lv Supply Pos Out Of Range',
    '8480 - 1-7 - Severe B+ Undervoltage',
    '8481 - 2-3 - Undervoltage Cutback',
    '8482 - 1-7 - Severe KSI Undervoltage',
    '8484 - 4-7 - Hydraulic HPD SRO Lower',
    '8485 - 4-7 - Hydraulic HPD SRO Lift',
    '8486 - 4-7 - LHS Throttle Conflict',
    '8487 - 13-10 - Lift Limit',
    '8490 - 15-1 - Memory Parity',
    '8496 - 1-8 - Severe B+ Overvoltage',
    '8497 - 2-4 - Overvoltage Cutback',
    '8498 - 1-8 - Severe KSI Overvoltage',
    '8499 - 1-9 - Speed Limit Supervision',
    '8500 - 1-10 - Motor Not Stopped',
    '8512 - 2-2 - Controller Overtemperature Cutback',
    '8513 - 1-5 - Controller Severe Undertemperature',
    '8514 - 1-6 - Controller Severe Overtemperature',
    '8528 - 2-9 - Motor Temp Sensor',
    '8529 - 2-8 - Motor Temp Hot Cutback',
    '8544 - 10-1 - Driver 1 Fault',
    '8545 - 10-2 - Driver 2 Fault',
    '8546 - 10-3 - Driver 3 Fault',
    '8547 - 10-4 - Driver 4 Fault',
    '8548 - 10-5 - Driver 5 Fault',
    '8549 - 10-6 - Driver 6 Fault',
    '8550 - 10-7 - Driver 7 Fault',
    '8553 - 10-9 - Coil Supply',
    '8720 - 4-2 - Throttle Input',
    '8721 - 4-7 - HPD Sequencing',
    '8736 - 3-8 - Main Contactor Welded',
    '8737 - 3-9 - Main Contactor Did Not Close',
    '8738 - 3-1 - Main Driver',
    '8739 - 1-4 - Precharge Failed',
    '8752 - 3-6 - IM Motor Feedback',
    '8753 - 7-3 - Stall Detected',
    '8754 - 3-6 - Sin Cos Motor Feedback',
    '8755 - 9-3 - Encoder LOS',
    '8756 - 8-8 - Encoder Pulse Error',
    '8768 - 3-7 - Motor Open',
    '8784 - 7-6 - Dual Severe',
    '8785 - 7-4 - Fault On Other Traction Controller Active',
    '8786 - 4-5 - Steer Angle Input',
    '8787 - 7-2 - Dual Pdo Timeout',
    '8800 - 4-8 - Following Error',
    '8832 - 13-5 - Primary Command Input',
    '8848 - 13-7 - Primary Feedback Input',
    '8864 - 7-7 - Steering Supervision Error',
    '8865 - 7-7 - Home Switch Supervision',
    '8866 - 7-7 - Interlock Input Conflict',
    '8867 - 7-7 - Steer Command Supervision',
    '8868 - 7-7 - Wheel Position Supervision',
    '8869 - 7-7 - Home Position Not Found',
    '8870 - 7-7 - Home Reference Tolerance',
    '8871 - 10-4 - Steering Safety Output Failed',
    '8976 - 4-4 - Brake Input',
    '8992 - 3-2 - EM Brake Driver',
    '8993 - 9-2 - EM Brake Failed to Set',
    '9008 - 9-4 - Emer Rev Timeout',
    '9009 - 4-7 - Emer Rev HPD',
    '9010 - 9-10 - Interlock Braking Supervision',
    '9011 - 9-11 - EMR Supervision',
    '9248 - 3-3 - Pump Driver',
    '9264 - 3-4 - Load Hold Driver',
    '9280 - 3-5 - Lower Driver',
    '9296 - 9-6 - Pump BDI',
    '9488 - 1-2 - Controller Overcurrent',
    '9504 - 9-5 - Pump Overcurrent',
    '9521 - 2-5 - Ext 5V Supply Failure',
    '9522 - 2-6 - Ext 12V Supply Failure',
    '9537 - 7-2 - PDO Timeout',
    '9538 - 8-2 - PDO Mapping Error',
    '9552 - 7-6 - Insulation Resistance Low',
    '9760 - 11-1 - Analog 1 Out Of Range',
    '9761 - 11-2 - Analog 2 Out Of Range',
    '9762 - 11-3 - Analog 3 Out Of Range',
    '9763 - 11-4 - Analog 4 Out Of Range',
    '9764 - 11-5 - Analog 5 Out Of Range',
    '9765 - 11-6 - Analog 6 Out Of Range',
    '9766 - 11-7 - Analog 7 Out Of Range',
    '9767 - 11-8 - Analog 8 Out Of Range',
    '9768 - 11-9 - Analog 9 Out of Range',
    '9769 - 12-5 - PWM Input 10 Out of Range',
    '9770 - 11-11 - Analog 14 Out Of Range',
    '9771 - 11-13 - Analog 18 Out of range',
    '9772 - 11-14 - Analog 19 Out of range',
    '9773 - 12-6 - Pwm Input 17 Out Of Range',
    '9777 - 11-12 - Analog Assignment',
    '9778 - 10-8 - Driver Assignment',
    '10257 - 8-9 - Parameter Out of Range',
    '10258 - 9-9 - Parameter Mismatch',
    '10259 - 4-9 - Parameter Change',
    '10261 - 9-1 - Bad Firmware',
    '10263 - 4-10 - EMR Switch',
    '10272 - 6-8 - VCL Run Time Error',
    '10288 - 4-6 - NV Memory Failure',
    '10289 - 7-1 - OS General',
    '10290 - 1-3 - Current Sensor',
    '10291 - 9-7 - Pump Hardware',
    '10292 - 11-15 - Pump Current Sensor',
    '10293 - 8-3 - Internal Hardware',
    '10304 - 7-7 - Supervision',
    '10305 - 7-9 - Supervision Input Check',
    '10320 - 8-7 - Motor Characterization',
    '10336 - 12-1 - Branding Error',
    '10337 - 12-2 - BMS Cutback',
    '10338 - 12-3 - Differential Steering',
    '10352 - 13-3 - Hardware Compatibility',
    '10353 - 6-8 - ECC Run Time Error',
    '10384 - 14-14 - Eru Configuration',
    '10385 - 14-15 - Desat Trip',
    '10386 - 13-8 - ESTOP_Mismatch',
    '10387 - 13-9 - ESTOP_SRO',
    '99999 - Generic Fault',
    '10000 - 5-1 - User 1 Fault',
    '10001 - 5-2 - User 2 Fault',
    '10002 - 5-3 - User 3 Fault',
    '10003 - 5-4 - User 4 Fault',
    '10016 - 5-5 - User 5 Fault',
    '10017 - 5-6 - User 6 Fault',
    '10018 - 5-7 - User 7 Fault',
    '10019 - 5-8 - User 8 Fault',
    '10032 - 5-9 - User 9 Fault',
    '10033 - 6-1 - User 10 Fault',
    '10034 - 6-2 - User 11 Fault',
    '10035 - 6-3 - User 12 Fault',
    '10048 - 6-4 - User 13 Fault',
    '10049 - 6-5 - User 14 Fault',
    '10050 - 6-6 - User 15 Fault',
    '10051 - 6-7 - User 16 Fault',
    '10064 - 5-10 - User 17 Fault',
    '10065 - 5-11 - User 18 Fault',
    '10066 - 5-12 - User 19 Fault',
    '10067 - 5-13 - User 20 Fault',
    '10080 - 5-14 - User 21 Fault',
    '10081 - 5-15 - User 22 Fault',
    '10082 - 6-10 - User 23 Fault',
    '10083 - 6-11 - User 24 Fault',
    '10096 - 6-12 - User 25 Fault',
    '10097 - 6-13 - User 26 Fault',
    '10098 - 6-14 - User 27 Fault',
    '10099 - 6-15 - User 28 Fault',
    '10112 - 7-10 - User 29 Fault',
    '10113 - 7-11 - User 30 Fault',
    '10114 - 7-12 - User 31 Fault',
    '10115 - 7-13 - User 32 Fault'
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

        let dataLines = lines.slice(1);

        dataLines.forEach(line => {
          if (!line.trim()) return;

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
        setOriginalPages(filePages);
        setFileContent(content);
        setIsLoading(false);
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

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(pages.length - 1);
  };

  const currentPageContent = pages[currentPage] || '';

  const handleFilterChange = (column, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [column]: value
    }));
  };

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleResetDateFilter = () => {
    setStartDate('');
    setEndDate('');
  };

  const [sortDirection, setSortDirection] = useState('desc');

  const formatDate = (date) => {
    if (!(date instanceof Date)) return date;
    const pad = (num) => String(num).padStart(2, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  };

  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const allContent = pages
      .join('\n')
      .split('\n')
      .filter(line => line.trim() !== '')
      .map((line) => {
        //const values = line.split(';');
        const trimmedLine = line.replace(/;$/, ''); // Remove trailing semicolon
        const values = trimmedLine.split(';');

        if (values.length === 8) {
          const updatedValues = values.map((value, valueIndex) => {
            const trimmedValue = value.trim();
            if (valueIndex === 0) {
              const epoch = parseInt(trimmedValue, 10);
              if (!isNaN(epoch)) {
                return new Date(epoch * 1000);
              }
            }
            return value;
          });
          return updatedValues;
        }
        return null;
      })
      .filter(row => row !== null);

    allContent.sort((a, b) => {
      const dateA = a[0] instanceof Date ? a[0].getTime() : 0;
      const dateB = b[0] instanceof Date ? b[0].getTime() : 0;
      return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const newPages = [];
    let currentChunk = '';
    let currentSize = 0;

    allContent.forEach(row => {
      const displayRow = [...row];
      if (displayRow[0] instanceof Date) {
        displayRow[0] = Math.floor(displayRow[0].getTime() / 1000);
      }

      const line = displayRow.join(';') + '\n';
      const lineSize = new Blob([line]).size;

      if (currentSize + lineSize > chunkSize) {
        newPages.push(currentChunk);
        currentChunk = line;
        currentSize = lineSize;
      } else {
        currentChunk += line;
        currentSize += lineSize;
      }
    });

    if (currentChunk) {
      newPages.push(currentChunk);
    }

    setPages(newPages);
    setCurrentPage(0);
  };

  const handleResetSort = () => {
    setPages(originalPages);
    setSortDirection('desc');
    setCurrentPage(0);
  };

  const filteredContent = currentPageContent
    .split('\n')
    .filter(line => line.trim() !== '')
    .map((line) => {
      //const values = line.split(';');
      const trimmedLine = line.replace(/;$/, ''); // Remove trailing semicolon
      const values = trimmedLine.split(';');

      if (values.length === 8) {
        const updatedValues = values.map((value, valueIndex) => {
          const trimmedValue = value.trim();
          if (valueIndex === 0) {
            const epoch = parseInt(trimmedValue, 10);
            if (!isNaN(epoch)) {
              return new Date(epoch * 1000);
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
          if (valueIndex === 3 ) {
            if (trimmedValue === '601') return 'FAULT';
          }
          if (valueIndex === 4 ) {
            if (trimmedValue === '2') return 'SRR';
            if (trimmedValue === '3') return 'SRL';
            if (trimmedValue === '4') return 'SFR';
            if (trimmedValue === '5') return 'SFL';
            if (trimmedValue === '36') return 'TRR';
            if (trimmedValue === '37') return 'TRL';
            if (trimmedValue === '38') return 'TFR';
            if (trimmedValue === '39') return 'TFL';
            if (trimmedValue === '40') return 'Pump';
            if (trimmedValue === '50') return 'PLC';
          }
          if (valueIndex === 5 ) {
            //if (trimmedValue === '100' ) return '100 > Connection Fault';
            if (trimmedValue === '8449') return '8449 > 13-2 - Phase PWM Mismatch';
            if (trimmedValue === '8450') return '8450 > 3-11 - Misalignment Error';
            if (trimmedValue === '8451') return '8451 > 3-10 - Motor Setup Needed';
            if (trimmedValue === '8452') return '8452 > 13-1 - Lift Input';
            if (trimmedValue === '8453') return '8453 > 13-4 - Lower Input';
            if (trimmedValue === '8454') return '8454 > 12-7 - Analog 31 Out of Range';
            if (trimmedValue === '8455') return '8455 > 12-8 - Invalid CAN Port';
            if (trimmedValue === '8456') return '8456 > 12-9 - VCL Watchdog';
            if (trimmedValue === '8457') return '8457 > 1-11 - Critical OS General';
            if (trimmedValue === '8458') return '8458 > 1-12 - OS General 2';
            if (trimmedValue === '8459') return '8459 > 12-4 - Torque Input';
            if (trimmedValue === '8460') return '8460 > 12-13 - PWM Input 28 Out of Range';
            if (trimmedValue === '8461') return '8461 > 12-12 - PWM Input 29 Out of Range';
            if (trimmedValue === '8462') return '8462 > 1-14 - Motor Short';
            if (trimmedValue === '8463') return '8463 > 12-15 - Force Feedback Fault';
            if (trimmedValue === '8464') return '8464 > 1-13 - Reset Rejected';
            if (trimmedValue === '8465') return '8465 > 12-10 - Auto Baud Failure On Ancillary';
            if (trimmedValue === '8466') return '8466 > 13-0 - Steering Traction Msg Count';
            if (trimmedValue === '8467') return '8467 > 12-11 - Primary State Error';
            if (trimmedValue === '8468') return '8468 > 13-13 - IMU Failure';
            if (trimmedValue === '8470') return '8470 > 13-0 - Delayed Shutdown';
            if (trimmedValue === '8471') return '8471 > 8-0 - Secondary Command Input';
            if (trimmedValue === '8472') return '8472 > 8-1 - Secondary Feedback Input';
            if (trimmedValue === '8474') return '8474 > 8-4 - Motor Braking Impaired';
            if (trimmedValue === '8476') return '8476 > 13-6 - Hazardous Movement';
            if (trimmedValue === '8477') return '8477 > 8-3 - Lv Supply Pos Out Of Range';
            if (trimmedValue === '8480') return '8480 > 1-7 - Severe B+ Undervoltage';
            if (trimmedValue === '8481') return '8481 > 2-3 - Undervoltage Cutback';
            if (trimmedValue === '8482') return '8482 > 1-7 - Severe KSI Undervoltage';
            if (trimmedValue === '8484') return '8484 > 4-7 - Hydraulic HPD SRO Lower';
            if (trimmedValue === '8485') return '8485 > 4-7 - Hydraulic HPD SRO Lift';
            if (trimmedValue === '8486') return '8486 > 4-7 - LHS Throttle Conflict';
            if (trimmedValue === '8487') return '8487 > 13-10 - Lift Limit';
            if (trimmedValue === '8490') return '8490 > 15-1 - Memory Parity';
            if (trimmedValue === '8496') return '8496 > 1-8 - Severe B+ Overvoltage';
            if (trimmedValue === '8497') return '8497 > 2-4 - Overvoltage Cutback';
            if (trimmedValue === '8498') return '8498 > 1-8 - Severe KSI Overvoltage';
            if (trimmedValue === '8499') return '8499 > 1-9 - Speed Limit Supervision';
            if (trimmedValue === '8500') return '8500 > 1-10 - Motor Not Stopped';
            if (trimmedValue === '8512') return '8512 > 2-2 - Controller Overtemperature Cutback';
            if (trimmedValue === '8513') return '8513 > 1-5 - Controller Severe Undertemperature';
            if (trimmedValue === '8514') return '8514 > 1-6 - Controller Severe Overtemperature';
            if (trimmedValue === '8528') return '8528 > 2-9 - Motor Temp Sensor';
            if (trimmedValue === '8529') return '8529 > 2-8 - Motor Temp Hot Cutback';
            if (trimmedValue === '8544') return '8544 > 10-1 - Driver 1 Fault';
            if (trimmedValue === '8545') return '8545 > 10-2 - Driver 2 Fault';
            if (trimmedValue === '8546') return '8546 > 10-3 - Driver 3 Fault';
            if (trimmedValue === '8547') return '8547 > 10-4 - Driver 4 Fault';
            if (trimmedValue === '8548') return '8548 > 10-5 - Driver 5 Fault';
            if (trimmedValue === '8549') return '8549 > 10-6 - Driver 6 Fault';
            if (trimmedValue === '8550') return '8550 > 10-7 - Driver 7 Fault';
            if (trimmedValue === '8553') return '8553 > 10-9 - Coil Supply';
            if (trimmedValue === '8720') return '8720 > 4-2 - Throttle Input';
            if (trimmedValue === '8721') return '8721 > 4-7 - HPD Sequencing';
            if (trimmedValue === '8736') return '8736 > 3-8 - Main Contactor Welded';
            if (trimmedValue === '8737') return '8737 > 3-9 - Main Contactor Did Not Close';
            if (trimmedValue === '8738') return '8738 > 3-1 - Main Driver';
            if (trimmedValue === '8739') return '8739 > 1-4 - Precharge Failed';
            if (trimmedValue === '8752') return '8752 > 3-6 - IM Motor Feedback';
            if (trimmedValue === '8753') return '8753 > 7-3 - Stall Detected';
            if (trimmedValue === '8754') return '8754 > 3-6 - Sin Cos Motor Feedback';
            if (trimmedValue === '8755') return '8755 > 9-3 - Encoder LOS';
            if (trimmedValue === '8756') return '8756 > 8-8 - Encoder Pulse Error';
            if (trimmedValue === '8768') return '8768 > 3-7 - Motor Open';
            if (trimmedValue === '8784') return '8784 > 7-6 - Dual Severe';
            if (trimmedValue === '8785') return '8785 > 7-4 - Fault On Other Traction Controller Active';
            if (trimmedValue === '8786') return '8786 > 4-5 - Steer Angle Input';
            if (trimmedValue === '8787') return '8787 > 7-2 - Dual Pdo Timeout';
            if (trimmedValue === '8800') return '8800 > 4-8 - Following Error';
            if (trimmedValue === '8832') return '8832 > 13-5 - Primary Command Input';
            if (trimmedValue === '8848') return '8848 > 13-7 - Primary Feedback Input';
            if (trimmedValue === '8864') return '8864 > 7-7 - Steering Supervision Error';
            if (trimmedValue === '8865') return '8865 > 7-7 - Home Switch Supervision';
            if (trimmedValue === '8866') return '8866 > 7-7 - Interlock Input Conflict';
            if (trimmedValue === '8867') return '8867 > 7-7 - Steer Command Supervision';
            if (trimmedValue === '8868') return '8868 > 7-7 - Wheel Position Supervision';
            if (trimmedValue === '8869') return '8869 > 7-7 - Home Position Not Found';
            if (trimmedValue === '8870') return '8870 > 7-7 - Home Reference Tolerance';
            if (trimmedValue === '8871') return '8871 > 10-4 - Steering Safety Output Failed';
            if (trimmedValue === '8976') return '8976 > 4-4 - Brake Input';
            if (trimmedValue === '8992') return '8992 > 3-2 - EM Brake Driver';
            if (trimmedValue === '8993') return '8993 > 9-2 - EM Brake Failed to Set';
            if (trimmedValue === '9008') return '9008 > 9-4 - Emer Rev Timeout';
            if (trimmedValue === '9009') return '9009 > 4-7 - Emer Rev HPD';
            if (trimmedValue === '9010') return '9010 > 9-10 - Interlock Braking Supervision';
            if (trimmedValue === '9011') return '9011 > 9-11 - EMR Supervision';
            if (trimmedValue === '9248') return '9248 > 3-3 - Pump Driver';
            if (trimmedValue === '9264') return '9264 > 3-4 - Load Hold Driver';
            if (trimmedValue === '9280') return '9280 > 3-5 - Lower Driver';
            if (trimmedValue === '9296') return '9296 > 9-6 - Pump BDI';
            if (trimmedValue === '9488') return '9488 > 1-2 - Controller Overcurrent';
            if (trimmedValue === '9504') return '9504 > 9-5 - Pump Overcurrent';
            if (trimmedValue === '9521') return '9521 > 2-5 - Ext 5V Supply Failure';
            if (trimmedValue === '9522') return '9522 > 2-6 - Ext 12V Supply Failure';
            if (trimmedValue === '9537') return '9537 > 7-2 - PDO Timeout';
            if (trimmedValue === '9538') return '9538 > 8-2 - PDO Mapping Error';
            if (trimmedValue === '9552') return '9552 > 7-6 - Insulation Resistance Low';
            if (trimmedValue === '9760') return '9760 > 11-1 - Analog 1 Out Of Range';
            if (trimmedValue === '9761') return '9761 > 11-2 - Analog 2 Out Of Range';
            if (trimmedValue === '9762') return '9762 > 11-3 - Analog 3 Out Of Range';
            if (trimmedValue === '9763') return '9763 > 11-4 - Analog 4 Out Of Range';
            if (trimmedValue === '9764') return '9764 > 11-5 - Analog 5 Out Of Range';
            if (trimmedValue === '9765') return '9765 > 11-6 - Analog 6 Out Of Range';
            if (trimmedValue === '9766') return '9766 > 11-7 - Analog 7 Out Of Range';
            if (trimmedValue === '9767') return '9767 > 11-8 - Analog 8 Out Of Range';
            if (trimmedValue === '9768') return '9768 > 11-9 - Analog 9 Out of Range';
            if (trimmedValue === '9769') return '9769 > 12-5 - PWM Input 10 Out of Range';
            if (trimmedValue === '9770') return '9770 > 11-11 - Analog 14 Out Of Range';
            if (trimmedValue === '9771') return '9771 > 11-13 - Analog 18 Out of range';
            if (trimmedValue === '9772') return '9772 > 11-14 - Analog 19 Out of range';
            if (trimmedValue === '9773') return '9773 > 12-6 - Pwm Input 17 Out Of Range';
            if (trimmedValue === '9777') return '9777 > 11-12 - Analog Assignment';
            if (trimmedValue === '9778') return '9778 > 10-8 - Driver Assignment';
            if (trimmedValue === '10257') return '10257 > 8-9 - Parameter Out of Range';
            if (trimmedValue === '10258') return '10258 > 9-9 - Parameter Mismatch';
            if (trimmedValue === '10259') return '10259 > 4-9 - Parameter Change';
            if (trimmedValue === '10261') return '10261 > 9-1 - Bad Firmware';
            if (trimmedValue === '10263') return '10263 > 4-10 - EMR Switch';
            if (trimmedValue === '10272') return '10272 > 6-8 - VCL Run Time Error';
            if (trimmedValue === '10288') return '10288 > 4-6 - NV Memory Failure';
            if (trimmedValue === '10289') return '10289 > 7-1 - OS General';
            if (trimmedValue === '10290') return '10290 > 1-3 - Current Sensor';
            if (trimmedValue === '10291') return '10291 > 9-7 - Pump Hardware';
            if (trimmedValue === '10292') return '10292 > 11-15 - Pump Current Sensor';
            if (trimmedValue === '10293') return '10293 > 8-3 - Internal Hardware';
            if (trimmedValue === '10304') return '10304 > 7-7 - Supervision';
            if (trimmedValue === '10305') return '10305 > 7-9 - Supervision Input Check';
            if (trimmedValue === '10320') return '10320 > 8-7 - Motor Characterization';
            if (trimmedValue === '10336') return '10336 > 12-1 - Branding Error';
            if (trimmedValue === '10337') return '10337 > 12-2 - BMS Cutback';
            if (trimmedValue === '10338') return '10338 > 12-3 - Differential Steering';
            if (trimmedValue === '10352') return '10352 > 13-3 - Hardware Compatibility';
            if (trimmedValue === '10353') return '10353 > 6-8 - ECC Run Time Error';
            if (trimmedValue === '10384') return '10384 > 14-14 - Eru Configuration';
            if (trimmedValue === '10385') return '10385 > 14-15 - Desat Trip';
            if (trimmedValue === '10386') return '10386 > 13-8 - ESTOP_Mismatch';
            if (trimmedValue === '10387') return '10387 > 13-9 - ESTOP_SRO';
            if (trimmedValue === '99999') return '99999 > Generic Fault';
            if (trimmedValue === '10000') return '10000 > 5-1 - User 1 Fault';
            if (trimmedValue === '10001') return '10001 > 5-2 - User 2 Fault';
            if (trimmedValue === '10002') return '10002 > 5-3 - User 3 Fault';
            if (trimmedValue === '10003') return '10003 > 5-4 - User 4 Fault';
            if (trimmedValue === '10016') return '10016 > 5-5 - User 5 Fault';
            if (trimmedValue === '10017') return '10017 > 5-6 - User 6 Fault';
            if (trimmedValue === '10018') return '10018 > 5-7 - User 7 Fault';
            if (trimmedValue === '10019') return '10019 > 5-8 - User 8 Fault';
            if (trimmedValue === '10032') return '10032 > 5-9 - User 9 Fault';
            if (trimmedValue === '10033') return '10033 > 6-1 - User 10 Fault';
            if (trimmedValue === '10034') return '10034 > 6-2 - User 11 Fault';
            if (trimmedValue === '10035') return '10035 > 6-3 - User 12 Fault';
            if (trimmedValue === '10048') return '10048 > 6-4 - User 13 Fault';
            if (trimmedValue === '10049') return '10049 > 6-5 - User 14 Fault';
            if (trimmedValue === '10050') return '10050 > 6-6 - User 15 Fault';
            if (trimmedValue === '10051') return '10051 > 6-7 - User 16 Fault';
            if (trimmedValue === '10064') return '10064 > 5-10 - User 17 Fault';
            if (trimmedValue === '10065') return '10065 > 5-11 - User 18 Fault';
            if (trimmedValue === '10066') return '10066 > 5-12 - User 19 Fault';
            if (trimmedValue === '10067') return '10067 > 5-13 - User 20 Fault';
            if (trimmedValue === '10080') return '10080 > 5-14 - User 21 Fault';
            if (trimmedValue === '10081') return '10081 > 5-15 - User 22 Fault';
            if (trimmedValue === '10082') return '10082 > 6-10 - User 23 Fault';
            if (trimmedValue === '10083') return '10083 > 6-11 - User 24 Fault';
            if (trimmedValue === '10096') return '10096 > 6-12 - User 25 Fault';
            if (trimmedValue === '10097') return '10097 > 6-13 - User 26 Fault';
            if (trimmedValue === '10098') return '10098 > 6-14 - User 27 Fault';
            if (trimmedValue === '10099') return '10099 > 6-15 - User 28 Fault';
            if (trimmedValue === '10112') return '10112 > 7-10 - User 29 Fault';
            if (trimmedValue === '10113') return '10113 > 7-11 - User 30 Fault';
            if (trimmedValue === '10114') return '10114 > 7-12 - User 31 Fault';
            if (trimmedValue === '10115') return '10115 > 7-13 - User 32 Fault';
          }
          return value;
        });

        if (values[4] >= '2' && values[4] <= '5') {

          //if (trimmedValue === '100' ) return '100 > Connection Fault';
          if (values[5] === '100') updatedValues[7] = 'Connection Fault';






          if (values[5] === '72' && values[6] === '1') updatedValues[7] = 'PDO1 Timeout';
          if (values[5] === '72' && values[6] === '2') updatedValues[7] = 'PDO2 Timeout';
          if (values[5] === '72' && values[6] === '3') updatedValues[7] = 'PDO3 Timeout';
          if (values[5] === '72' && values[6] === '4') updatedValues[7] = 'PDO4 Timeout';
          if (values[5] === '11' && values[6] === '1') updatedValues[7] = 'Hardware Fault';
          if (values[5] === '12' && values[6] === '1') updatedValues[7] = 'Controller Overcurrent 1';
          if (values[5] === '12' && values[6] === '2') updatedValues[7] = 'Controller Overcurrent 2';
          if (values[5] === '13' && values[6] === '1') updatedValues[7] = 'Current Sensor Fault';
          if (values[5] === '14' && values[6] === '1') updatedValues[7] = 'Precharge';
          if (values[5] === '15' && values[6] === '1') updatedValues[7] = 'Controller Severe Undertemp';
          if (values[5] === '16' && values[6] === '1') updatedValues[7] = 'Controller Severe Overtemp';
          if (values[5] === '17' && values[6] === '1') updatedValues[7] = 'Severe Undervoltage';
          if (values[5] === '18' && values[6] === '1') updatedValues[7] = 'Severe Overvoltage';
          if (values[5] === '22' && values[6] === '1') updatedValues[7] = 'Controller Overtemp';
          if (values[5] === '25' && values[6] === '1') updatedValues[7] = '5V Supply Failure';
          if (values[5] === '26' && values[6] === '1') updatedValues[7] = '10V Supply Failure';
          if (values[5] === '27' && values[6] === '1') updatedValues[7] = 'Severe Motor Over Temp';
          if (values[5] === '28' && values[6] === '1') updatedValues[7] = 'Motor Temp Hot Cutback';
          if (values[5] === '29' && values[6] === '1') updatedValues[7] = 'Motor Temp Sensor Fault';
          if (values[5] === '31' && values[6] === '1') updatedValues[7] = 'Contactor Open/Short';
          if (values[5] === '35' && values[6] === '1') updatedValues[7] = 'Fault Output Open/Short';
          if (values[5] === '36' && values[6] === '1') updatedValues[7] = 'Motor Stalled';
          if (values[5] === '37' && values[6] === '1') updatedValues[7] = 'Motor Open';
          if (values[5] === '38' && values[6] === '1') updatedValues[7] = 'Contactor Welded';
          if (values[5] === '39' && values[6] === '1') updatedValues[7] = 'Contactor Did Not Close';
          if (values[5] === '39' && values[6] === '2') updatedValues[7] = 'Contactor Opened';
          if (values[5] === '41' && values[6] === '1') updatedValues[7] = 'Command Analog1 Out of Range';
          if (values[5] === '42' && values[6] === '1') updatedValues[7] = 'Command Analog3 Out of Range';
          if (values[5] === '43' && values[6] === '1') updatedValues[7] = 'Feedback Analog5 Out of Range';
          if (values[5] === '44' && values[6] === '1') updatedValues[7] = 'Feedback Analog6 Out of Range';
          if (values[5] === '45' && values[6] === '1') updatedValues[7] = 'CAN Not Operational';
          if (values[5] === '46' && values[6] === '1') updatedValues[7] = 'EEPROM CRC Fault';
          if (values[5] === '47' && values[6] === '1') updatedValues[7] = 'Sawtooth Command Sensor';
          if (values[5] === '47' && values[6] === '2') updatedValues[7] = 'Sin Cos Command Sensor';
          if (values[5] === '48' && values[6] === '1') updatedValues[7] = 'Sawtooth Feedback Sensor';
          if (values[5] === '48' && values[6] === '2') updatedValues[7] = 'Sin Cos Feedback Sensor';
          if (values[5] === '49' && values[6] === '1') updatedValues[7] = 'Parameter Change Fault';
          if (values[5] === '51' && values[6] === '1') updatedValues[7] = 'Interlock Switch Supervision';
          if (values[5] === '52' && values[6] === '1') updatedValues[7] = 'Home Switch Supervision';
          if (values[5] === '53' && values[6] === '1') updatedValues[7] = 'Home Position Not Found';
          if (values[5] === '54' && values[6] === '1') updatedValues[7] = 'Home Reference Tolerance Fault';
          if (values[5] === '55' && values[6] === '1') updatedValues[7] = 'Steer Command Supervision';
          if (values[5] === '56' && values[6] === '1') updatedValues[7] = 'Wheel Position Supervision';
          if (values[5] === '69' && values[6] === '1') updatedValues[7] = '5V Current Out of Range';
          if (values[5] === '71' && values[6] === '1') updatedValues[7] = 'Software Fault 1';
          if (values[5] === '71' && values[6] === '2') updatedValues[7] = 'Software Fault 2';
          if (values[5] === '71' && values[6] === '3') updatedValues[7] = 'Software Fault 3';
          if (values[5] === '71' && values[6] === '4') updatedValues[7] = 'Software Fault 4';
          if (values[5] === '71' && values[6] === '5') updatedValues[7] = 'Software Fault 5';
          if (values[5] === '73' && values[6] === '1') updatedValues[7] = 'Following Error';
          if (values[5] === '74' && values[6] === '1') updatedValues[7] = 'Hardware Software Mismatch';
          if (values[5] === '75' && values[6] === '1') updatedValues[7] = 'Parameter Conflict';
        }

      return updatedValues;
    }
    return null;
  })
  .filter((row) => row !== null)
  .filter((row) => {
    const rowDate = row[0];
    const isWithinDateRange = 
      (!startDate || rowDate >= new Date(startDate)) &&
      (!endDate || rowDate <= new Date(endDate));

    return (
      isWithinDateRange &&
      (filters.column2 === '' || row[1].includes(filters.column2)) &&
      (filters.column5 === '' || row[4].includes(filters.column5)) &&
      (filters.column6 === '' || row[5].includes(filters.column6))
    );
  });

  const headerColumns = fileContent ? fileContent.split('\n')[0].split(';') : [];

//##############################################################################
//##############################################################################
//##############################################################################

    return (
    <main className={styles.main}>
{/*##########################################################################*/}
      <div className={styles.navigationButtons}>
        <button
        className={styles.navigationButton}
          onClick={() => router.push('/')}
        >
          Activities
        </button>
        <button
          className={styles.navigationButton}
          onClick={() => router.push('/faults')}
        >
          Faults
        </button>
        <button
          className={styles.navigationButton}
          onClick={() => router.push('/page_files')}
        >
          Demo File
        </button>
        <div><h5>Next.js test v0.01 nunonogueir444</h5></div>
      </div>
{/*##########################################################################*/}
<h1>Fault Logs</h1>
{/*##########################################################################*/}
      <div>
        <h3>Upload Faults File</h3>
        <input type="file" accept=".log" onChange={handleFileChange} />
        {isLoading && <LoadingMessage />}
      </div>
{/*##########################################################################*/}
      <div>
        <h3>Filters:</h3>
          <div className={styles.dateFilters}>
          <div>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </label>
          </div>

          <div>
            <button
              onClick={handleResetDateFilter}
            >
              Reset Dates
            </button>
          </div>
{/*##########################################################################*/}
          <div>
            <select
              className="filters-select"
              value={filters.column2}
              onChange={(e) => handleFilterChange('column2', e.target.value)}
            >
              <option value="">User Level - All Values</option>
              {column2Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column5}
              onChange={(e) => handleFilterChange('column5', e.target.value)}
            >
              <option value="">Controllers - All Values</option>
              {column5Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              className="filters-select"
              value={filters.column6}
              onChange={(e) => handleFilterChange('column6', e.target.value)}
            >
              <option value="">F Series - All Values</option>
              {column6Values.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
{/*##########################################################################*/}
        {pages.length > 0 && (
          <>
            <div className={styles.pageNavigation}>
              <button onClick={handleFirstPage} disabled={currentPage === 0}>
                First
              </button>
              <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {pages.length}</span>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                Next
              </button>
              <button onClick={handleLastPage} disabled={currentPage === pages.length - 1}>
                Last
              </button>
            </div>

            <table border="1" className={styles.table}>
              <thead>
                <tr>
                  <th>
                    Date
                    <button 
                      className={styles.sortButton}
                      onClick={handleSort}
                    >
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </button>

                    <button 
                      className={styles.resetSortButton}
                      onClick={handleResetSort}
                      style={{ marginLeft: '5px' }}
                    >
                      Reset Sort
                    </button>
                  </th>
                  <th>User Level</th>
                  <th>Ind. User</th>
                  <th>Group Event</th>
                  <th>Controller</th>
                  <th>Fault Code (Major)</th>
                  <th>Fault Code (Minor)</th>
                  <th>Fault Description</th>
                  {headerColumns.slice(8).map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((row, index) => (
                  <tr key={index}>
                    <td>{row[0] instanceof Date ? formatDate(row[0]) : row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                    <td>{row[4]}</td>
                    <td>{row[5]}</td>
                    <td>{row[6]}</td>
                    <td>{row[7]}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.pageNavigation}>
              <button onClick={handleFirstPage} disabled={currentPage === 0}>
                First
              </button>
              <button onClick={() => handlePageChange(-1)} disabled={currentPage === 0}>
                Previous
              </button>
              <span>Page {currentPage + 1} of {pages.length}</span>
              <button onClick={() => handlePageChange(1)} disabled={currentPage === pages.length - 1}>
                Next
              </button>
              <button onClick={handleLastPage} disabled={currentPage === pages.length - 1}>
                Last
              </button>
            </div>
            <br></br>
          </>
        )}
      </div>
{/*##########################################################################*/}
    </main>
  );

}