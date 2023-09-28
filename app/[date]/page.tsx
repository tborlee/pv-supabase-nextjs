import React from "react";
import WalksContainer from "@/components/WalksContainer";
import supabase from "@/utils/supabase";

export async function generateStaticParams() {
  const {data: dates} = await supabase.from('distinct_walk_dates').select('date')

  return dates!.map(({date}) => ({
    date,
  }))
}

export default function Page({params}: { params: { date: string } }) {
  return (
    <>
      <WalksContainer date={params.date}/>
    </>
  )
}