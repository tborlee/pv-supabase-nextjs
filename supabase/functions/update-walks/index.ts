import {serve} from 'https://deno.land/std@0.177.0/http/server.ts'
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2'
import {Database, Tables} from '../../../database.types.ts'
import {APIRecord} from "../../../odwb.types";

const baseUrl = "https://www.odwb.be/api/records/1.0/search/?dataset=points-verts-de-ladeps"
const pageSize = 500

function convertWalk(apiWalk: APIRecord): Tables<'walks'> {
  const fields = apiWalk.fields
  return {
    id: fields.id,
    activity: fields.activite === "Marche" ? "walk" : "orientation",
    organizer: fields.groupement,
    entity: fields.entite,
    latitude: fields.latitude,
    longitude: fields.longitude,
    ign: fields.ign,
    locality: fields.localite,
    transport: fields.gare,
    meeting_point_info: fields.infos_rendez_vous,
    province: fields.province,
    contact_last_name: fields.nom,
    contact_first_name: fields.prenom,
    contact_phone_number: fields.gsm,
    status: fields.statut === "OK" ? "ok" : fields.statut === "Modifié" ? "modified" : "cancelled",
    meeting_point: fields.lieu_de_rendez_vous,
    date: fields.date,
    fifteen_km: fields['15km'] === "Oui",
    wheelchair: fields.pmr === "Oui",
    stroller: fields.poussettes === "Oui",
    extra_orientation: fields.orientation === "Oui",
    guided: fields.balade_guidee === "Oui",
    extra_walk: fields['10km'] === "Oui",
    bike: fields.velo === "Oui",
    mountain_bike: fields.vtt === "Oui",
    water_supply: fields.ravitaillement === "Oui",
    be_wapp: fields.bewapp === "Oui",
    adep_sante: fields.adep_sante === "Oui",
    created_at: apiWalk.record_timestamp,
    updated_at: apiWalk.record_timestamp,
  }
}

async function retrieveWalks(baseUrl: string) {
  const walks = []
  let finished = false
  let start = 0
  while (!finished) {
    const url = `${baseUrl}&rows=${pageSize}&start=${start}`
    const response = await fetch(url)
    if (response.ok) {
      const json = await response.json()
      for (const record of json.records) {
        let conflict = false
        const walk = convertWalk(record)
        for (const existing of walks) {
          if (existing.id === walk.id) {
            conflict = true
            break
          }
        }
        if (!conflict) {
          walks.push(walk)
        }
      }
      start = start + pageSize
      finished = json.nhits <= start
    } else {
      throw Error("Cannot retrieve walks from API: " + response.status)
    }
  }
  return walks
}

serve(async (_req: Request) => {
  try {
    const supabase = createClient<Database>(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')

    const {data, error} = await supabase.rpc('max_walk_updated_at')

    if (error) {
      return new Response(JSON.stringify(error), {
        status: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    }

    let url;

    if (!data) {
      console.info("No walks in database yes, fetching them all from the ODWB API...")
      url = baseUrl;
    } else {
      console.info("We already have walks in database. Updating...")
      url = `${baseUrl}&q=(record_timestamp+>${new Date(Date.parse(data)).toISOString()})`
    }

    const walks = await retrieveWalks(url)
    const insert = await supabase.from('walks').insert(walks)
    console.info("Walks inserted in database.")

    return new Response(JSON.stringify(insert), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  } catch (err) {
    console.error(err)
    return new Response(String(err?.message ?? err), {status: 500})
  }
})