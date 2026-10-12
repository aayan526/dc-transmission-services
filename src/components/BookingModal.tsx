import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Car, User, CheckCircle2, Phone, AlertCircle, MapPin, Download } from 'lucide-react';
import { SERVICES_LIST, SHOP_INFO } from '../data/shopData';
import { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialSymptom?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId,
  initialSymptom,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Default next weekday
  const getNextWeekday = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    while (d.getDay() === 0 || d.getDay() === 6) {
      d.setDate(d.getDate() + 1);
    }
    return d.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialServiceId || 'free-road-test-diagnostics',
    customConcern: initialSymptom || '',
    year: '2018',
    make: 'Chevrolet',
    model: 'Silverado 1500',
    mileage: '112,000',
    preferredDate: getNextWeekday(),
    preferredTime: '8:30 AM',
    fullName: '',
    phone: '',
    email: '',
    serviceMode: 'drop-off',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: initialServiceId }));
    }
    if (initialSymptom) {
      setFormData((prev) => ({ ...prev, customConcern: initialSymptom }));
    }
  }, [initialServiceId, initialSymptom]);

  if (!isOpen) return null;

  const validateStep = (currentStep: number) => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.serviceId) newErrors.serviceId = 'Please select a primary service.';
    } else if (currentStep === 2) {
      if (!formData.year.trim()) newErrors.year = 'Vehicle year is required.';
      if (!formData.make.trim()) newErrors.make = 'Vehicle make is required.';
      if (!formData.model.trim()) newErrors.model = 'Vehicle model is required.';
    } else if (currentStep === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Please select an appointment date.';
      if (!formData.preferredTime) newErrors.preferredTime = 'Please select a time slot.';
    } else if (currentStep === 4) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (!cleanPhone || cleanPhone.length < 10) {
        newErrors.phone = 'Valid 10-digit phone number is required (e.g. 405-555-0199).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step === 4) {
        handleSubmit();
      } else {
        setStep((prev) => (prev + 1) as any);
      }
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => (prev - 1) as any);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate real booking generation
    setTimeout(() => {
      const randomRef = 'DC-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(randomRef);
      setIsSubmitting(false);
      setStep(5);
    }, 600);
  };

  const selectedService = SERVICES_LIST.find((s) => s.id === formData.serviceId);

  // Quick fill test data helper
  const handleQuickFill = () => {
    setFormData({
      serviceId: formData.serviceId || 'free-road-test-diagnostics',
      customConcern: 'Transmission shuddering at 45 MPH when accelerating on I-40',
      year: '2017',
      make: 'Ford',
      model: 'F-150 SuperCrew',
      mileage: '94,500',
      preferredDate: getNextWeekday(),
      preferredTime: '9:00 AM',
      fullName: 'Darren Miller',
      phone: '(405) 555-2481',
      email: 'darren.miller.okc@example.com',
      serviceMode: 'drop-off',
      notes: 'Customer dropping vehicle off before work at 8:15 AM.',
    });
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-zinc-950 border border-zinc-700/80 rounded-xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 bg-zinc-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-400 text-zinc-950 flex items-center justify-center font-black text-sm">
              DC
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white leading-tight">
                Schedule Service / Free Road Test
              </h3>
              <p className="text-[11px] text-zinc-400">
                4737 SE 29th St #5001, Oklahoma City · (405) 677-7454
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators (if not finished) */}
        {step < 5 && (
          <div className="bg-zinc-900/40 px-6 py-2.5 border-b border-zinc-800 flex items-center justify-between text-xs">
            <span className="font-bold text-amber-400">
              Step {step} of 4:{' '}
              {step === 1 && 'Select Service'}
              {step === 2 && 'Vehicle Details'}
              {step === 3 && 'Date & Time'}
              {step === 4 && 'Your Contact'}
            </span>
            <button
              onClick={handleQuickFill}
              className="text-[11px] text-zinc-400 hover:text-amber-400 underline cursor-pointer"
            >
              Fill Sample Data
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                What does your vehicle need?
              </span>
              <div className="space-y-2">
                {SERVICES_LIST.map((srv) => (
                  <label
                    key={srv.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.serviceId === srv.id
                        ? 'bg-zinc-900 border-amber-400 text-white'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={srv.id}
                      checked={formData.serviceId === srv.id}
                      onChange={() => setFormData({ ...formData, serviceId: srv.id })}
                      className="mt-1 text-amber-500 focus:ring-amber-400"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold">{srv.title}</span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400">
                          {srv.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{srv.shortDesc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Specific Symptom or Concern (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g., Slipping in 3rd gear, burnt fluid smell, or clunking into Reverse"
                  value={formData.customConcern}
                  onChange={(e) => setFormData({ ...formData, customConcern: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Vehicle Information */}
          {step === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Vehicle Specifications
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Year *</label>
                  <input
                    type="text"
                    placeholder="2016"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.year && <p className="text-xs text-red-400 mt-1">{errors.year}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Make *</label>
                  <input
                    type="text"
                    placeholder="Chevrolet / Ford / Toyota"
                    value={formData.make}
                    onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.make && <p className="text-xs text-red-400 mt-1">{errors.make}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Model *</label>
                  <input
                    type="text"
                    placeholder="Silverado, F-150, Camry..."
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                  {errors.model && <p className="text-xs text-red-400 mt-1">{errors.model}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">
                    Approx. Mileage
                  </label>
                  <input
                    type="text"
                    placeholder="120,000"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Service Drop-off mode */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-zinc-300 block mb-1.5">
                  Visit Preference
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { id: 'drop-off', label: 'Drop Off Car' },
                    { id: 'wait', label: 'Wait On-Site' },
                    { id: 'towing-needed', label: 'Need Towing' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, serviceMode: mode.id as any })}
                      className={`p-2 rounded border text-center font-medium cursor-pointer transition-colors ${
                        formData.serviceMode === mode.id
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                          : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time */}
          {step === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Appointment Schedule (Mon–Fri 8:00 AM – 5:00 PM)
              </span>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Preferred Date (Monday to Friday) *
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.preferredDate && (
                  <p className="text-xs text-red-400 mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-2">
                  Select Arrival Time Slot *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    '8:00 AM',
                    '8:30 AM',
                    '9:30 AM',
                    '10:30 AM',
                    '1:00 PM',
                    '2:30 PM',
                    '3:30 PM',
                  ].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData({ ...formData, preferredTime: time })}
                      className={`p-2 text-xs font-semibold rounded border transition-colors cursor-pointer ${
                        formData.preferredTime === time
                          ? 'bg-amber-400 text-zinc-950 border-amber-400 font-bold'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.preferredTime && (
                  <p className="text-xs text-red-400 mt-1">{errors.preferredTime}</p>
                )}
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Drop-offs are accepted starting at 8:00 AM sharp. Tom or our lead tech will perform your road test and diagnostic scan during your reserved window.
                </span>
              </div>
            </div>
          )}

          {/* STEP 4: Contact Information */}
          {step === 4 && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">
                Driver Contact Information
              </span>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Phone Number (for quick authorization / diagnostic update) *
                </label>
                <input
                  type="tel"
                  placeholder="(405) 555-0199"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                />
                {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Email (for written estimate)
                </label>
                <input
                  type="email"
                  placeholder="driver@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-300 block mb-1">
                  Special Notes or Towing Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="Anything Tom should know before testing the car..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Standing Guarantee Reminder */}
              <div className="p-3 bg-zinc-900/80 border border-amber-500/30 rounded text-xs text-zinc-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Reminder: Diagnostic road test is 100% free. No work will ever begin without your approval.
                </span>
              </div>
            </div>
          )}

          {/* STEP 5: Confirmation Screen */}
          {step === 5 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Appointment Confirmed
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  We Have You Scheduled With Tom Fisher
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Confirmation Code:{' '}
                  <span className="font-mono font-bold text-amber-400">{bookingRef}</span>
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Service:</span>
                  <span className="font-bold text-white">{selectedService?.title}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Vehicle:</span>
                  <span className="font-bold text-white">
                    {formData.year} {formData.make} {formData.model}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Date & Time:</span>
                  <span className="font-bold text-amber-400">
                    {formData.preferredDate} at {formData.preferredTime}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-800">
                  <span className="text-zinc-400">Customer:</span>
                  <span className="font-bold text-white">{formData.fullName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-400">Shop Address:</span>
                  <span className="font-medium text-zinc-300">
                    4737 SE 29th St #5001, Oklahoma City
                  </span>
                </div>
              </div>

              {/* What to expect box */}
              <div className="p-3 bg-zinc-900/60 rounded border border-zinc-800 text-xs text-zinc-300 text-left space-y-1">
                <span className="font-bold text-amber-400 block">What to expect upon arrival:</span>
                <p>
                  1. Pull into 4737 SE 29th St #5001 and park in front of the bay doors.
                </p>
                <p>
                  2. Check in at the service counter with Tom or mention code{' '}
                  <strong className="text-white">{bookingRef}</strong>.
                </p>
                <p>
                  3. If you need early drop-off before 8:00 AM, our secure key drop box is next to the front office entrance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={SHOP_INFO.phoneRaw}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-700 text-white font-bold text-xs rounded hover:bg-zinc-800"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Shop: (405) 677-7454</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-bold text-zinc-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleNext}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Confirming...</span>
                </>
              ) : step === 4 ? (
                <span>Confirm Appointment</span>
              ) : (
                <span>Next Step</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
