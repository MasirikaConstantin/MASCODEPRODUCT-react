import React from 'react';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/github.css'; // ou autre thème

const QuillContentViewer = ({ content }) => {
  return (
    <div className="ql-snow">
      <div 
        className="ql-editor prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default QuillContentViewer; // <-- L'export essentiel