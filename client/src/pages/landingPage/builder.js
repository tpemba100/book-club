import React, { useEffect, useState } from "react";
import { BuilderComponent, builder } from "@builder.io/react";

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

      <h1>Homepage</h1>
      <div style={{ width: "70%" }}>
        {/* Using Buuilder io for homepage */}
        {homepage && <BuilderComponent model="homepage" content={homepage} />}
      </div>
      {/* Put your footer here. */}
    </>
  );
}

// "@builder.io/react": "^3.2.9",
