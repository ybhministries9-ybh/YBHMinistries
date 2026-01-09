"use client";
import React from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { ContactsManager } from '@/components/admin/ContactsManager';

export default function Page() {
  return (
    <AdminShell>
      <ContactsManager forcedActiveTab="worship24" />
    </AdminShell>
  );
}
