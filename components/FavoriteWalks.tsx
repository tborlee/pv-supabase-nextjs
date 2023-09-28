"use client";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import React, {useEffect, useState} from "react";
import {Walk} from "@/types";
import WalkCard from "@/components/WalkCard";

export default function FavoriteWalks() {
  const supabase = createClientComponentClient();
  const [walks, setWalks] = useState<Walk[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

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
          setError(response.error.message);
        }
        setLoading(false)
      })
    }
  }, [supabase, loading]);

  const deleteFavoriteWalk = async (id: number) => {
    try {
      const response = await fetch("/favorite_walks/remove", {
        method: "DELETE",
        body: JSON.stringify({
          walk_id: id
        })
      });
      setWalks(walks.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error)
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Cannot retrieve favorite walks for the moment. Please try again later
      </div>
    )
  }

  if (walks.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        You don&apos;t have any favorite walks yet.
      </div>
    )
  }

  return (
    <>
      {walks.map((walk, i) => <WalkCard key={i} walk={walk} onDelete={() => deleteFavoriteWalk(walk.id)}/>)}
    </>
  )
}