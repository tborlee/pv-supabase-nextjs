import WalksContainer from "@/components/WalksContainer";
import supabase from "@/utils/supabase";

export default async function Index() {
  const today = new Date().toISOString().substring(0, 10);
  const {data} = await supabase.from('walks').select('date').gte('date', today).order('date', { ascending: true }).limit(1)

  if (data && data.length >= 1) {
    return (
      <>
        <WalksContainer date={data[0].date}/>
      </>
    )
  } else {
    return null;
  }
}
