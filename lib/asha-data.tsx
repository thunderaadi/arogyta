// lib/asha-data.ts
export const ashaWorkers = [
  { id: 'ASHA-101', name: 'Sarita Singh', village: 'Rampur', contact: '9876543210', beneficiaries: 150, highRisk: 3, lastSync: '2025-10-02T18:30:00Z' },
  { id: 'ASHA-102', name: 'Poonam Verma', village: 'Sitapur', contact: '9871234567', beneficiaries: 125, highRisk: 1, lastSync: '2025-10-02T17:55:00Z' },
  { id: 'ASHA-103', name: 'Rekha Devi', village: 'Laxmanpur', contact: '9988776655', beneficiaries: 180, highRisk: 5, lastSync: '2025-10-01T20:10:00Z' },
  { id: 'ASHA-104', name: 'Manju Tiwari', village: 'Govind Nagar', contact: '9123456789', beneficiaries: 160, highRisk: 2, lastSync: '2025-10-02T19:05:00Z' },
];

export type AshaWorker = typeof ashaWorkers[0];