import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Tutor {
    id: number;
    name: string;
    description: string;
    category: string;
    image: string;
    subjects: string[];
}


export interface Language {
    id: number | string;
    name: string;
}

export interface Course {}

export interface Subject {
  id: number | string;
  name: string;
  description: number | null;
  image: string | null;
  is_active: boolean | null;
  requested_by_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
