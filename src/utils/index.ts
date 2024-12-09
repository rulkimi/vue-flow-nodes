export const capitalizeFirstLetter = (word: string) => {
  return String(word).charAt(0).toUpperCase() + String(word).slice(1)
};

export const convertCamelToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, match => '-' + match.toLowerCase());
};

export const deepCopy = (value: any): any => {
  if (value === null || typeof value !== "object") {
    return value; 
  }

  if (value instanceof File) {
    return value; 
  }

  if (Array.isArray(value)) {
    return value.map(deepCopy); 
  }

  if (value instanceof Object) {
    const copy: any = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        copy[key] = deepCopy(value[key]); 
      }
    }
    return copy;
  }

  return value;
};
