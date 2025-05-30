import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';// Importez les langages dont vous avez besoin
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-cshtml';
// Ajoutez d'autres langages selon vos besoins

const PrismCode = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

  return (
    <pre className={`${language}`}>
      <code className={`${language}`}>
        {code}
      </code>
    </pre>
  );
};

export default PrismCode;