export interface FormValuesRegister {
  name: string;
  lastName: string;
  sendingInstitution: string;
  nationality: string;
  age: number | string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  healthProfessional: string | boolean | number;
  specialty: string;
  other: string;
  workArea: string;
  otherWorkArea: string;
  edition: string | string[];
  idioma: number;
  termsAndConditions: boolean;
}
