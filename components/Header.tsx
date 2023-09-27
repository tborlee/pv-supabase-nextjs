"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

export default function Header() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      setUser(response.data.user);
    })
  }, []);

  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
      <a href="/" className="d-flex gap-3 align-items-center col-md-7 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src="marker.png" alt="ADEPS logo" width="32" height="32"/>
        <span className="fs-4">ADEPS walks</span>
      </a>

      <div className="col-md-5 text-end">
        {user ? (
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <span>Hey, {user.email}!</span>
            <LogoutButton/>
          </div>
        ) : (
          <Link href="/login" className="btn btn-outline-primary me-2">Login</Link>
        )}

      </div>
    </header>
  )
}