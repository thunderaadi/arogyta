// lib/data.ts
import { Beneficiary } from './store';

// This data now aligns with the Beneficiary type and assigns beneficiaries to different ASHA workers.
export const beneficiaries: Beneficiary[] = [
  { 
    id: 'BNF001', 
    registrationNo: 'REG-1',
    registrationDate: '2025-05-10',
    ashaId: 'ASHA-101', // Assigned to Sarita Singh
    name: 'Sunita Devi', 
    husbandOrFatherName: 'Ramesh Singh', // Added
    age: 28,
    dob: null,
    gender: 'female',
    contact: '9876543210',
    aadhaar: '1234 5678 9012',
    address: '15, Rampur Village, Kanpur',
    village: 'Rampur',
    category: 'Pregnant',
    risk: 'High',
    lastVisit: '2025-09-15',
    bloodGroup: 'O+',
    chronicConditions: 'None',
    details: {
      lmp: '2025-03-10',
      edd: '2025-12-15',
      numberOfPregnancies: 2,
      trimester: 3,
      ancVisits: [
        { date: '2025-05-12', weight: 55, bp: '120/80', ifaTablets: 30, notes: '1st trimester checkup. BP normal.', ttInjection: 'TT1' },
        { date: '2025-07-18', weight: 58, bp: '122/82', ifaTablets: 30, notes: '2nd trimester.', ttInjection: 'TT2' },
        { date: '2025-09-15', weight: 60, bp: '145/95', ifaTablets: 0, notes: 'High BP detected. Referred to PHC.', dangerSigns: ['High Blood Pressure'] },
      ],
      ttInjections: ['TT1', 'TT2'],
      dangerSigns: ['High Blood Pressure', 'Swelling in feet'],
      birthWeight: null,
      deliveryPlace: null,
      deliveryType: null,
      postnatalVisitCount: 0,
      immunizations: [],
      growth: [],
      developmentalMilestones: [],
      nutritionPrograms: [],
    }
  },
  { 
    id: 'BNF002', 
    registrationNo: 'REG-2',
    registrationDate: '2023-09-25',
    ashaId: 'ASHA-102', // Assigned to Poonam Verma
    name: 'Rohan Kumar', 
    husbandOrFatherName: 'Anil Kumar', // Added
    age: null,
    dob: '2023-09-25',
    gender: 'male',
    contact: '8765432109',
    aadhaar: '2345 6789 0123',
    address: '22, Sitapur, Kanpur',
    village: 'Sitapur',
    category: 'Child',
    risk: 'None',
    lastVisit: '2025-09-22',
    bloodGroup: 'A+',
    chronicConditions: 'Asthma',
    details: {
      lmp: null, edd: null, numberOfPregnancies: null, trimester: null, ancVisits: [], ttInjections: [], dangerSigns: [],
      birthWeight: 2.8,
      deliveryPlace: 'PHC',
      deliveryType: 'Normal',
      postnatalVisitCount: 4,
      immunizations: [
        { vaccine: 'BCG', date: '2023-10-01', status: 'Done' },
        { vaccine: 'Penta-1', date: '2023-11-15', status: 'Done' },
        { vaccine: 'Measles-1', date: '2024-07-20', status: 'Done' },
        { vaccine: 'DPT Booster', date: '2025-10-10', status: 'Upcoming' },
      ],
      growth: [
        { date: '2024-01-10', weight: 9.5, height: 75 },
        { date: '2024-07-20', weight: 11.2, height: 82 },
        { date: '2025-02-15', weight: 12.5, height: 88 },
      ],
      developmentalMilestones: ['Crawling', 'First words'],
      nutritionPrograms: ['Vitamin A'],
    }
  },
  { 
    id: 'BNF003', 
    registrationNo: 'REG-3',
    registrationDate: '2025-08-01',
    ashaId: 'ASHA-101', // Assigned to Sarita Singh
    name: 'Geeta Singh', 
    husbandOrFatherName: 'Sanjay Singh', // Added
    age: 24,
    dob: null,
    gender: 'female',
    contact: '9988776655',
    aadhaar: '3456 7890 1234',
    address: '45, Rampur Village, Kanpur',
    village: 'Rampur',
    category: 'Pregnant',
    risk: 'None',
    lastVisit: '2025-09-10',
    bloodGroup: 'B+',
    chronicConditions: 'None',
    details: {
      lmp: '2025-07-15',
      edd: '2026-04-21',
      numberOfPregnancies: 1,
      trimester: 1,
      ancVisits: [{ date: '2025-09-10', weight: 52, bp: '110/70', ifaTablets: 30, notes: 'First checkup, all normal.' }],
      ttInjections: [],
      dangerSigns: [],
      birthWeight: null, deliveryPlace: null, deliveryType: null, postnatalVisitCount: 0, immunizations: [], growth: [], developmentalMilestones: [], nutritionPrograms: [],
    }
  },
  { 
    id: 'BNF004', 
    registrationNo: 'REG-4',
    registrationDate: '2024-02-11',
    ashaId: 'ASHA-103', // Assigned to Rekha Devi
    name: 'Aarav Gupta', 
    husbandOrFatherName: 'Vikas Gupta', // Added
    age: null,
    dob: '2024-02-11',
    gender: 'male',
    contact: '9123456789',
    aadhaar: '4567 8901 2345',
    address: '8, Laxmanpur, Kanpur',
    village: 'Laxmanpur',
    category: 'Child',
    risk: 'None',
    lastVisit: '2025-08-15',
    bloodGroup: 'AB+',
    chronicConditions: 'None',
    details: {
      lmp: null, edd: null, numberOfPregnancies: null, trimester: null, ancVisits: [], ttInjections: [], dangerSigns: [],
      birthWeight: 3.1,
      deliveryPlace: 'Hospital',
      deliveryType: 'Normal',
      postnatalVisitCount: 5,
      immunizations: [ { vaccine: 'BCG', date: '2024-02-12', status: 'Done' }, { vaccine: 'OPV-1', date: '2024-03-25', status: 'Done' } ],
      growth: [],
      developmentalMilestones: [],
      nutritionPrograms: [],
    }
  }
];