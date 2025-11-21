import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.mjs`;

const TARGET_KEYWORD = "gain on sale of non-current assets";

export default function PdfViewer({ fileUrl, pageNumber, onDocumentLoadSuccess }) {
  const [rects, setRects] = useState([]);

  const onPageRenderSuccess = async (page) => {
    const content = await page.getTextContent();
    const viewport = page.getViewport({ scale: 1.7 });

    let merged = [];
    let lastY = null;
    let buffer = "";

    // Merge lines into full sentences
    content.items.forEach((item) => {
      const str = item.str.trim();
      if (!str) return;

      const transform = pdfjs.Util.transform(viewport.transform, item.transform);
      const y = transform[5];

      if (lastY === null) lastY = y;

      // New line detected
      if (Math.abs(y - lastY) > 5) {
        merged.push({ text: buffer.toLowerCase(), y: lastY });
        buffer = str;
      } else {
        buffer += " " + str;
      }

      lastY = y;
    });

    merged.push({ text: buffer.toLowerCase(), y: lastY });

    // Find the matching line
    const hit = merged.find((line) =>
      line.text.includes(TARGET_KEYWORD)
    );

    if (!hit) {
      console.warn("TARGET NOT FOUND ON PAGE");
      setRects([]);
      return;
    }

    // Collect bounding boxes for all chunks on that line
    let boxes = [];

    content.items.forEach((item) => {
      const str = item.str.toLowerCase();
      if (!str) return;

      const transform = pdfjs.Util.transform(viewport.transform, item.transform);
      const x = transform[4];
      const y = transform[5] - item.height * viewport.scale;
      const width = item.width * viewport.scale;
      const height = item.height * viewport.scale;

      // Highlight anything on the same Y-line
      if (Math.abs((transform[5] - hit.y)) < 5) {
        boxes.push({ x, y, width, height });
      }
    });

    setRects(boxes);
  };

  return (
    <div style={{ position: "relative" }}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          scale={1.7}
          onRenderSuccess={onPageRenderSuccess}
        />
      </Document>

      {rects.map((r, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: r.width,
            height: r.height,
            background: "rgba(255,255,0,0.4)",
            pointerEvents: "none",
            borderRadius: "2px"
          }}
        />
      ))}
    </div>
  );
}
