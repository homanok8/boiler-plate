import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
   useEffect(() => {
      axios
         .get("/api/hello")
         .then((response) => console.log(response))
         .catch((e) => console.log(e));
   }, []);

   return <div>LandingPage</div>;
}

export default LandingPage;
