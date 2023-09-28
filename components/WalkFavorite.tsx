'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as fav} from "@fortawesome/free-solid-svg-icons/faStar";
import {faStar as unfav} from "@fortawesome/free-regular-svg-icons/faStar";
import {useState} from "react";
import {Walk} from "@/types";

export default function WalkFavorite({walk, onDelete}: { walk: Walk, onDelete?: () => void }) {
  const [favorite, setFavorite] = useState<boolean>(walk.favorite || false);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = async (favorite: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/favorite_walks/${favorite ? 'add' : 'remove'}`, {
        method: favorite ? "POST" : "DELETE",
        body: JSON.stringify({
          walk_id: walk.id,
          redirect: true
        })
      });
      if (response.ok) {
        setFavorite(favorite);
      }
      setLoading(false);
    } catch(error) {
      console.error(error);
      setLoading(false);
    }
  }

  if (favorite) {
    return (
      <button type="submit" disabled={loading} className="btn btn-sm btn-dark" onClick={onDelete ? onDelete : () => onChange(false)}>
        <FontAwesomeIcon icon={fav}/>
      </button>
    )
  } else {
    return (
      <button type="submit" disabled={loading} className="btn btn-sm btn-outline-dark" onClick={() => onChange(true)}>
        <FontAwesomeIcon icon={unfav}/>
      </button>
    )
  }

}