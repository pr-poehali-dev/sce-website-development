
import { 
  User, 
  UserRole, 
  SCEObject, 
  ContainmentClass, 
  RiskClass, 
  ClearanceLevel,
  DisruptionClass,
  Post,
  PostCategory
} from './types';

// Mock database storage
let users: User[] = [];
let sceObjects: SCEObject[] = [];
let posts: Post[] = [];

// Local storage keys
const USERS_KEY = 'sce_users';
const SCE_OBJECTS_KEY = 'sce_objects';
const POSTS_KEY = 'sce_posts';
const CURRENT_USER_KEY = 'sce_current_user';

// Load data from localStorage
export const loadData = () => {
  try {
    const storedUsers = localStorage.getItem(USERS_KEY);
    const storedSCEObjects = localStorage.getItem(SCE_OBJECTS_KEY);
    const storedPosts = localStorage.getItem(POSTS_KEY);

    users = storedUsers ? JSON.parse(storedUsers) : [];
    sceObjects = storedSCEObjects ? JSON.parse(storedSCEObjects) : [];
    posts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Convert date strings back to Date objects
    users = users.map(user => ({
      ...user,
      createdAt: new Date(user.createdAt)
    }));
    
    sceObjects = sceObjects.map(obj => ({
      ...obj,
      createdAt: new Date(obj.createdAt),
      updatedAt: new Date(obj.updatedAt)
    }));
    
    posts = posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }));
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    users = [];
    sceObjects = [];
    posts = [];
  }
};

// Save data to localStorage
export const saveData = () => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SCE_OBJECTS_KEY, JSON.stringify(sceObjects));
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

// User functions
export const createUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const newUser: User = {
    ...user,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date(),
  };
  
  // If this is the first user, make them an admin
  if (users.length === 0) {
    newUser.role = UserRole.ADMIN;
    newUser.verified = true;
  }
  
  users.push(newUser);
  saveData();
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const verifyUser = (id: string): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex >= 0) {
    users[userIndex].verified = true;
    saveData();
    return true;
  }
  return false;
};

export const updateUserRole = (id: string, role: UserRole): boolean => {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex >= 0) {
    users[userIndex].role = role;
    saveData();
    return true;
  }
  return false;
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  if (!userId) return null;
  
  return findUserById(userId) || null;
};

export const setCurrentUser = (userId: string | null) => {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// SCE Object functions
export const createSCEObject = (object: Omit<SCEObject, 'id' | 'createdAt' | 'updatedAt'>): SCEObject => {
  const newObject: SCEObject = {
    ...object,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  sceObjects.push(newObject);
  saveData();
  return newObject;
};

export const getSCEObjects = (): SCEObject[] => {
  return [...sceObjects];
};

export const getSCEObjectById = (id: string): SCEObject | undefined => {
  return sceObjects.find(obj => obj.id === id);
};

export const updateSCEObject = (id: string, updates: Partial<SCEObject>): boolean => {
  const objectIndex = sceObjects.findIndex(obj => obj.id === id);
  if (objectIndex >= 0) {
    sceObjects[objectIndex] = {
      ...sceObjects[objectIndex],
      ...updates,
      updatedAt: new Date(),
    };
    saveData();
    return true;
  }
  return false;
};

export const deleteSCEObject = (id: string): boolean => {
  const initialLength = sceObjects.length;
  sceObjects = sceObjects.filter(obj => obj.id !== id);
  if (sceObjects.length !== initialLength) {
    saveData();
    return true;
  }
  return false;
};

// Post functions
export const createPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
  const newPost: Post = {
    ...post,
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  posts.push(newPost);
  saveData();
  return newPost;
};

export const getPosts = (): Post[] => {
  return [...posts];
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const updatePost = (id: string, updates: Partial<Post>): boolean => {
  const postIndex = posts.findIndex(post => post.id === id);
  if (postIndex >= 0) {
    posts[postIndex] = {
      ...posts[postIndex],
      ...updates,
      updatedAt: new Date(),
    };
    saveData();
    return true;
  }
  return false;
};

export const deletePost = (id: string): boolean => {
  const initialLength = posts.length;
  posts = posts.filter(post => post.id !== id);
  if (posts.length !== initialLength) {
    saveData();
    return true;
  }
  return false;
};

// Initialize mock data
export const initializeMockData = () => {
  loadData();
  
  // Create initial admin user if no users exist
  if (users.length === 0) {
    createUser({
      email: "artemkauniti@gmail.com",
      username: "Основатель",
      role: UserRole.ADMIN,
      verified: true
    });
    
    // Reset password for founder account
    const founderUser = findUserByEmail("artemkauniti@gmail.com");
    if (founderUser) {
      localStorage.setItem("sce_user_" + founderUser.id, "Vmpgg2123");
    }
  }

  saveData();
};
