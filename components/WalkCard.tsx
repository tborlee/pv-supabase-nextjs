import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faWalking} from "@fortawesome/free-solid-svg-icons/faWalking";
import {faCompass} from "@fortawesome/free-solid-svg-icons/faCompass";
import {faMapMarker} from "@fortawesome/free-solid-svg-icons/faMapMarker";
import {faWheelchair} from "@fortawesome/free-solid-svg-icons/faWheelchair";
import {faBabyCarriage} from "@fortawesome/free-solid-svg-icons/faBabyCarriage";
import {faBinoculars} from "@fortawesome/free-solid-svg-icons/faBinoculars";
import {faBiking} from "@fortawesome/free-solid-svg-icons/faBiking";
import {faWater} from "@fortawesome/free-solid-svg-icons/faWater";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faTrain} from "@fortawesome/free-solid-svg-icons/faTrain";
import {faDumbbell} from "@fortawesome/free-solid-svg-icons";
import WalkThumbnail from "@/components/WalkThumbnail";
import {Walk} from "@/types";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import WalkFavorite from "@/components/WalkFavorite";

export default function WalkCard({walk, onDelete}: { walk: Walk, onDelete?: () => void }) {
  return (
    <div
      id={`walk-${walk.id}`}
      key={walk.id}
      className="card mb-4 mt-4"
    >
      <div className="card-header">
        <div className="row g-0  align-items-center">
          <div className="col-auto">
            <FontAwesomeIcon
              icon={
                walk.activity === "walk" ? faWalking : faCompass
              }
              fixedWidth={true}
            />
          </div>
          <div className="col">
            {walk.locality}{" "}
            <span className="is-hidden-mobile">({walk.province})</span>
          </div>
          <div className="col-auto">
            <WalkFavorite walk={walk} onDelete={onDelete}/>
            &nbsp;
            <WalkBadge walk={walk}/>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-auto has-text-centered">
            <WalkThumbnail walk={walk}/>
          </div>
          <div className="col row">
            <div className="col-12">
              <div className="row">
                <div className="col-auto">
                  <FontAwesomeIcon icon={faMapMarker} fixedWidth={true}/>
                </div>
                <div className="col">
                  <a href={`geo:${walk.latitude},${walk.longitude}`}>
                    {walk.meeting_point}
                  </a>
                  <span>
                {" "}
                    <WalkDistance walk={walk}/>
              </span>
                  {walk.meeting_point_info !== undefined && (
                    <span> - {walk.meeting_point_info}</span>
                  )}
                </div>
              </div>
            </div>
            <WalkInfo
              info={walk.fifteen_km}
              icon={faWalking}
              description="Parcours supplémentaire de 15&nbsp;km"
            />
            <WalkInfo
              info={walk.wheelchair}
              icon={faWheelchair}
              description="Parcours de 5&nbsp;km accessible aux PMRs accompagnées"
            />
            <WalkInfo
              info={walk.stroller}
              icon={faBabyCarriage}
              description="Parcours de 5&nbsp;km accessible aux landaus"
            />
            <WalkInfo
              info={walk.extra_orientation}
              icon={faCompass}
              description="Parcours supplémentaire d'orientation de +/- 8&nbsp;km Cartes I.G.N"
            />
            <WalkInfo
              info={walk.guided}
              icon={faBinoculars}
              description="Balade guidée Nature"
            />
            <WalkInfo
              info={walk.extra_walk}
              icon={faWalking}
              description="Parcours supplémentaire de marche de +/- 10&nbsp;km"
            />
            <WalkInfo
              info={walk.bike}
              icon={faBiking}
              description="Parcours supplémentaire de vélo de +/- 20&nbsp;km"
            />
            <WalkInfo
              info={walk.mountain_bike}
              icon={faBiking}
              description="Parcours supplémentaire de vélo tout-terrain"
            />
            <WalkInfo
              info={walk.water_supply}
              icon={faWater}
              description="Ravitaillement"
            />
            <WalkInfo
              info={walk.be_wapp}
              icon={faTrash}
              description="Wallonie Plus Propre"
            />
            <WalkInfo
              info={walk.adep_sante}
              icon={faDumbbell}
              description="Petits exercices réalisables sur le parcours de 5&nbsp;km"
            />
            {walk.transport !== null && (
              <div className="col">
                <div className="row is-mobile">
                  <div className="col-auto">
                    <FontAwesomeIcon icon={faTrain} fixedWidth={true}/>
                  </div>
                  <div className="col">{walk.transport}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="card-footer text-muted">
        Organized by <i>{walk.organizer}</i>
      </div>
    </div>
  )
}

const WalkInfo = ({info, icon, description}: { info: boolean, icon: IconProp, description: string }) => {
  if (info) {
    return (
      <div className="col-lg-6 col-md-12">
        <div className="row is-mobile">
          <div className="col-auto">
            <FontAwesomeIcon icon={icon} fixedWidth={true}/>
          </div>
          <div className="col">{description}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const WalkDistance = ({walk}: { walk: Walk }) => {
  if (walk.distance != null) {
    return <span>(à ~{walk.distance} km)</span>;
  } else {
    return null;
  }
};

const WalkBadge = ({walk}: { walk: Walk }) => {
  if (walk.status === "ok") {
    return (
      <span
        className="badge rounded-pill bg-success"
        title="Correspond au calendrier papier"
      >
        OK
      </span>
    );
  } else if (walk.status === "modified") {
    return (
      <span
        className="badge rounded-pill bg-warning"
        title="Modifié par rapport au calendrier papier"
      >
        Modifié
      </span>
    );
  } else if (walk.status === "cancelled") {
    return (
      <span
        className="badge rounded-pill bg-danger"
        title="Ce Point Vert est annulé !"
      >
        Annulé
      </span>
    );
  } else {
    return null;
  }
};
