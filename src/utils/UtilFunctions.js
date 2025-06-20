// utils/formatHelpers.js

import { StorageUtils } from "./StorageUtils";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};
export const formatTime = (timeString) => {
  if (!timeString || typeof timeString !== 'string') return 'Time not available';

  const [hours, minutes] = timeString.split(':');
  if (!hours || !minutes) return 'Time not available';

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }) + ' onwards';
};
// utils/UtilFunctions.js
export const formatDescription = (description, expanded, limit = 150) => {
  if (!description) return '';
  return expanded ? description : description.substring(0, limit).trim() + ' ';
};




export const getUserToken = async () => {
  try {
    const userData = await StorageUtils.getItem('userData');
    return userData?.token || null;
  } catch (error) {
    console.error('Error getting user token:', error);
    return null;
  }
};