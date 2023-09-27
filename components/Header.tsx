import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Header({date}) {
  const supabase = createServerComponentClient({cookies})

  const {
    data: {user},
  } = await supabase.auth.getUser()
  
  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex align-items-center col-md-9 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src="marker.png" alt="ADEPS logo" width="32" height="32" />
        <span className="fs-4">ADEPS walks on {date}</span>
      </a>

      <div className="col-md-3 text-end">
        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <LogoutButton/>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline-primary me-2">Login</Link>
        )}

      </div>
    </header>
  )
}