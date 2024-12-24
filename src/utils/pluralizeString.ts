export const pluralizeString = (
  amount: number,
  word: string,
  pluralSuffix = "s"
) => {
  return `${word}${amount === 1 ? "" : pluralSuffix}`;
};
