import { Request } from "express";
export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface LoginResult {
    user: Omit<User, "password">; // Return user without password
    token: string;
}

export interface AuthenticatedRequest extends Request {
    userId?: number;
}