import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Historia from "@/components/Historia";
import Beneficios from "@/components/Beneficios";
import Galeria from "@/components/Galeria";
import TourCasa from "@/components/TourCasa";
import ExMoradores from "@/components/ExMoradores";
import MapaWrapper from "@/components/MapaWrapper";
import RankingCursos from "@/components/RankingCursos";
import Agenda from "@/components/Agenda";
import InstagramFeed from "@/components/InstagramFeed";
import Formulario from "@/components/Formulario";
import Contato from "@/components/Contato";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      <Navbar />

      <section id="inicio">
        <Hero />
      </section>

      <section id="historia" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <Historia />
        </div>
      </section>

      <section id="beneficios" className="section-padding">
        <div className="container-max">
          <Beneficios />
        </div>
      </section>

      <section id="galeria" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <Galeria />
        </div>
      </section>

      <section id="tour" className="section-padding">
        <div className="container-max">
          <TourCasa />
        </div>
      </section>

      <section id="ex-moradores" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <ExMoradores />
        </div>
      </section>

      <section id="mapa" className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="section-title gradient-text">Quintal pelo Mundo</h2>
            <p className="section-subtitle">
              Quem passou pela Quintal levou um pedaço dela pra onde foi. E a rede só cresce.
            </p>
          </div>
          <MapaWrapper />
        </div>
      </section>

      <section id="ranking" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <RankingCursos />
        </div>
      </section>

      <section id="agenda" className="section-padding">
        <div className="container-max">
          <Agenda />
        </div>
      </section>

      <section id="instagram" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <InstagramFeed />
        </div>
      </section>

      <section id="formulario" className="section-padding">
        <div className="container-max">
          <Formulario />
        </div>
      </section>

      <section id="contato" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-max">
          <Contato />
        </div>
      </section>

      <Footer />
    </main>
  );
}
