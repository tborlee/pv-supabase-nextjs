'use client';
import {useEffect, useState} from "react";
import WalkCard from "@/components/WalkCard";
import {getDistance} from "geolib";
import {Walk} from "@/types";
import Map from "@/components/Map";

const compareWalks = (a: Walk, b: Walk) => {
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

async function sortWalks(position: GeolocationCoordinates, walks: Walk[]) {
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

export default function WalksGeo({walks}: { walks: Walk[] }) {
  const [sorted, setSorted] = useState<Walk[]>([]);
  const [location, setLocation] = useState<GeolocationCoordinates>();

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({coords}) => {
        setLocation(coords);
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
      <Map walks={walks} />
      {sorted?.map((walk, i) => <WalkCard key={i} walk={walk}/>)}
    </div>
  )
}