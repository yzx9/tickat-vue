export default class StorageOperator {
  localStorage = window.localStorage

  public get length() {
    return this.localStorage.length
  }

  public set(key: string, value: string | object) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    this.localStorage.setItem(key, value)
  }
  public get(key: string) {
    const value = this.localStorage.getItem(key) || ''

    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }
  public key(index: number) {
    return this.localStorage.key(index)
  }
  public remove(key: string) {
    this.localStorage.removeItem(key)
  }
  public clear() {
    this.localStorage.clear()
  }
}
