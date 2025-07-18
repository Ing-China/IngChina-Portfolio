import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaGooglePlay,
  FaApple,
  FaArrowRight,
} from "react-icons/fa";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

interface ProjectDetailProps {
  params: Promise<{
    id: string;
  }>;
}

const ProjectDetail = async ({ params }: ProjectDetailProps) => {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="min-h-[calc(100vh-4rem-4rem)] py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors mb-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        {/* Project Image */}
        {project.image && (
          <div className="relative w-full h-[50vh] md:h-[80vh] bg-foreground/10 rounded-lg overflow-hidden mb-8">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Project Header */}
        <div className="space-y-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-foreground/80 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="space-y-3 text-foreground/80">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-foreground text-lg">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Project Details Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Project Info */}
          <div className="p-4 bg-foreground/5 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Project Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/70">Category:</span>
                <span className="font-medium text-foreground capitalize">
                  {project.category}
                </span>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="p-4 bg-foreground/5 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-foreground/10 text-foreground rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="p-4 bg-foreground/5 rounded-lg">
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <div className="space-y-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  <FaGithub className="w-4 h-4" />
                  View Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  <FaGooglePlay className="w-4 h-4" />
                  Play Store
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors text-sm"
                >
                  <FaApple className="w-4 h-4" />
                  App Store
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <div className="flex justify-between items-center">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.id}`}
                className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                <div>
                  <div className="text-sm text-foreground/60">Previous</div>
                  <div className="font-medium group-hover:underline">
                    {previousProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="group flex items-center gap-3 text-foreground/80 hover:text-foreground transition-colors text-right"
              >
                <div>
                  <div className="text-sm text-foreground/60">Next</div>
                  <div className="font-medium group-hover:underline">
                    {nextProject.title}
                  </div>
                </div>
                <FaArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
