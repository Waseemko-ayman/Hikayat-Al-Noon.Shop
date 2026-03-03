export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneReqExp = /^\+[1-9]\d{7,14}$/;
export const alphanumericWithArabicRegex = /^[A-Za-z\u0621-\u064A0-9_ ]{2,}$/;
export const messageRegex = /^[\s\S]{20,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
