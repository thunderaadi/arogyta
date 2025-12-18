// lib/vaccination-schedule.ts

import { addWeeks, addMonths, addYears } from 'date-fns';

export type VaccineDose = {
  vaccine: string;
  dueDate: Date;
  status: 'Upcoming' | 'Done';
};

// Based on the Indian National Immunization Schedule
const scheduleDefinition = [
  // At Birth
  { vaccine: 'BCG', due: (dob: Date) => dob },
  { vaccine: 'OPV-0', due: (dob: Date) => dob },
  { vaccine: 'Hep-B - 1', due: (dob: Date) => dob },

  // 6 Weeks
  { vaccine: 'OPV-1', due: (dob: Date) => addWeeks(dob, 6) },
  { vaccine: 'Pentavalent-1', due: (dob: Date) => addWeeks(dob, 6) },
  { vaccine: 'Rotavirus-1', due: (dob: Date) => addWeeks(dob, 6) },
  { vaccine: 'fIPV-1', due: (dob: Date) => addWeeks(dob, 6) },
  { vaccine: 'PCV-1', due: (dob: Date) => addWeeks(dob, 6) },

  // 10 Weeks
  { vaccine: 'OPV-2', due: (dob: Date) => addWeeks(dob, 10) },
  { vaccine: 'Pentavalent-2', due: (dob: Date) => addWeeks(dob, 10) },
  { vaccine: 'Rotavirus-2', due: (dob: Date) => addWeeks(dob, 10) },
  
  // 14 Weeks
  { vaccine: 'OPV-3', due: (dob: Date) => addWeeks(dob, 14) },
  { vaccine: 'Pentavalent-3', due: (dob: Date) => addWeeks(dob, 14) },
  { vaccine: 'Rotavirus-3', due: (dob: Date) => addWeeks(dob, 14) },
  { vaccine: 'fIPV-2', due: (dob: Date) => addWeeks(dob, 14) },
  { vaccine: 'PCV-2', due: (dob: Date) => addWeeks(dob, 14) },

  // 9-12 Months
  { vaccine: 'MR-1', due: (dob: Date) => addMonths(dob, 9) },
  { vaccine: 'Vitamin A - 1', due: (dob: Date) => addMonths(dob, 9) },
  { vaccine: 'PCV Booster', due: (dob: Date) => addMonths(dob, 9) },
  
  // 16-24 Months
  { vaccine: 'MR-2', due: (dob: Date) => addMonths(dob, 16) },
  { vaccine: 'DPT Booster-1', due: (dob: Date) => addMonths(dob, 16) },
  { vaccine: 'OPV Booster', due: (dob: Date) => addMonths(dob, 16) },

  // 5-6 Years
  { vaccine: 'DPT Booster-2', due: (dob: Date) => addYears(dob, 5) },
];

export const generateImmunizationSchedule = (dob: Date, givenVaccines?: { vaccine: string; date: Date }[]) => {
  const schedule = scheduleDefinition.map(item => {
    const isGiven = givenVaccines?.some(v => v.vaccine.toLowerCase() === item.vaccine.toLowerCase());
    return {
      vaccine: item.vaccine,
      date: item.due(dob).toISOString().split('T')[0],
      status: isGiven ? 'Done' : 'Upcoming',
    };
  });
  return schedule;
};