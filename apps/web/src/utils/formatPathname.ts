export function formatPathname(str: string, skip: string[] = ['c', 'd']) {
  if (!str) return [];

  return (str.match(/[^\/]+/g) || []).map((part) => {
    return part
      .split('-')
      .filter((part) => part && !skip.includes(part.toLowerCase()))
      .map((word) => {
        const lowerWords = ['and', 'or', 'the'];
        if (lowerWords.includes(word.toLowerCase())) return word.toLowerCase();

        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  });
}
