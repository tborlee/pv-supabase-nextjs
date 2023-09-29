import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const {walk_id} = await request.json()
  const supabase = createRouteHandlerClient({cookies})

  // @ts-ignore
  const {data: {session: {user}}} = await supabase.auth.getSession();

  const response = await supabase.from("favorite_walks").upsert({walk_id, user_id: user.id}).select()

  if (response.error) {
    return new Response(JSON.stringify({error: response.error}), {status: 500});
  } else {
    return NextResponse.json(response.data);
  }
}
