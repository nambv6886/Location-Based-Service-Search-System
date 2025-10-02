export class MessageCode {
  public static readonly AUTHORIZATION_FORBIDDEN_RESOURCE = 'AUTHORIZATION_FORBIDDEN_RESOURCE';
  public static readonly EMAIL_IS_REQUIRED = 'EMAIL_IS_REQUIRED';
  public static readonly ROLE_IS_REQUIRED = 'ROLE_IS_REQUIRED';
  public static readonly EMAIL_IS_INVALID = 'EMAIL_IS_INVALID';
  public static readonly PASSWORD_IS_REQUIRED = 'PASSWORD_IS_REQUIRED';
  public static readonly PASSWORD_IS_INVALID_MIN_LENGTH = 'PASSWORD_IS_INVALID_MIN_LENGTH';
  public static readonly EMAIL_IS_EXISTED = 'EMAIL_IS_EXISTED';
  public static readonly SUCCESS = 'SUCCESS';
  public static readonly FAIL = 'FAIL';
  public static readonly NOT_FOUND = 'NOT_FOUND';
  public static readonly GET_LIST_PAGE_INDEX_NOT_NUMBER = 'Page index must be number';
  public static readonly GET_LIST_PAGE_SIZE_NOT_NUMBER = 'Page size must be number';
  public static readonly GET_LIST_PAGE_INDEX_REQUIRED = 'Page index is required';
  public static readonly GET_LIST_PAGE_SIZE_REQUIRED = 'Page size is required';
}