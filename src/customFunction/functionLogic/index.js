export const percentage = (value, total) => {
  return total === 0 ? `(0)%` : `(${parseInt((value / total) * 100)}%)`
}

export const capatlize = (value) => {
  return value.charAt(0).toUpperCase() + value?.slice(1)
}
