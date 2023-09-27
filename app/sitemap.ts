import supabase from "@/utils/supabase";

export default async function sitemap() {
  const { data: dates } = await supabase.from('distinct_walk_dates').select()

  return (
    dates?.map(({ date }) => ({
      url: `http://localhost:3000/${date}`,
      lastModified: new Date(),
    })) ?? []
  )
}