import axios from 'axios';

const API_KEY = '37350877-77f32dcceabb953f1945ab0af';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getMaterials = async (quary, page, per_page) => {
  const response = await axios.get(
    `?q=${quary}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return response.data;
};
