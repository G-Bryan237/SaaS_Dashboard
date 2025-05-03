import { create } from 'zustand';

export type NotificationPriority = 'low' | 'medium' | 'high';

export type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  priority: NotificationPriority;
  type: 'info' | 'success' | 'warning' | 'error';
};

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'System Update',
    message: 'System will be updated in 30 minutes. Please save your work.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    priority: 'high',
    type: 'warning',
  },
  {
    id: '2',
    title: 'New User Registered',
    message: 'A new user has registered on the platform.',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    priority: 'low',
    type: 'info',
  },
  {
    id: '3',
    title: 'Task Completed',
    message: 'Your scheduled task has been completed successfully.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    priority: 'medium',
    type: 'success',
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'Multiple login attempts detected from unrecognized device.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    priority: 'high',
    type: 'error',
  }
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
  
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set({ 
        notifications: mockNotifications,
        unreadCount: mockNotifications.filter(n => !n.read).length,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch notifications' 
      });
    }
  },
  
  addNotification: (notification) => {
    const newNotification: Notification = {
      id: `${Date.now()}`,
      createdAt: new Date(),
      read: false,
      ...notification,
    };
    
    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1
    }));
  },
  
  markAsRead: (id) => {
    set(state => {
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );
      
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length
      };
    });
  },
  
  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({ ...notification, read: true })),
      unreadCount: 0
    }));
  },
  
  deleteNotification: (id) => {
    set(state => {
      const updatedNotifications = state.notifications.filter(
        notification => notification.id !== id
      );
      
      return {
        notifications: updatedNotifications,
        unreadCount: updatedNotifications.filter(n => !n.read).length
      };
    });
  },
  
  clearAllNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
  }
}));
