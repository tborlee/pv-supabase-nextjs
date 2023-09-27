import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import WalksStatic from "@/components/WalksStatic";
import WalksGeo from "@/components/WalksGeo";

export default async function WalksContainer({date}) {

  const supabase = createServerComponentClient({cookies})

  const {data: walks} = await supabase.from('walks').select().eq('date', date)
  
  if(walks?.length === 0) {
    return (
      <div>Sorry, no walks scheduled on that date.</div>
    )
  } else {
    return <WalksStatic walks={walks} />
  }
}