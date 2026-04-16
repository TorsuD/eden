"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MailIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Get in Touch
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Contact <span className="text-green-600">Us</span>.
          </h1>
          <p className="text-gray-500 mt-5 leading-7">
            Have a question about a plant, an order, or just want to say hi?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* CONTACT FORM */}
          <div className="border rounded-2xl p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <MailIcon className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                <p className="text-gray-500 text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within 24
                  hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-green-600 text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block">
                    Full Name
                  </Label>
                  <Input id="name" placeholder="Derrick Torsu" required />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1.5 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="mb-1.5 block">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Question about my order"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 h-11"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-8 pt-4">
            <div>
              <h2 className="title-font text-3xl mb-6">
                Let&apos;s talk plants.
              </h2>
              <p className="text-gray-500 leading-7">
                Our team is available Monday through Saturday. We aim to respond
                to all inquiries within one business day.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <MailIcon className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    hello@edenplants.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <MapPinIcon className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-500 text-sm mt-0.5">Accra, Ghana</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <ClockIcon className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Hours</p>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Mon – Sat, 9am – 6pm GMT
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-200 rounded-2xl p-6">
              <p className="font-semibold text-gray-400 mb-1">Quick tip</p>
              <p className="text-gray-500 text-sm leading-6">
                For order-related questions, have your order number ready and
                we&apos;ll resolve it as fast as possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
