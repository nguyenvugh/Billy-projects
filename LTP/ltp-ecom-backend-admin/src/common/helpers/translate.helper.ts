export const processTranslateData = (translateData: any[]) => {
  const processedData: any = {};
  if (!translateData || !translateData.length) {
    return processedData;
  }
  translateData.forEach((data) => {
    if (
      data.hasOwnProperty('language_code') &&
      data.hasOwnProperty('language_field') &&
      data.hasOwnProperty('language_value')
    ) {
      const code = data['language_code'];
      const field = data['language_field'];
      const value = data['language_value'];
      if (!processedData.hasOwnProperty(code)) {
        processedData[code] = {};
      }
      processedData[code][field] = value;
    }
  });

  return processedData;
};
