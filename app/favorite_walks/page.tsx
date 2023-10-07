import React from "react";
import FavoriteWalks from "@/components/FavoriteWalks";
import Header from "@/components/Header";

export default function Page() {
  return (
    <>
      <Header/>
      <h1>Favorite Walks</h1>
      <FavoriteWalks/>
    </>
  )
}