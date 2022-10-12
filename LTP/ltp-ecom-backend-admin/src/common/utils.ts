export const safeParseJson = (text: string) => {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
};
