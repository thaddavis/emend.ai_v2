import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { PlatformFeatures } from "@/components/PlatformFeatures";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Emend.ai - Environment Insight</title>
        <meta
          name="description"
          content="Emend.ai leverages the latest in A.I. big data algorithms to provide unprecedented insight into our environment."
        />
      </Head>
      <Nav />
      <Hero />
      <PlatformFeatures />
      <Footer />
    </>
  );
}
