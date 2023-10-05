export type APIRecordFields = {
  velo: OuiNon;
  activite: Activity;
  orientation: OuiNon;
  pmr: OuiNon;
  ndeg_pv: string;
  ravitaillement: OuiNon;
  gare: string;
  groupement: string;
  balade_guidee: OuiNon;
  entite: string;
  bewapp: OuiNon;
  id: number;
  "15km": OuiNon;
  vtt: OuiNon;
  latitude: number;
  ign: string;
  localite: string;
  province: Province;
  nom: string;
  statut: Status;
  lieu_de_rendez_vous: string;
  poussettes: OuiNon;
  infos_rendez_vous: string;
  date: string;
  prenom: string;
  longitude: number;
  "10km": OuiNon;
  gsm: string;
  adep_sante: OuiNon;
};

export type APIDate = {
  x: { year: number; month: number; day: number };
  walk_count: number;
};

export type APIRecord = {
  datasetid: string;
  recordid: string;
  fields: APIRecordFields;
  record_timestamp: string;
};