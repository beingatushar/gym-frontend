export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    mobile?: string;
    avatar?: string;
}

// This now represents the actual data payload inside the backend's "data" property
export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password: string;
    mobile?: string;
}