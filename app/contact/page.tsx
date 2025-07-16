"use client";
import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaTelegram,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Contact = () => {

  return (
    <div className="min-h-[calc(100vh-4rem-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto p-4 sm:p-8 lg:p-12 w-full">
        <div className="space-y-6 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Contact
          </h1>
          <p className="text-foreground/80 leading-relaxed">
            I&apos;m always open to discussing new opportunities, collaborations, or
            just having a chat about technology. Feel free to reach out through
            any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <button
              onClick={() =>
                (window.location.href = "mailto:ingchina2004@gmail.com")
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaEnvelope className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Email</h3>
                <span className="text-foreground/70">
                  ingchina2004@gmail.com
                </span>
              </div>
            </button>

            <button
              onClick={() =>
                window.open("https://github.com/Ing-China", "_blank")
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaGithub className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">GitHub</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>

            <button
              onClick={() => window.open("https://t.me/Ing_China", "_blank")}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaTelegram className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Telegram</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>

            <button
              onClick={() =>
                window.open("https://www.facebook.com/brochai2004", "_blank")
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaFacebook className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Facebook</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <button
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/ing-china-9a3433319/",
                  "_blank"
                )
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaLinkedin className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">LinkedIn</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>

            <button
              onClick={() => window.open("https://x.com/IChina6677", "_blank")}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaTwitter className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Twitter</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>

            <button
              onClick={() =>
                window.open(
                  "https://www.instagram.com/china_asdfghjkl/",
                  "_blank"
                )
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaInstagram className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Instagram</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>

            <button
              onClick={() =>
                window.open("https://www.youtube.com/@IngChina", "_blank")
              }
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer text-left"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <FaYoutube className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">YouTube</h3>
                <span className="text-foreground/70">@ingchina</span>
              </div>
            </button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-3 py-2 border border-foreground/20 rounded-md bg-background text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-foreground text-background py-2 px-4 rounded-md hover:bg-foreground/90 transition-colors"
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
