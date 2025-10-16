"use client";

import { useState } from "react";
import { Badge, Button } from "../ui";
import { ArrowDown, ArrowUp } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  technologies: string[];
  description: string[];
  goals: string[];
}
const experiences: Experience[] = [
  {
    company: "Mercado Libre",
    role: "Sr Software Engineer",
    period: "Oct 2022 - Jul 2025",
    technologies: [
      "Next.js",
      "TypeScript",
      "Redux Saga",
      "Styled Components",
      "SCSS",
      "BigQuery",
      "Kibana",
      "DataDog",
      "Jest",
      "Clean Architecture",
      "React Testing Library",
      "Cypress",
      "GitHub Actions",
    ],
    goals: [
      "Developed a chat application used across 7 Latin American countries, serving approximately 50 million users.",
      "Reduced customer support case creation by 20%, minimizing the need for staff allocation.",
      "Improved user intent understanding by 12% through integration with ChatGPT and LLM models.",
      "Implemented user interaction tracking with BigQuery, generating over 1 GB of data daily.",
    ],
    description: [
      "Worked closely with Product, UX, and Design teams within the Customer Experience (CX) area to ship user-centric features.",
      "Led the development of user support solutions, including the chatbot and the case creation and resolution flow inside the CRM.",
      "Owned observability for micro-frontend applications, ensuring usability, performance, and scalability across every Latin American country where Mercado Libre operates.",
    ],
  },
  {
    company: "Trybe",
    role: "Middle Software Engineer",
    period: "Feb 2020 - Oct 2022",
    technologies: [
      "JavaScript",
      "Node.js",
      "React",
      "Redux",
      "Jest",
      "Cypress",
      "React Testing Library",
      "MongoDB",
      "PostgreSQL",
      "Docker",
    ],
    description: [
      "Developed a comprehensive educational platform providing development content, including instructional videos and coding examples, while tracking course progress.",
      "Taught classes and addressed student inquiries on development topics, fostering a collaborative learning environment.",
      "Automated various employee tasks through Slack integrations, enhancing operational efficiency.",
      "Created automated tests to validate student projects, ensuring high quality and adherence to best practices.",
      "Updated and maintained the lesson plans according to the market needs.",
    ],
    goals: [
      "Built a learning platform for 2,400 students with video lessons, coding examples, and progress tracking.",
      "Conducted lectures and provided mentoring, fostering a collaborative learning environment.",
      "Automated employee tasks via Slack integrations, saving 1 hour daily per employee.",
      "Created automated testing for student projects to ensure quality and adherence to best practices.",
      "Contributed to the training of 1,000 developers.",
    ],
  },
  {
    company: "Pro Ágil Development",
    role: "Junior Developer",
    period: "Jan 2019 - Dec 2019",
    technologies: ["React", "Jquery", "Redux", "SCSS"],
    description: [
      "Collaborated on enhancing user interfaces and improving overall user experience for a legal administration software using Next.js.",
      "Implemented design adjustments and optimizations that led to increased user satisfaction and efficiency.",
      "Worked closely with cross-functional teams to ensure seamless integration of front-end components.",
    ],
    goals: [
      "Improved UX and UI for legal software, leading to 7 new client acquisitions.",
      "Collaborated with cross-functional teams to integrate front-end components seamlessly.",
      "Trained 4 interns, with 2 subsequently hired.",
    ],
  },
  {
    company: "Eventou",
    role: "Intern Developer",
    period: "Jan 2018 - Dec 2018",
    technologies: [
      "React",
      "React Native",
      "Jquery",
      "Redux",
      "SCSS",
      "Bootstrap",
    ],
    description: [
      "Developed new interfaces and features for the event marketplace platform using React.",
      "Enhanced user experience for mobile websites and made adjustments to native applications using React Native.",
      "Created comprehensive documentation for software features and functionalities to streamline onboarding processes.",
    ],
    goals: [
      "Fixed bugs on marketplace platform, enhancing user experience and satisfaction.",
      "Developed new pages and features, contributing to increase in user engagement.",
      "Be hired as Junior Developer after internship period on a third company of the same group.",
    ],
  },
];

export default function ProfessionalExperience() {
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const [showTechnologies, setShowTechnologies] = useState<boolean>(false);

  const handleSelectCompany = (index: number) => {
    setSelectedCompany(index);
  };

  const handleToggleTechnologies = () => {
    setShowTechnologies(!showTechnologies);
  };

  return (
    <section>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:w-44 lg:flex-shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:space-y-1 lg:overflow-visible lg:pb-0">
            {experiences.map((exp, index) => (
              <button
                key={`${exp.company}-${index}`}
                onClick={() => handleSelectCompany(index)}
                className={`min-w-[150px] md:min-w-[200px] shrink-0 whitespace-nowrap text-left px-4 py-3 text-sm rounded-md transition-all duration-200 lg:min-w-0 lg:whitespace-normal ${
                  selectedCompany === index
                    ? "bg-white/90 text-primary font-medium lg:border-l-2 lg:border-[#9af6a3]"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full lg:flex-1">
          <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {experiences[selectedCompany].role}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {experiences[selectedCompany].period}
              </p>
            </div>

            <div className="mb-4 space-y-3 text-sm leading-relaxed text-foreground/80">
              {experiences[selectedCompany].description.map(
                (paragraph, descriptionIndex) => (
                  <p key={descriptionIndex}>{paragraph}</p>
                )
              )}
            </div>
            <div className="mb-4 border-l-2 border-[#9af6a3] pl-4">
              <h6 className="text-md font-medium text-foreground mb-2">
                Key Achievements:
              </h6>
              <ul className="space-y-3">
                {experiences[selectedCompany].goals.map((goal, goalIndex) => (
                  <li
                    key={goalIndex}
                    className="leading-5 text-sm text-foreground/80"
                  >
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                className={`transition-all duration-700 ease-in-out transform mt-2 `}
              >
                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="ghost"
                  onClick={handleToggleTechnologies}
                  asChild
                >
                  {showTechnologies ? (
                    <span>
                      <ArrowUp className="h-4 w-4" /> Hide Technologies
                    </span>
                  ) : (
                    <span>
                      <ArrowDown className="h-4 w-4" /> Show Technologies
                    </span>
                  )}
                </Button>
                <div
                  className={`transition-all duration-700 ease-in-out transform mt-4 text-sm text-foreground/80 w-full ${
                    showTechnologies ? "flex flex-wrap gap-2" : "hidden"
                  }`}
                >
                  {experiences[selectedCompany].technologies.map(
                    (tech, techIndex) => (
                      <Badge
                        className="rounded-full shadow-none bg-transparent border-[#121212] font-mono text-xs text-[#121212] hover:bg-black hover:text-white "
                        key={techIndex}
                      >
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
