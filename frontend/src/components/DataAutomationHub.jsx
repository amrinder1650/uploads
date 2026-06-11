import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const DataAutomationHub = () => {
  // State to hold the preview data and file info
  const [dataPreview, setDataPreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  // Ref to trigger the hidden file input when the styled button is clicked
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setError('');

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);

        // 1. Read the Excel workbook using SheetJS
        const workbook = XLSX.read(data, { type: 'array' });

        // 2. Find the first sheet in the workbook
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // 3. Convert that sheet into an array of JavaScript Objects (JSON)
        const rawData = XLSX.utils.sheet_to_json(worksheet);

        // 4. Update state with a preview of the first 3 rows
        setDataPreview({
          totalRows: rawData.length,
          preview: rawData.slice(0, 3)
        });

        // ---------------------------------------------------------
        // YOUR AUTOMATION MAGIC HAPPENS HERE
        // 'rawData' is ready for .map(), .filter(), etc.
        // ---------------------------------------------------------
        console.log("Full data ready for manipulation: ", rawData);

      } catch (err) {
        setError('Error reading the file. Please ensure it is a valid Excel or CSV file.');
        console.error(err);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // --- Styles ---
  const styles = {
    wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f4f6f9', padding: '20px', fontFamily: 'system-ui, sans-serif' },
    container: { background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', textAlign: 'center', maxWidth: '500px', width: '100%' },
    heading: { marginTop: 0, color: '#2c3e50' },
    text: { color: '#7f8c8d', marginBottom: '24px', lineHeight: '1.5' },
    button: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s ease' },
    previewBox: { marginTop: '24px', textAlign: 'left', background: '#2c3e50', color: '#ecf0f1', padding: '16px', borderRadius: '8px', maxHeight: '250px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '13px', whiteSpace: 'pre-wrap' },
    error: { color: '#e74c3c', marginTop: '16px' },
    fileName: { marginTop: '16px', fontSize: '14px', color: '#34495e', fontWeight: '500' }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Data Automation Hub</h2>
        <p style={styles.text}>
          Select your monthly `.xlsx` or `.csv` export. The software will automatically extract and structure the data.
        </p>

        <div>
          <button style={styles.button} onClick={triggerFileInput}>
            Select Excel File
          </button>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".xlsx, .xls, .csv"
            style={{ display: 'none' }}
          />
        </div>

        {fileName && <div style={styles.fileName}>Selected: {fileName}</div>}
        {error && <div style={styles.error}>{error}</div>}

        {/* Display parsed JSON data */}
        {dataPreview && (
          <div style={styles.previewBox}>
            <p style={{ margin: '0 0 10px 0', color: '#2ecc71', fontWeight: 'bold' }}>
              ✓ Success! Extracted {dataPreview.totalRows} rows.
            </p>
            <p style={{ margin: '0 0 10px 0' }}>Preview of first 3 rows:</p>
            {JSON.stringify(dataPreview.preview, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAutomationHub;