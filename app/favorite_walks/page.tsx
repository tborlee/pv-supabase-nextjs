'use client'
import React, {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import WalkCard from "@/components/WalkCard";
import {Walk} from "@/types";

export default function Page() {
  const supabase = createClientComponentClient();
  const [walks, setWalks] = useState<Walk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (loading) {
      supabase.from('favorite_walks').select("walks(*)").then((response) => {
        if (response.data) {
          // @ts-ignore
          const unwrapped: Walk[] = response.data.map((favorite) => favorite.walks);
          for (const walk of unwrapped) {
            walk.favorite = true;
          }
          setWalks(unwrapped);
        }
        if (response.error) {
          setError(error);
        }
        setLoading(false)
      })
    }
  }, [supabase]);

  const deleteFavoriteWalk = async (id: number) => {
    try {
      await supabase.from('favorite_walks').delete().eq('walk_id', id).throwOnError()
      setWalks(walks.filter((x) => x.id != id))
    } catch (error) {
      console.log('error', error)
    }
  }
  
  return (
    <>
      <h1>Favorite Walks</h1>
      {loading && (
        <div className="d-flex justify-content-center m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Cannot retrieve favorite walks for the moment. Please try again later
        </div>
      )}
      {walks.length === 0 && (
        <div className="alert alert-info" role="alert">
          You don't have any favorite walks yet.
        </div>
      )}
      {walks.map((walk, i) => <WalkCard key={i} walk={walk} onDelete={() => deleteFavoriteWalk(walk.id)}/>)}
    </>
  )
}