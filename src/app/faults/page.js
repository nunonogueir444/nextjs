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

  const column3Values = [
    'FAULT',
  ];

  const column4Values = [
    'PLC',
    'TRR',
    'TRL',
    'TFR',
    'TFL',
    'SRR',
    'SRL',
    'SFR',
    'SFL'
  ];

  const column5Values = [
    '100 Connection Fault',
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
    '99999 - Generic Fault'
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
        const values = line.split(';');
        if (values.length === 7) {
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
      const values = line.split(';');

      if (values.length === 7) {
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
          if (valueIndex === 2) {
            if (trimmedValue === '601') return 'FAULT';
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
            if (trimmedValue === '704') return 'Load PAR Defaults';
            if (trimmedValue === '705') return 'Load PAR Defaults';
          }
          if (valueIndex === 3 ) {
            if (trimmedValue === '2') return 'SRR';
            if (trimmedValue === '3') return 'SRL';
            if (trimmedValue === '4') return 'SFR';
            if (trimmedValue === '5') return 'SFL';
            if (trimmedValue === '36') return 'TRR';
            if (trimmedValue === '37') return 'TRL';
            if (trimmedValue === '38') return 'TFR';
            if (trimmedValue === '39') return 'TFL';
            if (trimmedValue === '50') return 'PLC';
          }
          if (valueIndex === 4 ) {
            if (trimmedValue === '100' ) return '100 Connection Fault';
            if (trimmedValue === '8449') return '8449 - 13-2 - Phase PWM Mismatch';
            if (trimmedValue === '8450') return '8450 - 3-11 - Misalignment Error';
            if (trimmedValue === '8451') return '8451 - 3-10 - Motor Setup Needed';
            if (trimmedValue === '8452') return '8452 - 13-1 - Lift Input';
            if (trimmedValue === '8453') return '8453 - 13-4 - Lower Input';
            if (trimmedValue === '8454') return '8454 - 12-7 - Analog 31 Out of Range';
            if (trimmedValue === '8455') return '8455 - 12-8 - Invalid CAN Port';
            if (trimmedValue === '8456') return '8456 - 12-9 - VCL Watchdog';
            if (trimmedValue === '8457') return '8457 - 1-11 - Critical OS General';
            if (trimmedValue === '8458') return '8458 - 1-12 - OS General 2';
            if (trimmedValue === '8459') return '8459 - 12-4 - Torque Input';
            if (trimmedValue === '8460') return '8460 - 12-13 - PWM Input 28 Out of Range';
            if (trimmedValue === '8461') return '8461 - 12-12 - PWM Input 29 Out of Range';
            if (trimmedValue === '8462') return '8462 - 1-14 - Motor Short';
            if (trimmedValue === '8463') return '8463 - 12-15 - Force Feedback Fault';
            if (trimmedValue === '8464') return '8464 - 1-13 - Reset Rejected';
            if (trimmedValue === '8465') return '8465 - 12-10 - Auto Baud Failure On Ancillary';
            if (trimmedValue === '8466') return '8466 - 13-0 - Steering Traction Msg Count';
            if (trimmedValue === '8467') return '8467 - 12-11 - Primary State Error';
            if (trimmedValue === '8468') return '8468 - 13-13 - IMU Failure';
            if (trimmedValue === '8470') return '8470 - 13-0 - Delayed Shutdown';
            if (trimmedValue === '8471') return '8471 - 8-0 - Secondary Command Input';
            if (trimmedValue === '8472') return '8472 - 8-1 - Secondary Feedback Input';
            if (trimmedValue === '8474') return '8474 - 8-4 - Motor Braking Impaired';
            if (trimmedValue === '8476') return '8476 - 13-6 - Hazardous Movement';
            if (trimmedValue === '8477') return '8477 - 8-3 - Lv Supply Pos Out Of Range';
            if (trimmedValue === '8480') return '8480 - 1-7 - Severe B+ Undervoltage';
            if (trimmedValue === '8481') return '8481 - 2-3 - Undervoltage Cutback';
            if (trimmedValue === '8482') return '8482 - 1-7 - Severe KSI Undervoltage';
            if (trimmedValue === '8484') return '8484 - 4-7 - Hydraulic HPD SRO Lower';
            if (trimmedValue === '8485') return '8485 - 4-7 - Hydraulic HPD SRO Lift';
            if (trimmedValue === '8486') return '8486 - 4-7 - LHS Throttle Conflict';
            if (trimmedValue === '8487') return '8487 - 13-10 - Lift Limit';
            if (trimmedValue === '8490') return '8490 - 15-1 - Memory Parity';
            if (trimmedValue === '8496') return '8496 - 1-8 - Severe B+ Overvoltage';
            if (trimmedValue === '8497') return '8497 - 2-4 - Overvoltage Cutback';
            if (trimmedValue === '8498') return '8498 - 1-8 - Severe KSI Overvoltage';
            if (trimmedValue === '8499') return '8499 - 1-9 - Speed Limit Supervision';
            if (trimmedValue === '8500') return '8500 - 1-10 - Motor Not Stopped';
            if (trimmedValue === '8512') return '8512 - 2-2 - Controller Overtemperature Cutback';
            if (trimmedValue === '8513') return '8513 - 1-5 - Controller Severe Undertemperature';
            if (trimmedValue === '8514') return '8514 - 1-6 - Controller Severe Overtemperature';
            if (trimmedValue === '8528') return '8528 - 2-9 - Motor Temp Sensor';
            if (trimmedValue === '8529') return '8529 - 2-8 - Motor Temp Hot Cutback';
            if (trimmedValue === '8544') return '8544 - 10-1 - Driver 1 Fault';
            if (trimmedValue === '8545') return '8545 - 10-2 - Driver 2 Fault';
            if (trimmedValue === '8546') return '8546 - 10-3 - Driver 3 Fault';
            if (trimmedValue === '8547') return '8547 - 10-4 - Driver 4 Fault';
            if (trimmedValue === '8548') return '8548 - 10-5 - Driver 5 Fault';
            if (trimmedValue === '8549') return '8549 - 10-6 - Driver 6 Fault';
            if (trimmedValue === '8550') return '8550 - 10-7 - Driver 7 Fault';
            if (trimmedValue === '8553') return '8553 - 10-9 - Coil Supply';
            if (trimmedValue === '8720') return '8720 - 4-2 - Throttle Input';
            if (trimmedValue === '8721') return '8721 - 4-7 - HPD Sequencing';
            if (trimmedValue === '8736') return '8736 - 3-8 - Main Contactor Welded';
            if (trimmedValue === '8737') return '8737 - 3-9 - Main Contactor Did Not Close';
            if (trimmedValue === '8738') return '8738 - 3-1 - Main Driver';
            if (trimmedValue === '8739') return '8739 - 1-4 - Precharge Failed';
            if (trimmedValue === '8752') return '8752 - 3-6 - IM Motor Feedback';
            if (trimmedValue === '8753') return '8753 - 7-3 - Stall Detected';
            if (trimmedValue === '8754') return '8754 - 3-6 - Sin Cos Motor Feedback';
            if (trimmedValue === '8755') return '8755 - 9-3 - Encoder LOS';
            if (trimmedValue === '8756') return '8756 - 8-8 - Encoder Pulse Error';
            if (trimmedValue === '8768') return '8768 - 3-7 - Motor Open';
            if (trimmedValue === '8784') return '8784 - 7-6 - Dual Severe';
            if (trimmedValue === '8785') return '8785 - 7-4 - Fault On Other Traction Controller Active';
            if (trimmedValue === '8786') return '8786 - 4-5 - Steer Angle Input';
            if (trimmedValue === '8787') return '8787 - 7-2 - Dual Pdo Timeout';
            if (trimmedValue === '8800') return '8800 - 4-8 - Following Error';
            if (trimmedValue === '8832') return '8832 - 13-5 - Primary Command Input';
            if (trimmedValue === '8848') return '8848 - 13-7 - Primary Feedback Input';
            if (trimmedValue === '8864') return '8864 - 7-7 - Steering Supervision Error';
            if (trimmedValue === '8865') return '8865 - 7-7 - Home Switch Supervision';
            if (trimmedValue === '8866') return '8866 - 7-7 - Interlock Input Conflict';
            if (trimmedValue === '8867') return '8867 - 7-7 - Steer Command Supervision';
            if (trimmedValue === '8868') return '8868 - 7-7 - Wheel Position Supervision';
            if (trimmedValue === '8869') return '8869 - 7-7 - Home Position Not Found';
            if (trimmedValue === '8870') return '8870 - 7-7 - Home Reference Tolerance';
            if (trimmedValue === '8871') return '8871 - 10-4 - Steering Safety Output Failed';
            if (trimmedValue === '8976') return '8976 - 4-4 - Brake Input';
            if (trimmedValue === '8992') return '8992 - 3-2 - EM Brake Driver';
            if (trimmedValue === '8993') return '8993 - 9-2 - EM Brake Failed to Set';
            if (trimmedValue === '9008') return '9008 - 9-4 - Emer Rev Timeout';
            if (trimmedValue === '9009') return '9009 - 4-7 - Emer Rev HPD';
            if (trimmedValue === '9010') return '9010 - 9-10 - Interlock Braking Supervision';
            if (trimmedValue === '9011') return '9011 - 9-11 - EMR Supervision';
            if (trimmedValue === '9248') return '9248 - 3-3 - Pump Driver';
            if (trimmedValue === '9264') return '9264 - 3-4 - Load Hold Driver';
            if (trimmedValue === '9280') return '9280 - 3-5 - Lower Driver';
            if (trimmedValue === '9296') return '9296 - 9-6 - Pump BDI';
            if (trimmedValue === '9488') return '9488 - 1-2 - Controller Overcurrent';
            if (trimmedValue === '9504') return '9504 - 9-5 - Pump Overcurrent';
            if (trimmedValue === '9521') return '9521 - 2-5 - Ext 5V Supply Failure';
            if (trimmedValue === '9522') return '9522 - 2-6 - Ext 12V Supply Failure';
            if (trimmedValue === '9537') return '9537 - 7-2 - PDO Timeout';
            if (trimmedValue === '9538') return '9538 - 8-2 - PDO Mapping Error';
            if (trimmedValue === '9552') return '9552 - 7-6 - Insulation Resistance Low';
            if (trimmedValue === '9760') return '9760 - 11-1 - Analog 1 Out Of Range';
            if (trimmedValue === '9761') return '9761 - 11-2 - Analog 2 Out Of Range';
            if (trimmedValue === '9762') return '9762 - 11-3 - Analog 3 Out Of Range';
            if (trimmedValue === '9763') return '9763 - 11-4 - Analog 4 Out Of Range';
            if (trimmedValue === '9764') return '9764 - 11-5 - Analog 5 Out Of Range';
            if (trimmedValue === '9765') return '9765 - 11-6 - Analog 6 Out Of Range';
            if (trimmedValue === '9766') return '9766 - 11-7 - Analog 7 Out Of Range';
            if (trimmedValue === '9767') return '9767 - 11-8 - Analog 8 Out Of Range';
            if (trimmedValue === '9768') return '9768 - 11-9 - Analog 9 Out of Range';
            if (trimmedValue === '9769') return '9769 - 12-5 - PWM Input 10 Out of Range';
            if (trimmedValue === '9770') return '9770 - 11-11 - Analog 14 Out Of Range';
            if (trimmedValue === '9771') return '9771 - 11-13 - Analog 18 Out of range';
            if (trimmedValue === '9772') return '9772 - 11-14 - Analog 19 Out of range';
            if (trimmedValue === '9773') return '9773 - 12-6 - Pwm Input 17 Out Of Range';
            if (trimmedValue === '9777') return '9777 - 11-12 - Analog Assignment';
            if (trimmedValue === '9778') return '9778 - 10-8 - Driver Assignment';
            if (trimmedValue === '10257') return '10257 - 8-9 - Parameter Out of Range';
            if (trimmedValue === '10258') return '10258 - 9-9 - Parameter Mismatch';
            if (trimmedValue === '10259') return '10259 - 4-9 - Parameter Change';
            if (trimmedValue === '10261') return '10261 - 9-1 - Bad Firmware';
            if (trimmedValue === '10263') return '10263 - 4-10 - EMR Switch';
            if (trimmedValue === '10272') return '10272 - 6-8 - VCL Run Time Error';
            if (trimmedValue === '10288') return '10288 - 4-6 - NV Memory Failure';
            if (trimmedValue === '10289') return '10289 - 7-1 - OS General';
            if (trimmedValue === '10290') return '10290 - 1-3 - Current Sensor';
            if (trimmedValue === '10291') return '10291 - 9-7 - Pump Hardware';
            if (trimmedValue === '10292') return '10292 - 11-15 - Pump Current Sensor';
            if (trimmedValue === '10293') return '10293 - 8-3 - Internal Hardware';
            if (trimmedValue === '10304') return '10304 - 7-7 - Supervision';
            if (trimmedValue === '10305') return '10305 - 7-9 - Supervision Input Check';
            if (trimmedValue === '10320') return '10320 - 8-7 - Motor Characterization';
            if (trimmedValue === '10336') return '10336 - 12-1 - Branding Error';
            if (trimmedValue === '10337') return '10337 - 12-2 - BMS Cutback';
            if (trimmedValue === '10338') return '10338 - 12-3 - Differential Steering';
            if (trimmedValue === '10352') return '10352 - 13-3 - Hardware Compatibility';
            if (trimmedValue === '10353') return '10353 - 6-8 - ECC Run Time Error';
            if (trimmedValue === '10384') return '10384 - 14-14 - Eru Configuration';
            if (trimmedValue === '10385') return '10385 - 14-15 - Desat Trip';
            if (trimmedValue === '10386') return '10386 - 13-8 - ESTOP_Mismatch';
            if (trimmedValue === '10387') return '10387 - 13-9 - ESTOP_SRO';
            if (trimmedValue === '99999') return '99999 - Generic Fault';
          }
          return value;
        });
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
      (filters.column3 === '' || row[2].includes(filters.column3)) &&
      (filters.column4 === '' || row[3].includes(filters.column4)) &&
      (filters.column5 === '' || row[4].includes(filters.column5))
    );
  });

  const headerColumns = fileContent ? fileContent.split('\n')[0].split(';') : [];

