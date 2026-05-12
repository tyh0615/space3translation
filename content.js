(function() {
  let spacePressCount = 0;
  let lastSpaceTime = 0;
  const TIME_WINDOW = 500;

  function isChinese(text) {
    return /[\u4e00-\u9fa5]/.test(text);
  }

  async function translate(text) {
    const sourceLang = isChinese(text) ? 'zh' : 'en';
    const targetLang = isChinese(text) ? 'en' : 'zh';
    
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      const response = await fetch(url);
      const data = await response.json();
      
      let translatedText = '';
      if (data && data[0]) {
        translatedText = data[0].map(item => item[0]).join('');
      }
      return translatedText;
    } catch (error) {
      console.error('翻译失败:', error);
      return null;
    }
  }

  function getActiveInput() {
    const activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable)) {
      return activeElement;
    }
    return null;
  }

  function setInputValue(element, value) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.value = value;
      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    } else if (element.isContentEditable) {
      element.innerText = value;
    }
  }

  function getInputValue(element) {
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      return element.value;
    } else if (element.isContentEditable) {
      return element.innerText;
    }
    return '';
  }

  async function handleTripleSpace() {
    const input = getActiveInput();
    if (!input) return;

    const text = getInputValue(input).trim();
    if (!text) return;

    const translated = await translate(text);
    if (translated) {
      setInputValue(input, translated);
    }
  }

  function handleKeyDown(event) {
    if (event.code !== 'Space') {
      spacePressCount = 0;
      return;
    }

    const now = Date.now();
    
    if (now - lastSpaceTime > TIME_WINDOW) {
      spacePressCount = 1;
    } else {
      spacePressCount++;
    }
    
    lastSpaceTime = now;

    if (spacePressCount === 3) {
      event.preventDefault();
      event.stopPropagation();
      spacePressCount = 0;
      handleTripleSpace();
    }
  }

  document.addEventListener('keydown', handleKeyDown, true);
})();
