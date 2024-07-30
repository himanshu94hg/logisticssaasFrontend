export const percentage = (value, total) => {
  return total === 0 ? `(0)%` : `(${parseInt((value / total) * 100)}%)`
}

export const capatlize = (value) => {
  return value.charAt(0).toUpperCase() + value?.slice(1)
}

export function formatNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number < 100000) {
    return (number / 1000).toFixed(1) + 'K';
  } else if (number < 10000000) {
    return (number / 100000).toFixed(1) + 'L';
  } else if (number < 1000000000) {
    return (number / 10000000).toFixed(1) + 'Cr';
  } else {
    return (number / 100000000).toFixed(1) + 'B';
  }
}


export const weightCalculation = (res) => {
  return res / 1000
}

export const weightGreater = (args1, args2) => {
  const data1=parseFloat(args1/1000)
  const data2=parseFloat(args2/1000)
  if (data1 > data2) {
    return `${parseFloat(data1)}`;
  } else if (data1 < data2) {
    return `${parseFloat(data2).toFixed(2)}`;
  } else {
    return `${parseFloat(data1).toFixed(2)}`;
  }
}