# 📘 Maersk PDF Highlighter – Cloudmotiv Case Study

This project is an interactive **PDF Highlighter Web Application** built as part of the **Cloudmotiv Case Study**.  
It displays the **Maersk Q2 2025 Interim Report** and highlights a specific phrase inside the PDF when referenced from the analysis panel.

The main objective:  
👉 **When the user clicks reference [3] in the analysis section, the sentence _“Gain on sale of non-current assets, etc.”_ gets highlighted inside the PDF.**

---

## 🚀 Features

### ✅ PDF Rendering
- Displays the official *Maersk Q2 2025 Interim Report* using `react-pdf`.

### ✅ Text Search + Highlighting
- Automatically scans the PDF text.
- Detects individual PDF text fragments.
- Matches the phrase: **“Gain on sale of non-current assets, etc.”**
- Builds a bounding rectangle.
- Highlights only that exact sentence in yellow.

### ✅ Smooth Highlight (Merged Box)
- Instead of multiple broken highlights, the app merges all bounding boxes into a **clean single yellow bar**.

### ✅ Interactive Analysis Panel
- Clicking references like `[1]`, `[2]`, `[3]` scrolls to their corresponding PDF page.
- Clicking `[3]` triggers the highlight logic.

### ✅ Deployed on Netlify
- Build folder uploaded.
- PDF & worker properly packaged.
- Public demo URL available (Netlify).

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|------------------|----------------------------------|
| **React.js**     | Frontend framework              |
| **react-pdf**    | PDF rendering & text extraction |
| **pdfjs-dist**   | Worker / text content           |
| **Netlify**      | Deployment                      |
| **JavaScript**   | Core logic                      |
| **HTML5/CSS3**   | UI & layout                     |

---

## 📂 Project Structure

```text
/public
   ├── maersk_q2_2025.pdf
   ├── pdf.worker.min.mjs
   └── index.html

/src
   ├── PdfViewer.js        ← Main highlight logic
   ├── AnalysisPanel.js    ← Analysis and clickable references
   ├── App.js              ← Layout
   ├── App.css             ← Styling
   └── index.js
```

---

## 🚀 Deployment Process

This project supports deployment to both **GitHub Repository** and **Netlify**.

---

### 1. Deployment to GitHub Repository

Use the following commands to push the project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit: PDF Highlighter project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```
✅Deployment Link:

Permanent URL:
https://soft-creponne-92608a.netlify.app/

Netlify also generates temporary preview deploy links, such as:
https://69203ed293ec5c2d2737a3a0--soft-creponne-92608a.netlify.app/
