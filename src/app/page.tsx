import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CodeXml, MapPin, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui";
import {
  InfinitCarrousel,
  ProjectList,
  TestimonialSection,
} from "@/components/system";
import meImage from "../../public/me.png";
import ProfessionalExperience from "@/components/system/ProfessionalExperience";

export default function Home() {
  return (
    <main className="font-sans relative mx-auto w-full max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8">
      <div className="grid grid-cols-1 gap-y-16 md:grid-cols-12 md:gap-x-8">
        <main className="md:col-span-8 md:col-start-3 h-full lg:h-[60vh] w-full flex flex-col gap-20">
          <section
            id="inicio"
            className="md:col-span-8 md:col-start-3 flex flex-col gap-10 text-center md:text-left"
          >
            <div className="text-left flex flex-col gap-4">
              <span className="text-sm font-semibold  tracking-[0.1em] text-muted-foreground">
                Hello there! I am
              </span>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl">
                Murillo Wolf
              </h1>
              <div className="w-full inline-flex items-start gap-3">
                <Badge className="rounded-full  hover:bg-white/95 border-b border-white/90 bg-white/95 backdrop-blur-md transition-colors text-foreground/80">
                  <CodeXml className="mr-2" size={16} />
                  Software Engineer
                </Badge>

                <Badge className="rounded-full  hover:bg-white/95 border-b border-white/90 bg-white/95 backdrop-blur-md transition-colors text-foreground/80">
                  <MapPin className="mr-2" size={16} />
                  Alexandria, VA
                </Badge>
              </div>
              <p className="w-full text-sm sm:text-lg text-[#121212] md:text-[14px] sm:w-3/4 leading-normal">
                I solve problems with beautiful design, good code and some
                <span className="text-[#5d3427] font-semibold">
                  {" "}
                  coffee.
                </span>{" "}
                <br /> My goal is to build products that are not only functional
                but also a joy to use.
              </p>
              <p className="text-lg text-muted-foreground md:text-xl"></p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 md:justify-start flex-row  md:items-start w-full">
              <Button className="gap-2 md:rounded-lg h-8 rounded-md px-3 text-xs md:text-sm md:h-10  md:px-8">
                <span>Projects that I&apos;m proud of</span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="md:rounded-lg h-8  px-3 text-xs md:text-sm md:h-10  md:px-8 bg-white/95 hover:bg-white/80 border border-muted-foreground hover:border-white hover:text-black gap-2 rounded-lg"
              >
                <Link
                  href="#testimonials"
                  className="inline-flex justify-center items-center"
                >
                  My Experience
                  <Users className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
          <section
            id="technologies"
            className="md:col-span-8 md:col-start-3 flex flex-col gap-6 py-12"
          >
            <InfinitCarrousel />
          </section>
        </main>
        <section
          id="about"
          className="md:col-span-8 md:col-start-3 h-full lg:h-[40vh] w-full flex flex-col py-12 md:py-6 mb-24 xl:my-18"
        >
          <div className="flex justify-evenly gap-6 md:gap-4 lg:gap-12 xl:gap-12 items-center w-full h-full flex-col lg:flex-row">
            <Image
              src={meImage}
              alt="Murillo Wolf"
              className="self-start rounded-2xl object-cover object-top h-full md:h-2/4 w-full lg:w-2/4 lg:h-full max-h-96 shadow-xl"
              width={200}
              height={200}
            />
            <div className="w-full text-left flex flex-col gap-4 self-start">
              <span className="text-sm font-semibold  tracking-[0.1em] text-muted-foreground">
                What I believe in
              </span>
              <h2 className="w-full text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl">
                Keep it simple
              </h2>
              <p className="w-full text-sm sm:text-lg text-[#121212] md:text-[14px]  leading-normal">
                I believe that technologies should be make life easier, not
                harder. Sometimes we get so caught up in the latest trends and
                buzzwords that we forget the most important thing: the user.
              </p>
              <p className="w-full text-sm sm:text-lg text-[#121212] md:text-[14px]  leading-normal">
                <span className="bg-[#9af6a380] ">
                  Maybe I don&apos;t create the most innovative solutions, but I
                  do create the most useful ones.
                </span>
              </p>
              <p className="text-lg text-muted-foreground md:text-xl"></p>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="md:col-span-8 md:col-start-3 flex flex-col gap-6 mb-44"
        >
          <header>
            <h2 className="text-4xl font-bold tracking-tight sm:text-3xl">
              Projects that I&apos;m proud of
            </h2>
            <p className="text-black/80 mt-1 text-sm">
              For me share is the best way to help others and learn at the same
              time.
              <br /> That is why I open source almost all of my projects.
            </p>
          </header>
          <ProjectList />
        </section>
        <section
          id="testimonials"
          className="md:col-span-8 md:col-start-3 flex flex-col gap-6"
        >
          <header>
            <h2 className="text-4xl font-bold tracking-tight sm:text-3xl">
              What people say about me
            </h2>
            <p className="text-black/80 mt-1 text-sm">
              I&apos;ve had the pleasure of working with some amazing people
              throughout my career. Here are a few words from some of them.
            </p>
          </header>
          <TestimonialSection />
        </section>
        <section
          id="testimonials"
          className="md:col-span-8 md:col-start-3 flex flex-col gap-6"
        >
          <header>
            <h2 className="text-4xl font-bold tracking-tight sm:text-3xl">
              Professional Experience
            </h2>
            <p className="text-black/80 mt-1 text-sm">
              Companies that I&apos;ve worked and goals that I&apos;ve achieved.
            </p>
          </header>
          <ProfessionalExperience />
        </section>
      </div>
    </main>
  );
}
