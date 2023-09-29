import {cookies} from 'next/headers'
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'

export const dynamic = 'force-dynamic'

export async function DELETE(request: Request) {
  const requestUrl = new URL(request.url)
  const {walk_id, redirect} = await request.json()
  const supabase = createRouteHandlerClient({cookies})

  const response = await supabase.from("favorite_walks").delete().eq("walk_id", walk_id)

  if (!response.error) {
    return new Response(null, {status: 204});
  } else {
    return new Response(JSON.stringify({error: "Cannot remove favorite walk"}), {status: 500})
  }
}
