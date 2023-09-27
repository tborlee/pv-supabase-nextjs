'use client';
import {useEffect, useState} from "react";
import WalkCard from "@/components/WalkCard";
import {getDistance} from "geolib";

const compareWalks = (a, b) => {
  if (
    (a.status === "OK" || a.status === "Modified") &&
    (b.status === "OK" || b.status === "Modified")
  ) {
    if (a.distance != null && b.distance != null) {
      return a.distance > b.distance ? 1 : -1;
    }
  } else {
    if (
      a.status === "Cancelled" &&
      b.status !== "Cancelled"
    ) {
      return 1;
    } else if (
      a.status !== "Cancelled" &&
      b.status === "Cancelled"
    ) {
      return -1;
    } else {
      if (a.distance != null && b.distance != null) {
        return a.distance > b.distance ? 1 : -1;
      }
      return 0;
    }
  }
  return 0;
};

async function sortWalks(position, walks) {
  const sorted = [...walks];
  for (let i = 0; i < walks.length; i++) {
    const walk = walks[i];
    const rawDistance = getDistance(
      {
        latitude: position.latitude,
        longitude: position.longitude,
      },
      {latitude: walk.latitude, longitude: walk.longitude}
    );
    walk.distance = Math.round(rawDistance / 1000);
  }
  walks.sort(compareWalks)
  return walks;
}

export default function WalksGeo({walks}) {
  const [sorted, setSorted] = useState([]);
  const [location, setLocation] = useState();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        const {latitude, longitude} = coords;
        setLocation({latitude, longitude});
      })
    }
  }, []);

  useEffect(() => {
    if (location) {
      sortWalks(location, walks).then(() => {
        setSorted([...walks]);
      })
    } else {
      setSorted(walks);
    }
  }, [location]);

  return (
    <div>
      {sorted?.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </div>
  )
}