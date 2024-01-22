export interface UserRegister{
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

export interface UserLogin{
    email: string,
    password: string,
}

export interface User{
    name: string,
    email: string,
    token: string,
}

export interface GoalInput {
    title: string, 
    description: string,
}


export interface Goal {
    user: string,
    id: string,
    title: string, 
    description: string,
    createdAt: any,
}

export interface AuthType {
    error: boolean,
    loading: boolean,
    success: boolean,
    message: string,
    user: User | null,
}

export interface GoalType {
    error: boolean,
    loading: boolean,
    success: boolean,
    message: string,
    goal: Goal,
    goals: Goal[],
}


