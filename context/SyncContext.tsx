// New folder/context/SyncContext.tsx
'use client'

import React, { createContext, useState, useContext, ReactNode, useCallback, useRef, useEffect } from 'react';

type SyncState = 'synced' | 'syncing' | 'unsynced';

interface SyncContextType {
  status: SyncState;
  lastSynced: Date | null;
  unsyncedPatientIds: string[];
  queueForSync: (patientId: string) => void;
  startSync: () => void;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

export const SyncProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<SyncState>('synced');
  const [lastSynced, setLastSynced] = useState<Date | null>(new Date());
  const [unsyncedPatientIds, setUnsyncedPatientIds] = useState<string[]>([]);

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startSync = useCallback(() => {
    if (unsyncedPatientIds.length === 0 || status === 'syncing') return;
    
    setStatus('syncing');

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      setStatus('synced');
      setLastSynced(new Date());
      setUnsyncedPatientIds([]);
    }, 3000); 

  }, [unsyncedPatientIds.length, status]);

  useEffect(() => {
    if (status === 'unsynced' && unsyncedPatientIds.length > 0) {
        startSync();
    }
  }, [unsyncedPatientIds.length, status, startSync]);

  const queueForSync = useCallback((patientId: string) => {
    setUnsyncedPatientIds(prevIds => {
      if (prevIds.includes(patientId)) {
        return prevIds;
      }
      return [...prevIds, patientId];
    });
    setStatus('unsynced');
  }, []);

  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);


  return (
    <SyncContext.Provider value={{ status, lastSynced, unsyncedPatientIds, queueForSync, startSync }}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};