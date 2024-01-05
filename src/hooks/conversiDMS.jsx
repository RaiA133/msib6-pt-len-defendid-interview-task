// Fungsi untuk memisahkan koordinat dengan spasi
export function splitCoordinates(inputStr) {
  const parts = inputStr.split(/\s+/);
  return parts;
}

// Fungsi untuk mengonversi array koordinat menjadi format yang diinginkan
export function convertToNestedArray(arr) {
  const nestedArray = [];
  let currentGroup = [];

  function parseDMS(dms) {
    const regex = /(\d+)° (\d+)′ (\d+)″/;
    const match = dms.match(regex);
    if (match) {
      const degrees = match[1];
      const minutes = match[2];
      const seconds = match[3];
      return [degrees + '°', minutes + '′', seconds + '″'];
    } else {
      return [dms];
    }
  }

  for (const item of arr) {
    if (item === "N" || item === "S" || item === "E" || item === "W") {
      if (currentGroup.length > 0) {
        nestedArray.push(currentGroup.concat([item]));
        currentGroup = [];
      } else {
        nestedArray.push([item]);
      }
    } else {
      const subItems = parseDMS(item);
      currentGroup = currentGroup.concat(subItems);
    }
  }
  
  if (currentGroup.length > 0) {
    nestedArray.push(currentGroup);
  }

  return nestedArray;
}

// Fungsi untuk mengonversi hasil object convertToNestedArray ke object dengan properti latitude & longitude
export function converteDmsToObject(inputArray) {
  let outputObject = {};
  if ((inputArray[0].includes("N") || inputArray[0].includes("S")) &&
    (inputArray[1].includes("E") || inputArray[1].includes("W"))) {
    outputObject.latitude = inputArray[0].join(" ");
    outputObject.longitude = inputArray[1].join(" ");
  } else {
    // console.log("Invalid input");
  }
  return outputObject
}