import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const { walk_id } = await request.json()
  const supabase = createRouteHandlerClient({ cookies })

  const response = await supabase.from("favorite_walks").upsert({walk_id}).select()

  return NextResponse.json(response.data);
}
