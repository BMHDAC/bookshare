import { Outlet } from "react-router-dom"
import PageFooter from "./PageFooter"

const Layout = () => {
  return (
    <>
     <div className="App">
      <Outlet/>
     </div>
     <PageFooter/>
    </>
  )
}

export default Layout