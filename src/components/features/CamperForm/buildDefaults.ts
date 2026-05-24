import { Camper } from '@/types';
import { ICamperData } from '@/schemas';

export const buildDefaults = (camper?: Camper): ICamperData => ({
  name: camper?.name ?? '',
  price: camper?.price ?? 0,
  description: camper?.description ?? '',
  images: camper?.images ?? [],
  status: camper?.status ?? 'available',
  features: {
    engine: camper?.features?.engine ?? '',
    beds: camper?.features?.beds ?? 1,
    tankVolume: camper?.features?.tankVolume ?? 50,
  },
});
