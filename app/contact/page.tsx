import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-[calc(100vh-4rem-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 w-full">
        <div className="space-y-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="text-foreground/80 max-w-2xl leading-relaxed">
            I'm always open to discussing new opportunities, collaborations, or
            just having a chat about technology. Feel free to reach out through
            any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaEnvelope className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <a
                  href="mailto:your.email@example.com"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  your.email@example.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaGithub className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">GitHub</h3>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  @yourusername
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaLinkedin className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">LinkedIn</h3>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  /in/yourprofile
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaTwitter className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Twitter</h3>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 hover:text-foreground transition-colors"
                >
                  @yourusername
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-8">Send Message</h2>
          <form className="max-w-5xl mx-auto space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/20 focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground placeholder-foreground/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/20 focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground placeholder-foreground/50"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/20 focus:border-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground placeholder-foreground/50 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
