import React from "react";
import WalksContainer from "@/components/WalksContainer";
import supabase from "@/utils/supabase";
import {notFound} from "next/navigation";
import {withDiffMonths} from "@/utils/utils";

export async function generateStaticParams() {
  const {data: dates} = await supabase.from('distinct_walk_dates').select('date').gte('date', withDiffMonths(-6)).lte('date', withDiffMonths(6))

  return dates!.map(({date}) => ({
    date,
  }))
}

export default function Page({params}: { params: { date: string } }) {

  const parsed = Date.parse(params.date);

  if (isNaN(parsed)) {
    return notFound();
  }

  return (
    <>
      <WalksContainer date={params.date}/>
    </>
  )
}