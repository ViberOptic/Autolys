// src/services/userService.js

const USER_PROFILE_KEY = 'user_profile';
const USER_IDENTIFIER_KEY = 'user_identifier';

export const getUserIdentifier = () => {
  // -----------------------------------------------------------
  // PENTING: Ganti tulisan di bawah ini dengan ID dari Supabase
  // Contoh: const STATIC_ID = 'user_1740615291234_ab12cd34';
  // -----------------------------------------------------------
  
  // PASTE ID DARI SUPABASE DI SINI (di dalam tanda kutip):
  const STATIC_ID = 'user_1764176162219_2voqbw54q'; 
  
  // Kode ini memaksa localStorage untuk menggunakan ID tersebut
  // sehingga HP dan Desktop akan membaca data yang sama.
  if (localStorage.getItem(USER_IDENTIFIER_KEY) !== STATIC_ID) {
    localStorage.setItem(USER_IDENTIFIER_KEY, STATIC_ID);
  }
  
  return STATIC_ID;
};

export const getUserProfile = () => {
  try {
    const profile = localStorage.getItem(USER_PROFILE_KEY);
    if (profile) return JSON.parse(profile);
    return { username: 'Pengguna', avatar: null, bio: '', userId: getUserIdentifier() };
  } catch (error) {
    return { username: 'Pengguna', avatar: null, bio: '', userId: getUserIdentifier() };
  }
};

export const saveUserProfile = (profile) => {
  try {
    const userId = getUserIdentifier();
    const profileData = { ...profile, userId, updatedAt: new Date().toISOString() };
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
    return { success: true, data: profileData };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateAvatar = (avatarBase64) => {
  try {
    const profile = getUserProfile();
    profile.avatar = avatarBase64;
    return saveUserProfile(profile);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUsername = (username) => {
  try {
    const profile = getUserProfile();
    profile.username = username.trim() || 'Pengguna';
    return saveUserProfile(profile);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateBio = (bio) => {
  try {
    const profile = getUserProfile();
    profile.bio = bio.trim();
    return saveUserProfile(profile);
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default {
  getUserIdentifier,
  getUserProfile,
  saveUserProfile,
  updateAvatar,
  updateUsername,
  updateBio
};