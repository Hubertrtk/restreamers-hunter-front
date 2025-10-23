export const deleteWhiteSigns = (text) => {
  return text
    .trim() // usuwa białe znaki z początku i końca
    .split(/\s+/);
};
