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
          setWalks(response.data.map((favorite) => favorite.walks));
        }
        if (response.error) {
          setError(error);
        }
        setLoading(false)
      })
    }
  }, [supabase]);
  
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
        You don't have any favorite walks yet.
      </div>
    )
  }

  return (
    <>
      {walks.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </>
  )
}