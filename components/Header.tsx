import UserHeader from "@/components/UserHeader";

export default function Header() {
  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 mb-4 border-bottom">
      <a href="/" className="d-flex gap-3 align-items-center col-md-7 mb-2 mb-md-0 text-dark text-decoration-none">
        <img src="marker.png" alt="ADEPS logo" width="32" height="32"/>
        <span className="fs-4">ADEPS walks</span>
      </a>

      <div className="col-md-5 text-end">
        <div className="d-flex gap-3 align-items-center justify-content-end">
          <UserHeader/>
        </div>
      </div>
    </header>
  )
}