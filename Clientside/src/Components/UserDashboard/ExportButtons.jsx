import React from 'react';

function ExportButtons({ userId }) {
  const handleDownload = (format) => {
    const url = `http://localhost:4000/export/${format}/${userId}`; // Fixed backticks!

    fetch(url, {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.blob();
      })
      .then(blob => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `progress.${format === 'csv' ? 'csv' : 'pdf'}`; // Fixed string
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => {
        console.error('Download error:', error);
      });
  };

  return (
    <div className="text-end p-3">
    <div className="btn-group" role="group" aria-label="Download buttons">
      <button
        onClick={() => handleDownload('csv')}
        className="btn btn-danger btn-lg rounded-pill me-2 shadow-sm"
      >
        <i className="fas fa-file-csv me-2"></i>Download CSV
      </button>
      <button
        onClick={() => handleDownload('pdf')}
        className="btn btn-danger btn-lg rounded-pill shadow-sm"
      >
        <i className="fas fa-file-pdf me-2"></i>Download PDF
      </button>
    </div>
  </div>
  
  );
}

export default ExportButtons;
