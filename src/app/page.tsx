"use client";

// COMPONENTE DO CARROSEL
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// COMPONENTE CHAKRA
import { Button } from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa6";

// HOOKS
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuthStatus from "@/hooks/useAuthStatus";

// SERVICES
import { getAllCategory } from "@/services/category";
import { getAllSponsor } from "@/services/sponsor";

export default function Home() {
  const [categories, setCategories] = useState<any[]>([]);
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoryData, sponsorData] = await Promise.all([
          getAllCategory(),
          getAllSponsor(),
        ]);
        setCategories(categoryData);
        setSponsors(sponsorData);
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-green-700 text-xl font-semibold">Carregando...</p>
      </div>
    );
  }

  return (
    <div className={isAuthenticated ? "lg:ml-56 sm:ml-0" : "ml-0"}>
      <div className="min-h-screen px-4 bg-white pb-16">
        <h2 className="text-center pt-4 text-2xl font-bold text-green-700 mb-8">
          Patrocinadores
        </h2>
        <div className="carousel-container pb-16 lg:px-20 xl:w-7/12">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={30}
            slidesPerView={1}
            className="rounded-lg shadow-lg overflow-hidden"
          >
            {sponsors.map((sponsor) => (
              <SwiperSlide key={sponsor.id} className="bg-white">
                <div className="carousel-item flex flex-col items-center text-center rounded-sm p-3">
                  <a href={sponsor.url} target="_blank" className="w-full">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-80 rounded-sm pb-5"
                    />
                  </a>
                  <h3 className="text-green-700 text-lg pb-2 font-semibold">
                    {sponsor.name}
                  </h3>
                  <p className="text-gray-600 break-all flex items-center gap-2">
                    <FaPhone />
                    {sponsor.contact}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
            Categorias
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {categories.length > 0 &&
              [...categories].reverse().map((categ) => (
                <li key={categ.id}>
                  <Link href={`/pages/categories/categoryid/${categ.id}`}>
                    <Button className="w-full md:w-10/12 bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition">
                      {categ.name}
                    </Button>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
