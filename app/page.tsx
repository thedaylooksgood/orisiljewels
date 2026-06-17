import { Banner } from "@/components/Banner";
import { OurCollections } from "@/components/OurCollections";
import NewArrivalsParallax from "@/components/NewArrivals";
import { ShopByBudget } from "@/components/ShopByBudget";
import { ShineSection } from "@/components/ShineSection";
import { Bestsellers } from "@/components/Bestsellers";
import { InstagramShop } from "@/components/InstagramShop";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <Banner />
      <OurCollections />

      {/* Poster Banner Section */}
      <div className="w-full bg-white ">
        <div className="w-full relative h-[400px] overflow-hidden">
          <Image
            src="/poster.png"
            alt="Orisil Jewels Exclusive Collection Poster"
            fill
            priority
            className="object-fill hover:scale-[1.01] transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      <NewArrivalsParallax />
      <ShopByBudget />
      <ShineSection />
      <Bestsellers />
      <InstagramShop />

      {/* Rest of the page content can go here later */}
    </div>
  );
}

