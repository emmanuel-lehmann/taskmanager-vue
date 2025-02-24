import type { User } from './User';

export interface Task {
    id: number;
    title: string;
    assignedTo?: User | null;
    status: 'INCOMPLETE' | 'COMPLETED';
}
