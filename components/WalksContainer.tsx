import WalksStatic from "@/components/WalksStatic";
import WalksGeo from "@/components/WalksGeo";
import Link from "next/link";
import supabase from "@/utils/supabase";
import dynamic from "next/dynamic";
import "./Map.css";

const Map = dynamic(() => import("@/components/Map"), {
  loading: () => (
    <div className="d-flex justify-content-center align-items-center leaflet-container">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ),
  ssr: false
})

function findDateIndex(dates: any[] | null, currentDate: string) {
  if (!dates) return -1;
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    if (date.date === currentDate) {
      return i;
    }
  }
  return -1;
}

export default async function WalksContainer({date}: { date: string }) {

  const {data: walks} = await supabase.from('walks').select().eq('date', date)
  const {data: dates} = await supabase.from('distinct_walk_dates').select('date')

  const currentIndex = findDateIndex(dates, date);
  const previousDate = dates && currentIndex >= 1 ? dates[currentIndex - 1].date : null;
  const nextDate = dates && currentIndex !== -1 && currentIndex < dates?.length - 1 ? dates[currentIndex + 1].date : null;

  if (!walks || walks.length === 0) {
    return (
      <div>Sorry, no walks scheduled on that date.</div>
    )
  } else {
    return (
      <>
        <div className="d-flex justify-content-between my-2">
          {previousDate && <Link href={previousDate} className="btn btn-outline-primary">{previousDate}</Link>}
          <h4>{date}</h4>
          {nextDate && <Link href={nextDate} className="btn btn-outline-primary">{nextDate}</Link>}
        </div>
        <Map walks={walks}/>
        <WalksStatic walks={walks}/>
      </>

    )
  }
}