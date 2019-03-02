export default class GradientColor {
  /**
   * 生成渐变色数组
   * @param startColor 开始颜色
   * @param endColor 结束颜色
   * @param step 步数
   */
  public static getColorArray(
    startColor: string | number[],
    endColor: string | number[],
    step: number
  ) {
    // 验证是否为有效数据
    const isColor =
      (this.isRgb(startColor) || this.isHex(startColor)) &&
      (this.isRgb(endColor) || this.isHex(endColor))
    if (!isColor) {
      throw 'illegal hex color'
    }
    if (step <= 0) {
      throw 'illegal step'
    }
    // 转换为rgb数组模式
    if (typeof startColor === 'string') {
      startColor = this.hexToRgb(startColor)
    }
    let startR = startColor[0]
    let startG = startColor[1]
    let startB = startColor[2]

    if (typeof endColor === 'string') {
      endColor = this.hexToRgb(endColor)
    }
    let endR = endColor[0]
    let endG = endColor[1]
    let endB = endColor[2]

    // 步长
    let sR = (endR - startR) / step
    let sG = (endG - startG) / step
    let sB = (endB - startB) / step

    let colorArr = []
    for (let i = 0; i < step; i++) {
      // 计算每一步的hex值
      let hex = this.rgbToHex([
        sR * i + startR,
        sG * i + startG,
        sB * i + startB
      ])
      colorArr.push(hex)
    }
    return colorArr
  }

  /**
   * 生成当前渐变色
   * @param startColor 开始颜色
   * @param endColor 结束颜色
   * @param percentage 百分数0~1
   */
  public static getColorByPercentage(
    startColor: string | number[],
    endColor: string | number[],
    percentage: number
  ) {
    // 验证是否为有效数据
    const isColor =
      (this.isRgb(startColor) || this.isHex(startColor)) &&
      (this.isRgb(endColor) || this.isHex(endColor))
    if (!isColor) {
      throw 'illegal hex color'
    }
    // 大于 1 时返回开始颜色，小于 0 时返回结束颜色
    if (percentage >= 1) {
      if (this.isRgb(endColor)) {
        return this.rgbToHex(endColor)
      } else {
        return endColor
      }
    } else if (percentage <= 0) {
      if (this.isRgb(startColor)) {
        return this.rgbToHex(startColor)
      } else {
        return startColor
      }
    }
    // 转换为rgb数组模式
    if (typeof startColor === 'string') {
      startColor = this.hexToRgb(startColor)
    }
    let startR = startColor[0]
    let startG = startColor[1]
    let startB = startColor[2]

    if (typeof endColor === 'string') {
      endColor = this.hexToRgb(endColor)
    }
    let endR = endColor[0]
    let endG = endColor[1]
    let endB = endColor[2]

    //计算hex值
    return this.rgbToHex([
      (endR - startR) * percentage + startR,
      (endG - startG) * percentage + startG,
      (endB - startB) * percentage + startB
    ])
  }

  /**
   * 将hex表示方式转换为rgb表示方式
   * @param hex hex颜色
   */
  public static hexToRgb(hex: string) {
    if (!this.isHex(hex)) {
      throw 'illegal hex color'
    }

    hex = hex.toLowerCase()
    // 将三位颜色值转化为六位颜色值，#123 => #112233
    if (hex.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        const ch = hex.slice(i, i + 1)
        sColorNew += ch + ch
      }
      hex = sColorNew
    }
    // 处理六位的颜色值
    let rgb: number[] = []
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
    }
    return rgb
  }

  /**
   * 将rgb表示方式转化为hex表示方式
   * @param rgb rgb颜色
   */
  public static rgbToHex(rgb: string | number[]) {
    if (!this.isRgb(rgb)) {
      throw 'illegal rgb color'
    }

    const array: Number[] = []
    if (typeof rgb === 'string') {
      rgb
        .toLowerCase()
        .replace(' ', '')
        .slice(4)
        .split(',')
        .map(a => array.push(parseInt(a)))
    } else {
      rgb.map(a => array.push(Math.floor(a)))
    }

    let hex = '#'
    for (let a of array) {
      if (a >= 10) {
        hex += a.toString(16)
      } else {
        hex += '0' + a
      }
    }

    return hex
  }

  public static isHex(test: string | number[]) {
    if (typeof test !== 'string') {
      return false
    }
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    return test && reg.test(test)
  }

  public static isRgb(test: string | number[]) {
    if (typeof test === 'string') {
      return this.isRgbStr(test)
    } else {
      return test.length === 3
    }
  }

  public static isRgbStr(test: string) {
    test = test.replace(' ', '') // 删除空格
    const reg = /^rgb\([0-9]{0,3},[0-9]{0,3},[0-9]{0,3}\)/i
    return reg.test(test)
  }
}
