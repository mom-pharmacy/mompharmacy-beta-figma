import apiClient from '@/utils/apiClient';

export const searchDonors = async (filters) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const data = await apiClient(`api/donar/donar?${query}`);

    if (!data || !data.length) {
      throw new Error('No donors found.');
    }

    return data;
  } catch (error) {
    console.error('Search donors error:', error.message || error);
    // router.replace('/ErrorScreens/page404');
    return [];
  }
};
