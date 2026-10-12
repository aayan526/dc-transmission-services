/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LenisProvider } from './components/LenisProvider';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { ServicesSection } from './components/ServicesSection';
import { SymptomChecker } from './components/SymptomChecker';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BookingSection } from './components/BookingSection';
import { LocationHours } from './components/LocationHours';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);
  const [selectedSymptom, setSelectedSymptom] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string) => {
    setSelectedServiceId(serviceId);
    setSelectedSymptom(undefined);
    setIsBookingOpen(true);
  };

  const handleBookWithSymptom = (symptomTitle: string) => {
    setSelectedServiceId('free-road-test-diagnostics');
    setSelectedSymptom(symptomTitle);
    setIsBookingOpen(true);
  };

  return (
    <LenisProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
        {/* Navigation Bar */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section with Photo Slider */}
          <Hero onOpenBooking={() => handleOpenBooking()} />

          {/* Animated Stats Bar */}
          <StatsCounter />

          {/* 6 Core Transmission Services */}
          <ServicesSection onSelectServiceForBooking={handleOpenBooking} />

          {/* Interactive Diagnostic Symptom Checker */}
          <SymptomChecker onBookWithSymptom={handleBookWithSymptom} />

          {/* About Tom Fisher & OKC Heritage */}
          <AboutSection />

          {/* Verified Customer Reviews */}
          <TestimonialsSection />

          {/* Embedded Appointment Booking */}
          <BookingSection onOpenModal={handleOpenBooking} />

          {/* Hours & Location with Interactive Map */}
          <LocationHours />

          {/* FAQs & Contact Information */}
          <ContactSection />
        </main>

        {/* Global Footer with Mandatory Demo Disclaimer */}
        <Footer />

        {/* Reusable Booking Wizard Modal */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          initialServiceId={selectedServiceId}
          initialSymptom={selectedSymptom}
        />
      </div>
    </LenisProvider>
  );
}
