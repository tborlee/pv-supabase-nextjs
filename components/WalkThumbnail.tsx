import React from "react";

const mapboxAccessToken = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapboxUsername = process.env.MAPBOX_USERNAME || process.env.NEXT_PUBLIC_MAPBOX_USERNAME;
const mapStyle: string | undefined = process.env.MAPBOX_LIGHT_STYLE || process.env.NEXT_PUBLIC_MAPBOX_LIGHT_STYLE;
const res = "";

const WalkThumbnail = (walk) => {
  const position = `${walk.longitude},${walk.latitude}`;
  return (
    <img
      loading="lazy"
      width={150}
      height={150}
      aria-hidden={true}
      src={`https://api.mapbox.com/styles/v1/${mapboxUsername}/${mapStyle}/static/pin-s(${position})/${position},6,0,0/150x150${res}?access_token=${mapboxAccessToken}`}
      alt={`Carte de ${walk.locality}`}
      title={`Carte de ${walk.locality}`}
    />
  );
};

export default WalkThumbnail;
