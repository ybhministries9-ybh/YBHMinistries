"use client";
import React from 'react';
import ContactDetail from '../../../../../src/components/admin/ContactDetail';
import AdminShell from '../../../../../src/components/admin/AdminShell';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const id = params?.id as string | undefined;
  if (!id) return <div>Missing id</div>;
  return (
    <AdminShell>
      <ContactDetail id={id} forcedTypeProp="worship24" />
    </AdminShell>
  );
}
