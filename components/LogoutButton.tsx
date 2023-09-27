export default function LogoutButton() {
  return (
    <form action="/auth/sign-out" method="post">
      <button className="btn btn-light text-dark me-2">
        Logout
      </button>
    </form>
  )
}
