import {serve} from 'https://deno.land/std@0.177.0/http/server.ts'
import {createClient} from 'https://esm.sh/@supabase/supabase-js@2'

const baseUrl = "https://www.odwb.be/api/records/1.0/search/?dataset=points-verts-de-ladeps";
const pageSize = 500;

function convertWalk(apiWalk) {
  const fields = apiWalk.fields
  const walk = {}
  walk.id = fields.id
  walk.activity = fields.ativite === "Marche" ? "walk" : "orientation"
  walk.organizer = fields.groupement
  walk.entity = fields.entite
  walk.latitude = fields.latitude
  walk.longitude = fields.longitude
  walk.ign = fields.ign
  walk.locality = fields.localite
  walk.transport = fields.gare
  walk.meeting_point_info = fields.infos_rendez_vous
  walk.province = fields.province
  walk.contact_last_name = fields.nom
  walk.contact_first_name = fields.prenom
  walk.contact_phone_number = fields.gsm
  walk.status = fields.statut === "OK" ? "ok" : fields.statut === "Modifié" ? "modified" : "cancelled"
  walk.meeting_point = fields.lieu_de_rendez_vous
  walk.date = fields.date
  walk.fifteen_km = fields['15km'] === "Oui"
  walk.wheelchair = fields.pmr === "Oui"
  walk.extra_orientation = fields.orientation === "Oui"
  walk.guided = fields.balade_guidee === "Oui"
  walk.extra_walk = fields['10km'] === "Oui"
  walk.bike = fields.velo === "Oui"
  walk.mountain_bike = fields.vtt === "Oui"
  walk.water_supply = fields.ravitaillement === "Oui"
  walk.be_wapp = fields.bewapp === "Oui"
  walk.adep_sante = fields.adep_sante === "Oui"
  walk.created_at = apiWalk.record_timestamp
  walk.updated_at = apiWalk.record_timestamp
  return walk;
}

async function retrieveWalks() {
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
  return walks;
}

serve(async (_req: Request) => {
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')

    const walks = await retrieveWalks()
    const insert = await supabase.from('walks').upsert(walks)

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