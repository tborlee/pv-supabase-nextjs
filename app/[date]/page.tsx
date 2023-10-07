import React from "react";
import WalksContainer from "@/components/WalksContainer";
import supabase from "@/utils/supabase";
import {notFound} from "next/navigation";
import {withDiffMonths} from "@/utils/utils";
import Header from "@/components/Header";

export async function generateStaticParams() {
  const {data: dates} = await supabase.from('distinct_walk_dates').select('date').gte('date', withDiffMonths(-6)).lte('date', withDiffMonths(6))

  return dates!.map(({date}) => ({
    date,
  }))
}

export default async function Page({params}: { params: { date: string } }) {

  const parsed = Date.parse(params.date);

  if (isNaN(parsed)) {
    return notFound();
  }

  const response = await supabase.from('walks').select().eq('date', params.date)
  const walks = response.data || []
  const date = walks.length > 0 ? walks[0].date : null;

  return (
    <>
      <Header date={date}/>
      <WalksContainer walks={walks} />
    </>
  )
}