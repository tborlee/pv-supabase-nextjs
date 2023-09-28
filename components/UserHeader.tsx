"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createClientComponentClient, Session, User} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

export default function UserHeader() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      supabase.auth.getSession().then((response) => {
        setSession(response.data.session);
        setLoading(false);
      }).catch(() => setLoading(false))
    }
  }, [supabase, loading]);

  if (loading) {
    return (
      <div className="spinner-border spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (session) {
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