"use client";
import Landing from "@/public/assets/Landing.png";
import Image from "next/image";
export default function LandingPage() {
  return (
    <>
      <Image src={Landing} alt="asd" className="object-cover " />
    </>
  );
}
