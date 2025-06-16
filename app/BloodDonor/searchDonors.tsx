import { router } from 'expo-router';

export const searchDonors = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`https://mom-beta-server1.onrender.com/api/donar/donar?${query}`);
    const data = await response.json();

    if (!response.ok || !data.length) {
      throw new Error(data.message || 'No donors found.');
    }

    return data;
  } catch (error) {
    router.replace('/ErrorScreens/page404')

    return []
  }
};