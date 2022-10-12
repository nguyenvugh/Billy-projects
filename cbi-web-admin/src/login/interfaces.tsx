export interface Login {
  usernameOrEmail: string;
  password: string;
}

export interface LoginSuccessResponse {
  accessToken: string;
}
