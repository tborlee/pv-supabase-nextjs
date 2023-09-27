import WalkCard from "@/components/WalkCard";

export default function WalksStatic({walks}) {
  return (
    <div>
      {walks?.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </div>
  )
}