export interface CamperFeatures {
  engine: string;
  beds: number;
  tankVolume: number;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  description: string;
  features: CamperFeatures;
  imageUrl: string;
  status: 'available' | 'booked';
}

export interface Order {
  id: string;
  clientName: string;
  clientPhone: string;
  camperId: string;
  createdAt: number;
  status: 'new' | 'in-progress' | 'completed';
}

export interface AppUser {
  id: string;
  email: string;
  role: 'client' | 'admin';
}
