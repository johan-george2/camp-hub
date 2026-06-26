import { camp } from './camp';
import type { Contact } from '../types';

// Update names, roles, and phone numbers here.
// Leave `phone` blank for contacts that should not show tap-to-call.
export const contacts: Contact[] = [
  {
    id: 'director',
    name: 'Rachel Kim',
    role: 'Camp Director',
    phone: '+61412345678',
    notes: 'Main point of contact for camp coordination and urgent issues.',
  },
  {
    id: 'first-aid',
    name: 'Onsite First Aid Team',
    role: 'First Aid',
    phone: '+61423456789',
    notes: 'Located beside Main Lodge during all programmed sessions.',
  },
  {
    id: 'emergency',
    name: 'Emergency Services',
    role: '000',
    phone: '000',
    notes: 'Call immediately for life-threatening emergencies.',
  },
  {
    id: 'leader-1',
    name: 'Daniel Wu',
    role: 'Session Leader',
    phone: '+61434567890',
    notes: 'Helpful for program questions during the main sessions.',
  },
  {
    id: 'address',
    name: 'Camp Wattle Ridge',
    role: 'Camp Address',
    address: camp.address,
    notes: 'Use this address for navigation and emergency responders.',
  },
];
