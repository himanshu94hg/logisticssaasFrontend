export const percentage = (value,total) => {
    return  total===0?`(0)%`: `(${parseInt((value / total) * 100)}%)`
  }
