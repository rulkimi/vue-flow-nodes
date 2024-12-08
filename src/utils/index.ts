export const capitalizeFirstLetter = (word: string) => {
  return String(word).charAt(0).toUpperCase() + String(word).slice(1)
}

export const convertCamelToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
}