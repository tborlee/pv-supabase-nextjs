import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {NextResponse} from 'next/server'

export const dynamic = 'force-dynamic'

export async function DELETE(request: Request) {
  const requestUrl = new URL(request.url)
  const {walk_id, redirect} = await request.json()
  const supabase = createRouteHandlerClient({cookies})

  const response = await supabase.from("favorite_walks").delete().eq("walk_id", walk_id)

  if (redirect) {
    return NextResponse.redirect(`${requestUrl.origin}/favorite_walks`)
  } else {
    return NextResponse.json({});
  }
}
