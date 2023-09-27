import React from "react";
import WalksContainer from "@/components/WalksContainer";
import Header from "@/components/Header";

export default async function Page({params}: { params: { slug: string } }) {

  return (
    <>
      <Header date={params.slug}/>
      <WalksContainer date={params.slug}/>
    </>
  )
}