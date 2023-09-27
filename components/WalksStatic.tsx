import WalkCard from "@/components/WalkCard";
import {Walk} from "@/types";

export default function WalksStatic({walks}: { walks: Walk[] }) {
  return (
    <div>
      {walks?.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </div>
  )
}