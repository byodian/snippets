/**
 * * 一维数组转多维数组
 * * [{}, {}] => [[], []]
 * @param {Arrauy} params
 */
export const unflat = function (params) {
  if (!params) return
  return params.map(item => {
    let interValue = []
    Object.keys(item).forEach(key => {
      interValue.push(item[key])
    })
    return interValue
  })
}

/**
 * * 小数点数字转百分数
 * @param {Number} decimal
 */
export const toPercentage = function (decimal) {
  return Number((decimal * 100).toFixed(2))
}

/**
 * 简易防抖函数
 * @param {Function} func -防抖目标函数
 * @param {Number} delay - 防抖时间间隔
 */
 export const debounce = (func, delay) => {
  let timer
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

