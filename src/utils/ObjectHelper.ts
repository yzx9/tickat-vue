export default class ObjectHelper {
  public static clone(obj: object) {
    return JSON.parse(JSON.stringify(obj))
  }
}
