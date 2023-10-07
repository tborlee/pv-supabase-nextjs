import WalksContainer from "@/components/WalksContainer";
import Header from "@/components/Header";
import supabase from "@/utils/supabase";

export default async function Index() {
  
  const response = await supabase.from('next_walks').select()
  const walks = response.data || [];
  const date = walks.length > 0 ? walks[0].date : null
  
  return (
    <>
      <Header date={date}/>
      <WalksContainer walks={walks}/>
    </>
  )
}
