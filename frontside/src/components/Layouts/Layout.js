import { Outlet } from "react-router-dom"
import pageFooter from "./pageFooter"

const Layout = () => {
  return (
    <>
     <div className="App">
      <Outlet/>
     </div>
     <pageFooter/>
    </>
  )
}

export default Layout