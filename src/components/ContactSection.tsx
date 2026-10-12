import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck, AlertCircle } from 'lucide-react';
import { SHOP_INFO, FAQ_ITEMS } from '../data/shopData';

export const ContactSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [sentMessage, setSentMessage] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    const cleanPhone = contactPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number so Tom can call you back.');
      return;
    }

    setErrorMessage('');
    setSentMessage(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-zinc-950 border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQs */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Clear Answers Before You Visit
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              No sales games or high-pressure pitches. Here is how Tom Fisher and our shop operate.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-zinc-850"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Contact & Quick Inquiries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Direct Contact
              </span>
              <h3 className="text-2xl font-black text-white">
                Speak With Our Shop
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Need to ask about a specific transmission noise, check rebuild status, or ask about emergency towing to 4737 SE 29th St?
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href={SHOP_INFO.phoneRaw}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-500/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded bg-amber-400 text-zinc-950 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Shop Direct Line</span>
                  <span className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    (405) 677-7454
                  </span>
                  <span className="text-[11px] text-emerald-400 block mt-0.5">
                    Click to call immediately
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="w-10 h-10 rounded bg-zinc-800 text-amber-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 block">Shop Address</span>
                  <span className="text-sm font-bold text-white">
                    4737 SE 29th St #5001
                  </span>
                  <span className="text-xs text-zinc-400 block">
                    Oklahoma City, OK 73115
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Towing Note */}
            <div className="p-4 bg-zinc-950 border border-amber-500/20 rounded-lg space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4" />
                <span>Car Broke Down On The Road?</span>
              </div>
              <p className="text-xs text-zinc-300">
                If your transmission failed and your vehicle is stranded anywhere in the Oklahoma City metro, call us at (405) 677-7454. We work directly with dependable local towing providers who can deliver your vehicle right to our bays.
              </p>
            </div>
          </div>

          {/* Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-lg p-6 sm:p-8">
            {!sentMessage ? (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Send Tom a Quick Question
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Have an unusual transmission noise or questions about an estimate? Leave your details and Tom or our lead technician will call you back.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jason Cooper"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="(405) 555-0182"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    What vehicle do you drive & what is happening?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 2015 Chevy Tahoe, slipping between 2nd and 3rd gear when warm..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider text-xs rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Shop</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Received!</h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Thanks {contactName}. Tom or our shop supervisor will review your inquiry and call you back at <strong className="text-white">{contactPhone}</strong> during normal shop hours (8:00 AM – 5:00 PM).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSentMessage(false);
                    setContactName('');
                    setContactPhone('');
                    setContactMessage('');
                  }}
                  className="px-4 py-2 bg-zinc-800 text-zinc-200 text-xs font-semibold rounded hover:bg-zinc-700 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
