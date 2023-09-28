"use client";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import {createClientComponentClient, User} from "@supabase/auth-helpers-nextjs";
import {useEffect, useState} from "react";

export default function UserHeader() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getUser().then((response) => {
      setUser(response.data.user);
      setLoading(false);
    }).catch(() => setLoading(false))
  }, []);

  if (loading) {
    return (
      <div className="spinner-border spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <span>Hey, {user.email}!</span>
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