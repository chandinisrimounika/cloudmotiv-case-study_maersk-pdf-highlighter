import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import AnalysisPanel from "./AnalysisPanel";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [showHighlight, setShowHighlight] = useState(false);

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleReferenceClick = (refId) => {
    setShowHighlight(false);

    if (refId === 1) {
      setPageNumber(3);
    } else if (refId === 2) {
      setPageNumber(5);
    } else if (refId === 3) {
      setPageNumber(15);
      setShowHighlight(true);
    }
  };

  return (
    <div className="app-container">
      <div className="pdf-panel">
        <PdfViewer
          fileUrl="/Maersk_Q2_2025.pdf"
          pageNumber={pageNumber}
          numPages={numPages}
          onDocumentLoadSuccess={handleDocumentLoadSuccess}
          showHighlight={showHighlight}
        />
      </div>
      <div className="analysis-panel">
        <AnalysisPanel onReferenceClick={handleReferenceClick} />
      </div>
    </div>
  );
}

export default App;
