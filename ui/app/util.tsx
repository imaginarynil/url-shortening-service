function isUrlValid(str: string) {
  let url;
  try {
    url = new URL(str);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function isStringBlank(str: string) {
  return str.trim().length === 0;
}

export function validateUrl(url: string) {
  if (isStringBlank(url)) {
    console.log("URL cannot be empty");
    return false;
  }
  if (!isUrlValid(url)) {
    console.log("URL is not valid");
    return false;
  }
  return true;
}

function isStringLettersAndNumbers(str: string) {
  return /^[A-Za-z0-9]+$/.test(str);
}

export function validateShortCode(shortCode: string) {
  if (isStringBlank(shortCode)) {
    console.log("Short code cannot be empty");
    return false;
  }
  if (!isStringLettersAndNumbers(shortCode)) {
    console.log("Short code can only contain letters and numbers");
    return false;
  }
  return true;
}
