"use client";
import React from 'react';
import ContactsManager from '@/components/admin/ContactsManager';
import AdminShell from '@/components/admin/AdminShell';

export default function Page() {
  return (
    <AdminShell>
      <ContactsManager />
    </AdminShell>
  );
}
