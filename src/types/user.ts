export interface UserItem {
    id: number;
    name: string;
}

export interface UserDetailsInfo {
    city: string;
    company: string;
    position: string;
}

export interface UserDetails {
    id: number;
    name: string;
    avatar: string;
    details: UserDetailsInfo;
}