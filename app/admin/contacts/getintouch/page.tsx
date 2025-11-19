"use client";
import React from 'react';
import AdminShell from '../../../../src/components/admin/AdminShell';
import { ContactsManager } from '../../../../src/components/admin/ContactsManager';

export default function Page() {
  return (
    <AdminShell>
      <ContactsManager forcedActiveTab="getintouch" />
    </AdminShell>
  );
}
