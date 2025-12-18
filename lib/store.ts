// New folder/lib/store.ts
// lib/store.ts
import { beneficiaries as initialBeneficiaries } from './data';
import { generateImmunizationSchedule } from './vaccination-schedule'; 
import { differenceInDays, differenceInYears } from 'date-fns';

export type BeneficiaryCategory = 
  | 'Newborn'
  | 'Infant'
  | 'Child'
  | 'Adolescent'
  | 'Adult'
  | 'Elderly'
  | 'Pregnant'
  | 'General';

export function getCategoryFromDob(dob: Date): BeneficiaryCategory {
    const today = new Date();
    const ageInDays = differenceInDays(today, dob);
    const ageInYears = differenceInYears(today, dob);

    if (ageInDays <= 28) return 'Newborn';
    if (ageInYears < 1) return 'Infant';
    if (ageInYears <= 5) return 'Child';
    if (ageInYears <= 19) return 'Adolescent';
    if (ageInYears < 60) return 'Adult';
    return 'Elderly';
}

export type ANCVisit = {
  date: string;
  trimester: number;
  weight: number;
  bp: string;
  hbLevel?: number;
  urineSugar?: string;
  urineAlbumin?: string;
  ifaTablets: number;
  ttInjection?: 'TT1' | 'TT2' | 'Booster' | 'None';
  notes?: string;
  isHighRisk: boolean;
  dangerSigns?: string[];
};

export type ChildVisit = {
    date: string;
    weight: number;
    height: number;
    muac: number; 
    hasDiarrhea: boolean;
    hasARI: boolean; 
    notes?: string;
};

export type Beneficiary = {
  id: string; 
  registrationNo: string;
  registrationDate: string;
  ashaId: string;
  name: string;
  guardianName: string; 
  age: number | null;
  dob: string | null;
  gender: 'male' | 'female' | 'other';
  contact: string;
  aadhaar: string;
  address: string;
  village: string;
  socialCategory?: 'SC' | 'ST' | 'OBC' | 'General'; 
  economicStatus?: 'BPL' | 'APL'; 
  isJSYRegistered?: boolean;
  category: BeneficiaryCategory;
  risk: 'High' | 'Medium' | 'None';
  lastVisit: string;
  bloodGroup: string;
  chronicConditions: string;
  notes?: string; 
  report?: File;
  details: {
    lmp: string | null;
    edd: string | null;
    gravida?: number | null; 
    parity?: number | null; 
    previousPregnancyComplications?: string;
    highRiskFactors?: string[];
    plannedDeliveryPlace?: 'Home' | 'PHC' | 'Hospital';
    birthWeight: number | null;
    deliveryPlace: 'Home' | 'PHC' | 'Hospital' | null;
    ancVisits: ANCVisit[];
    childVisits: ChildVisit[];
    immunizations: { vaccine: string; date: string; status: 'Done' | 'Upcoming' }[];
  };
};

export const getBeneficiaries = (): Beneficiary[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem('beneficiaries');
  if (!data) {
    localStorage.setItem('beneficiaries', JSON.stringify(initialBeneficiaries));
    return initialBeneficiaries;
  }
  return JSON.parse(data);
};

export const findBeneficiaryById = (id: string): Beneficiary | undefined => {
  const beneficiaries = getBeneficiaries();
  return beneficiaries.find(b => b.id === id);
};

const notifyDataChanged = (beneficiaryId: string) => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('start-sync', { detail: { beneficiaryId } }));
    }
};

export const updateBeneficiary = (id: string, updatedData: Beneficiary) => {
  const beneficiaries = getBeneficiaries();
  const index = beneficiaries.findIndex(b => b.id === id);
  if (index !== -1) {
    beneficiaries[index] = updatedData;
    localStorage.setItem('beneficiaries', JSON.stringify(beneficiaries));
    window.dispatchEvent(new Event('beneficiariesChanged'));
    notifyDataChanged(id);
  }
};

export const addBeneficiary = (newBeneficiaryData: any) => {
  const beneficiaries = getBeneficiaries();
  const registrationDate = new Date().toISOString().split('T')[0];
  const newId = `BNF${Math.floor(Math.random() * 1000) + 100}`;
  
  let immunizations = [];
  const childCategories: BeneficiaryCategory[] = ['Newborn', 'Infant', 'Child'];
  
  const givenVaccines = (newBeneficiaryData.details && newBeneficiaryData.details.immunizations) || [];

  if (childCategories.includes(newBeneficiaryData.category) && newBeneficiaryData.dob) {
      immunizations = generateImmunizationSchedule(new Date(newBeneficiaryData.dob), givenVaccines);
  }

  const newBeneficiary: Beneficiary = {
    id: newId,
    registrationNo: `REG-${beneficiaries.length + 1}`,
    ashaId: 'ASHA-101', 
    registrationDate: registrationDate,
    lastVisit: registrationDate,
    risk: 'None',
    ...newBeneficiaryData,
    details: {
        ...newBeneficiaryData.details,
        ancVisits: [],
        childVisits: [],
        immunizations: immunizations,
    }
  };

  const updatedBeneficiaries = [newBeneficiary, ...beneficiaries];
  localStorage.setItem('beneficiaries', JSON.stringify(updatedBeneficiaries));
  window.dispatchEvent(new Event('beneficiariesChanged'));
  notifyDataChanged(newId); 
};