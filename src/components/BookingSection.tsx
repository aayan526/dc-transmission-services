import React, { useState } from 'react';
import { Calendar, Clock, Car, User, Phone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SERVICES_LIST, SHOP_INFO } from '../data/shopData';
import { BookingFormData } from '../types';

interface BookingSectionProps {
  onOpenModal: (serviceId?: string) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onOpenModal }) => {
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: 'free-road-test-diagnostics',
    customConcern: '',
    year: '2017',
    make: 'Ford',
    model: 'F-150',
    mileage: '98,000',
    preferredDate: getTomorrow(),
    preferredTime: '8:30 AM',
    fullName: '',
    phone: '',
    email: '',
    serviceMode: 'drop-off',
    notes: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit phone number (e.g. 405-677-7454).');
      return;
    }

    setErrorMsg('');
    const ref = 'DC-OKC-' + Math.floor(1000 + Math.random() * 9000);
    setBookingRef(ref);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData((prev) => ({
      ...prev,
      fullName: '',
      phone: '',
      email: '',
      notes: '',
      customConcern: '',
    }));
  };

  return (
    <section id="book" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Why Book Directly With Tom (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-bold uppercase tracking-wider text-amber-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Easy End-to-End Scheduling</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Book Your Free Road Test & Diagnostic Scan
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Skip the long waits and blind estimates. Reserve a 30-minute drop-off window directly with Tom Fisher at 4737 SE 29th St #5001. We test-drive your vehicle, read transmission computer codes, and provide an honest assessment before charging a dime.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <span className="font-bold text-xs">1</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Pick A Convenient Drop-Off Window</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Monday to Friday, 8:00 AM to 5:00 PM. Early morning key drop box available 24/7.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <span className="font-bold text-xs">2</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Master Technician Test Drive</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Tom Fisher or a 20+ year senior transmission mechanic road tests your vehicle on OKC roads.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-700 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <span className="font-bold text-xs">3</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Honest Written Estimate or All-Clear</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    If it’s a minor sensor or fluid issue, we will tell you straight. Backed by our handshake motto.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone Call backup */}
            <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-lg flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block">Prefer to speak directly right now?</span>
                <span className="text-sm font-bold text-white">Call (405) 677-7454</span>
              </div>
              <a
                href={SHOP_INFO.phoneRaw}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs rounded border border-zinc-700 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Shop</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Form & Confirmation (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6 sm:p-8 shadow-xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Online Service Reservation
                  </span>
                  <span className="text-xs text-zinc-400">100% Free Road Test</span>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
                    {errorMsg}
                  </div>
                )}

                {/* Service Select */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1.5">
                    Select Primary Service:
                  </label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title} ({srv.badge})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Vehicle Fields */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2017"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Make</label>
                    <input
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      placeholder="Ford"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Model</label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="F-150"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Preferred Date (Mon–Fri)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Arrival Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="8:00 AM">8:00 AM (Early Drop-off)</option>
                      <option value="8:30 AM">8:30 AM</option>
                      <option value="9:30 AM">9:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:30 PM">2:30 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Austin Davis"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="(405) 555-0144"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Optional Symptom detail */}
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Describe Transmission Symptoms (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Slipping when shifting into 3rd gear, warning light on dashboard..."
                    value={formData.customConcern}
                    onChange={(e) => setFormData({ ...formData, customConcern: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-xs rounded transition-colors shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Appointment Reservation</span>
                </button>
              </form>
            ) : (
              /* Confirmation Screen */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    Appointment Successfully Confirmed
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    See You at 4737 SE 29th St #5001
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Reservation Reference Code:{' '}
                    <span className="font-mono font-bold text-amber-400">{bookingRef}</span>
                  </p>
                </div>

                {/* Summary Box */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 text-left text-xs space-y-2">
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">Customer Name:</span>
                    <span className="font-bold text-white">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">Phone:</span>
                    <span className="font-bold text-white">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">Vehicle:</span>
                    <span className="font-bold text-white">
                      {formData.year} {formData.make} {formData.model}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-400">Reserved Date & Time:</span>
                    <span className="font-bold text-amber-400">
                      {formData.preferredDate} at {formData.preferredTime}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-400">Cost for Road Test & Diagnostic:</span>
                    <span className="font-bold text-emerald-400">$0.00 (100% Free)</span>
                  </div>
                </div>

                {/* Direct buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                  <a
                    href={SHOP_INFO.phoneRaw}
                    className="px-5 py-2.5 bg-zinc-950 border border-zinc-700 text-white font-bold text-xs rounded hover:bg-zinc-800 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call Shop: (405) 677-7454</span>
                  </a>
                  <button
                    onClick={resetForm}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
                  >
                    Book Another Slot
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
