import Messages from './messages'

export default function Login() {
  return (
    <div className="form-signin text-center">
      <form action="/auth/sign-in" method="post">
        <img className="mb-4" src="/marker.png" alt="" width="64" height="64"/>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input name="email" type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input name="password" type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary mb-3" type="submit">Sign in</button>
        <button className="w-100 btn btn-lg btn-secondary mb-3" formAction="/auth/sign-up">
          Sign Up
        </button>
        <Messages/>
      </form>
    </div>

  )
}
