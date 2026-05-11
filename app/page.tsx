import { Metadata } from "next";
import LandingPage from "./components/Landing";
import { ServiceTabs } from "./components/TabItem";
import { SpecialtyGroups } from "./components/SpecialtyGroups";
import { NewsTabs } from "./components/NewsTabs";

export const metadata: Metadata = {
  title: "سازمان نظام مهندسی ساختمان استان تهران",
  description: "سازمان نظام مهندسی ساختمان استان تهران",
};

export default async function HomePage() {
  return (
    <>
      <LandingPage />
      <ServiceTabs />
      <SpecialtyGroups />
      <NewsTabs />
    </>
  );
}
