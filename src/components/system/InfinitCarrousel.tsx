import Image from "next/image";

const techLogos = [
  { src: "/tech/git.png", alt: "Git" },
  { src: "/tech/github.png", alt: "GitHub" },
  { src: "/tech/react.png", alt: "React" },
  { src: "/tech/redux.png", alt: "Redux" },
  { src: "/tech/next.png", alt: "Next.js" },
  { src: "/tech/tailwind.png", alt: "Tailwind CSS" },
  { src: "/tech/typescript.avif", alt: "TypeScript" },
  { src: "/tech/jenkins.png", alt: "Jenkins" },
  { src: "/tech/node.png", alt: "Node.js" },
  { src: "/tech/github-actions.png", alt: "GitHub Actions" },
  { src: "/tech/cursor.png", alt: "Cursor" },
];

const duplicatedLogos = [...techLogos, ...techLogos];

export default function InfinitCarrousel() {
  return (
    <section
      aria-label="Tecnologias dominadas"
      className="group relative w-full overflow-hidden"
    >
      <div className="flex w-max items-center gap-12 animate-carousel group-hover:[animation-play-state:paused]">
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="group/item relative h-16 w-32 shrink-0 overflow-hidden rounded-xl p-4 transition-colors duration-200 ease-out hover:bg-muted"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 768px) 50vw, 15vw"
              className="object-contain transition duration-200 ease-out "
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
