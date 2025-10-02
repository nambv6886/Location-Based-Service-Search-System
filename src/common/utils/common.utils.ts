export class CommonUtils {
  public static isNotNullOrUndefined(value: any) {
    return typeof value !== 'undefined' && value != null;
  }

  public static isNullOrUndefined(value: any) {
    return typeof value === 'undefined' && value == null;
  }
}