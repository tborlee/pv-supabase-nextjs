import WalkCard from "@/components/WalkCard";
import {Walk} from "@/types";
import Map from "@/components/Map";

export default function WalksStatic({walks}: { walks: Walk[] }) {
  return (
    <div>
      <Map walks={walks} />
      {walks?.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </div>
  )
}