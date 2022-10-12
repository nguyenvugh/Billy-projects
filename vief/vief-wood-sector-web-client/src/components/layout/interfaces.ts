import { BaseEntities, Fields } from "@/src/common/interfaces/common.interface";

export interface NavbarProps {
  data: Categories[];
  total: number;
}
export interface Categories extends BaseEntities {
  type: string;
  isFeature: string;
  field: Fields;
  name: string;
  path: string;
  thumbnail: Thumbnails;
}
export interface Thumbnails {
  id: number;
  url: string;
}

export interface FormLogin {
  email: string;
  password: string;
}

export interface FormForgotPassword {
  email: string;
}

export interface FormResetPassword {
  password: string;
  confirmPassword: string;
}
