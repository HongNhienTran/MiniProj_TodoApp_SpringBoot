export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: LoginResponse | PromiseLike<LoginResponse>;
    token: string;
    type: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    data: RegisterResponse | PromiseLike<RegisterResponse>;
    id: number;
    fullName: string;
    email: string;
}