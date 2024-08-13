import React, { useEffect, useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";
import Logo from "../../assets/book_club_logo/bookShareLogoBox.png";

// Replace with your Public API Key.
builder.init("8093db580a504e2db47a64e7bcd1f7d9");

export default function Page() {
  const [homepage, setHomepage] = useState(null);

  useEffect(() => {
    builder
      .get("homepage")
      .toPromise()
      .then((homepageData) => setHomepage(homepageData));
  }, []);

  return (
    <>
      {/* Put your header here. */}
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container-fluid">
          <img
            src={Logo}
            alt="Logo"
            class="img-fluid"
            style={{ maxWidth: "70px", height: "auto" }}
          />
        </div>
      </nav>

      <div>
        {/* Using Buuilder io for homepage */}
        {homepage && <BuilderComponent model="homepage" content={homepage} />}
      </div>
      {/* Put your footer here. */}
    </>
  );
}

// "@builder.io/react": "^3.2.9",
