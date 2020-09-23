import React from "react";
import LandingPage from "./app/screens/LandingPage";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LandingPage />
    </>
  );
}
