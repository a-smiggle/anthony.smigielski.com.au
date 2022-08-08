import Supabase from './Supabase';

const GetArticle = async (id: number) => {
  const { data } = await Supabase.from('articles').select('*').eq('id', id);
  return data;
};

export default GetArticle;
