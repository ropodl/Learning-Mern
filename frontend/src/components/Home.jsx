import React from "react";

import Container from "./Container";
import NotVerified from "./user/NotVerified";

export default function Home() {
  return (
    <>
      <NotVerified />
      <Container>Home</Container>
    </>
  );
}
