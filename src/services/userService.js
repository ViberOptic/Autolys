// src/services/userService.js
import { supabase } from '../config/supabase';

const USER_PROFILE_PREFIX = 'user_profile_';

const getCurrentUserId = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id || null;
};

export const getUserProfile = async () => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) return null;

    const profile = localStorage.getItem(`${USER_PROFILE_PREFIX}${userId}`);
    
    if (profile) {
      return JSON.parse(profile);
    }

    return { 
      username: 'Pengguna', 
      avatar: null, 
      bio: '', 
      userId: userId 
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
};

export const saveUserProfile = async (profile) => {
  try {
    const userId = await getCurrentUserId();
    if (!userId) throw new Error("User not authenticated");

    const profileData = { 
      ...profile, 
      userId, 
      updatedAt: new Date().toISOString() 
    };

    localStorage.setItem(`${USER_PROFILE_PREFIX}${userId}`, JSON.stringify(profileData));
    
    return { success: true, data: profileData };
  } catch (error) {
    console.error("Error saving profile:", error);
    return { success: false, message: error.message };
  }
};

export const updateAvatar = async (avatarBase64) => {
  const currentProfile = await getUserProfile();
  if (!currentProfile) return { success: false, message: "No active session" };
  
  return saveUserProfile({ ...currentProfile, avatar: avatarBase64 });
};

export const updateUsername = async (username) => {
  const currentProfile = await getUserProfile();
  if (!currentProfile) return { success: false, message: "No active session" };

  return saveUserProfile({ ...currentProfile, username: username?.trim() || 'Pengguna' });
};

export const updateBio = async (bio) => {
  const currentProfile = await getUserProfile();
  if (!currentProfile) return { success: false, message: "No active session" };

  return saveUserProfile({ ...currentProfile, bio: bio?.trim() });
};

export default {
  getUserProfile,
  saveUserProfile,
  updateAvatar,
  updateUsername,
  updateBio
};