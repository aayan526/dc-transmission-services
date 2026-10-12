export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  altText: string;
  badge: string;
  symptoms: string[];
  features: string[];
  warrantyInfo: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  vehicle: string;
  serviceType: string;
  content: string;
  highlight: string;
}

export interface BookingFormData {
  serviceId: string;
  customConcern: string;
  year: string;
  make: string;
  model: string;
  mileage: string;
  preferredDate: string;
  preferredTime: string;
  fullName: string;
  phone: string;
  email: string;
  serviceMode: 'drop-off' | 'wait' | 'towing-needed';
  notes: string;
}

export interface ShopHours {
  day: string;
  hours: string;
  isOpenToday: boolean;
}
