import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Ensure googleTranslateElementInit is defined globally
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

    return () => {
      // Clean up if needed
      document.head.removeChild(script);
      window.googleTranslateElementInit = null; // Optional cleanup
    };
  }, []);

  return (
    <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;