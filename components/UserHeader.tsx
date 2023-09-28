import Link from "next/link";
import {createServerSupabaseClient} from "@/utils/supabase";

export const dynamic = 'force-dynamic'

export default async function UserHeader() {
  const supabase = createServerSupabaseClient();
  const response = await supabase.auth.getSession();

  if (response.data.session) {
    return (
      <>
        <ul className="nav">
          <li><Link href="/favorite_walks" className="nav-link px-2 link-dark">Favorites</Link></li>
        </ul>
        <form action="/auth/sign-out" method="post">
          <button className="btn btn-sm btn-light text-dark me-2">
            Logout
          </button>
        </form>
      </>
    )
  } else {
    return (
      <Link href="/login" className="btn btn-sm btn-outline-primary me-2">Login</Link>
    )
  }
}