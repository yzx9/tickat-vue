export default class StorageOperator {
  static localStorage = window.localStorage

  public static get len() {
    return this.localStorage.length
  }

  public static set(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    this.localStorage.setItem(key, value)
  }
  public static get(key: string) {
    const value = this.localStorage.getItem(key) || ''

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  public static key(index: number) {
    return this.localStorage.key(index)
  }
  public static remove(key: string) {
    this.localStorage.removeItem(key)
  }
  public static clear() {
    this.localStorage.clear()
  }
}
