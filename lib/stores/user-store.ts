import { create } from 'zustand';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'manager';
  status: 'active' | 'inactive' | 'pending';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
};

interface UserState {
  users: User[];
  selectedUser: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  updateUser: (id: string, data: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  selectUser: (user: User | null) => void;
}

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2023-08-10'),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'manager',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    createdAt: new Date('2023-03-22'),
    lastLogin: new Date('2023-08-05'),
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'user',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    createdAt: new Date('2023-05-12'),
    lastLogin: new Date('2023-07-20'),
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'user',
    status: 'pending',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    createdAt: new Date('2023-07-08'),
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david@example.com',
    role: 'manager',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    createdAt: new Date('2023-02-18'),
    lastLogin: new Date('2023-08-01'),
  },
];

export const useUserStore = create<UserState>((set) => ({
  users: [],
  selectedUser: null,
  isLoading: false,
  error: null,
  
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ users: mockUsers, isLoading: false, error: null });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch users' 
      });
    }
  },
  
  addUser: async (userData) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newUser: User = {
        id: `${Date.now()}`,
        createdAt: new Date(),
        ...userData,
      };
      set(state => ({ 
        users: [...state.users, newUser],
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to add user' 
      });
    }
  },
  
  updateUser: async (id, data) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        users: state.users.map(user => 
          user.id === id ? { ...user, ...data } : user
        ),
        selectedUser: state.selectedUser?.id === id ? 
          { ...state.selectedUser, ...data } : state.selectedUser,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to update user' 
      });
    }
  },
  
  deleteUser: async (id) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        users: state.users.filter(user => user.id !== id),
        selectedUser: state.selectedUser?.id === id ? null : state.selectedUser,
        isLoading: false,
        error: null
      }));
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to delete user' 
      });
    }
  },
  
  selectUser: (user) => {
    set({ selectedUser: user });
  }
}));
