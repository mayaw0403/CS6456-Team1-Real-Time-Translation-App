import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Define the translate initialization function globally
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    // Load Google Translate API script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Remove the script element from the DOM
      document.head.removeChild(script);
      
      // Optionally, nullify the global function instead of deleting
      window.googleTranslateElementInit = null;
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;