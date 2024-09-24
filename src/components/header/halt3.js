import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import "./header.css"
import "../layout.css"
import Oscuro from "../oscuro/oscuro"

const Halt3 = () => (
  <div className="halt3 hosc">
      <Link to="/">
      <StaticImage
        src="../../images/icons/logogeneradorqr.png"
        alt="patrimonio"
        width={350}
        height={80}
        class="imagen"
      />
    </Link>
    <Oscuro></Oscuro>
  </div>
)
export default Halt3