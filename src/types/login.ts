export interface LoginRequest {
  email: string,
  password: string,
}

export interface LoginResponse {
  token: string,
  role: string,
}

export interface LoginUserData {
  email: string,
  role: string,
}


