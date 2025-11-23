"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

interface Testimonial {
  content: string;
  author: string;
  role?: string;
  avatar?: string;
  linkedin: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      "Wolf demonstrated excellent technical and teamwork skills, especially in React and JavaScript",
    author: "Roberto Cestari",
    role: "Founder - Codante.io",
    linkedin: "https://www.linkedin.com/in/robertotcestari/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/cestari-linkedin.jpeg",
  },
  {
    content:
      "He was always open to feedback, proactive in improving processes, and highly respected by both colleagues and students",
    author: "Leticia Bora",
    role: "Sr Software Engineer - ElectroNeek",
    linkedin: "https://www.linkedin.com/in/leticiabora/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/leticia-linkedin.jpeg",
  },
  {
    content:
      "Murillo is a highly skilled software engineer with a strong work ethic and a passion for learning. He consistently delivers high-quality work and is a pleasure to collaborate with.",
    author: "João Antonio Figueira",
    role: "Sr Software Engineer - Mercado livre",
    linkedin: "https://www.linkedin.com/in/joao-antonio-filgueiras/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/antonio-linkedin.jpeg",
  },
  {
    content:
      "Murillo is a dedicated and talented software engineer. His problem-solving skills and ability to work under pressure make him an asset to any team.",
    author: "Rafael Gustavo",
    role: "Founder - Eventou & Proagil",
    linkedin: "https://www.linkedin.com/in/rafaelgustavolv/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/rafa-linkedin.jpeg",
  },
  {
    content:
      "His attention to detail and ability to deliver high-quality solutions under tight deadlines is remarkable. A true professional.",
    author: "Francisco Marraci",
    role: "Teacher of Computer Science - UNOESTE",
    linkedin:
      "https://www.linkedin.com/in/francisco-virginio-maracci-30b6632a/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/chico-linkedin.jpeg",
  },
  {
    content:
      "His attention to detail and ability to deliver high-quality solutions under tight deadlines is remarkable. A true professional.",
    author: "João Venceslau",
    role: "Sr Software Engineer - Mercado Livre",
    linkedin: "https://www.linkedin.com/in/joao96neto/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/joao-linkedin.jpeg",
  },
  {
    content:
      "His reliability, positive attitude, and natural sense of humor made him not only a pleasure to work with but also a reference point for motivation and engagement within the team",
    author: "Marcelo Cajueiro",
    role: "Engineering Manager - Portábilis",
    linkedin: "https://www.linkedin.com/in/marcelocajueiro/",
    avatar:
      "https://velox-images-bucket.s3.sa-east-1.amazonaws.com/public/mwolfc/marcelo-linkedin.jpeg",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 2) % testimonials.length);
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const first = testimonials[currentIndex];
    const second = testimonials[(currentIndex + 1) % testimonials.length];
    return [first, second];
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section className="py-12 ">
      <div className="relative">
        <div
          className={`grid md:grid-cols-2 gap-4 transition-all duration-500 ${
            isAnimating
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={`${currentIndex}-${idx}`}
              className=" relative p-6 rounded-xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              <Quote className="absolute top-4 left-4 w-5 h-5 text-muted-foreground/20" />

              <blockquote className="relative flex justify-between flex-col h-full">
                <p className="text-sm text-foreground/90 leading-relaxed mb-4 pl-6">
                  {testimonial.content}
                </p>

                <footer className="flex items-center gap-2 pl-6">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
                    <Image
                      src={testimonial.avatar || "/default-avatar.png"}
                      alt={testimonial.author}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <cite className=" cursor-pointer hover:underline not-italic text-sm font-medium text-foreground">
                      <Link
                        href={testimonial.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {testimonial.author}{" "}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </cite>
                    {testimonial.role && (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {Array.from({ length: Math.ceil(testimonials.length / 2) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentIndex(index * 2);
                    setIsAnimating(false);
                  }, 500);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  Math.floor(currentIndex / 2) === index
                    ? "bg-foreground w-6"
                    : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonials ${index * 2 + 1} and ${
                  index * 2 + 2
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
