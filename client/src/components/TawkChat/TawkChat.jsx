import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    const tawkApi = window.Tawk_API || {};
    const tawkLoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = 'https://embed.tawk.to/69738e7ef21a39197d27ca4c/1jflm983i';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const s0 = document.getElementsByTagName("script")[0];
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(script, s0);
    }

    return () => {
      script.remove();
      const tawkWidget = document.querySelector('.tawk-main-wrapper');
      if (tawkWidget) tawkWidget.remove();
    };
  }, []);

  return null;
};

export default TawkChat;