//##############################################################################
//##############################################################################
//##############################################################################

    return (
    <main className={styles.main}>

      <div className={styles.navigation}>
        <button
          className={styles.button}
          onClick={() => router.push('/')}
        >
          Activities
        </button>
        <button
          className={styles.button}
          onClick={() => router.push('/faults')}
        >
          Faults
        </button>
        <button
          className={styles.button}
          onClick={() => router.push('/page_files')}
        >
          Demo File
        </button>
      </div>

      <div>
        <h1>Upload Faults File</h1>
        <input type="file" accept=".log" onChange={handleFileChange} />

        {isLoading && <LoadingMessage />} {/* Use the loading message */}

        <div><br></br></div>

        {/* Filter section moved above the table */}
        <h2>Filter:</h2>
        <div className={styles.filters}>
          {/* Date Range Filters */}
          <div className={styles.dateFilters}>
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleDateChange('start', e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleDateChange('end', e.target.value)}
              />
            </label>
            <button
              className={styles.resetButton}
              onClick={handleResetDateFilter}
            >
              Reset Dates
            </button>
          </div>

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
            value={filters.column4}
            onChange={(e) => handleFilterChange('column4', e.target.value)}
          >
            <option value="">All Values</option>
            {column4Values.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>

          <select
            value={filters.column5}
            onChange={(e) => handleFilterChange('column5', e.target.value)}
          >
            <option value="">All Values</option>
            {column5Values.map((value, index) => (
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
                  <th>Group Event</th>
                  <th>Value1</th>
                  <th>Value2</th>
                  <th>Value3</th>
                  <th>Value4</th>
                  {headerColumns.slice(7).map((column, index) => (
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
          </>
        )}
      </div>
    </main>
  );

}