import React from "react";
import "./index.css";

export default function Marquee() {
  return (
    <>
      {" "}
      <link
        href="https://fonts.cdnfonts.com/css/constitution"
        rel="stylesheet"
      ></link>
      <p
        // aria-hidden="true"
        behavior="alternate"
        style={{
          fontSize: "50px",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: -1,
          whiteSpace: "nowrap",
        }}
        direction="right"
      >
        Tranquility, provide for the
        common defense, promote the general Welfare, and secure the Blessings of
        Liberty to ourselves and our Posterity, do ordain and establish this
        Constitution for the United States of America.
      </p>
      <p
        aria-hidden="true"
        behavior="alternate"
        style={{
          fontSize: "50px",
          fontFamily: "WeThePeople",
          position: "absolute",
          top: "65%",
          transform: "translateY(-85%)",
          zIndex: -1,
          whiteSpace: "nowrap",
        }}
        direction="left"
      >
        We the People of the United States, in Order to form a more perfect
        Union, establish Justice, insure domestic Tranquility, provide for the
        common defense, promote the general Welfare, and secure the Blessings of
        Liberty to ourselves and our Posterity, do ordain and establish this
        Constitution for the United States of America.
      </p>
    </>
  );
}
