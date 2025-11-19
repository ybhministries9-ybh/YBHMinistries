"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Book, ChevronUp, ChevronDown } from 'lucide-react';
import { accentGold } from '../../utils/theme';
import Link from 'next/link';

function getAuthHeader() {
  try {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return {};
    let token = raw;
    try { const parsed = JSON.parse(raw); token = parsed.token || token; } catch (e) {}
    return { Authorization: `Bearer ${token}` };
  } catch (e) {
    return {};
  }
}

export function ContactsManager() {
  const [activeTab, setActiveTab] = useState<'hms'>('hms');
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  // replaced modal flow with separate detail page; no selected state here
  const [sortBy, setSortBy] = useState<string>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (activeTab !== 'hms') return;
    let aborted = false;
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const resp = await fetch(`/api/admin/hms-students?limit=100`, {
          headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
          signal: controller.signal,
        });
        if (aborted) return;
        if (resp.status === 401) {
          setUnauthorized(true);
          setStudents([]);
          return;
        }
        const j = await resp.json();
        if (j && j.success) {
          setStudents(j.data || []);
          setUnauthorized(false);
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
        console.error('Failed to load hms students', err);
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [activeTab]);

  // modal removed — detail page used instead

  const formatDateOnly = useCallback((raw?: string | null) => {
    if (!raw) return '-';
    try {
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return raw.split('T')[0] || raw;
      return d.toISOString().split('T')[0];
    } catch (e) {
      return String(raw).split('T')[0] || String(raw);
    }
  }, []);

  const sortedStudents = useMemo(() => {
    const arr = [...students];
    const dir = sortDir === 'asc' ? 1 : -1;
    // numeric id sort (default)
    if (sortBy === 'id') {
      arr.sort((a: any, b: any) => (Number(a.id || 0) - Number(b.id || 0)) * dir);
      return arr;
    }
    arr.sort((a: any, b: any) => {
      const A = a?.[sortBy];
      const B = b?.[sortBy];
      if (sortBy === 'date_of_birth') {
        const ta = a?.date_of_birth ? new Date(a.date_of_birth).getTime() : 0;
        const tb = b?.date_of_birth ? new Date(b.date_of_birth).getTime() : 0;
        return (ta - tb) * dir;
      }
      // fallback numeric
      if (sortBy === 'phone_number') {
        const na = Number(String(A || '').replace(/\D/g, '')) || 0;
        const nb = Number(String(B || '').replace(/\D/g, '')) || 0;
        return (na - nb) * dir;
      }
      // string compare
      const sa = String(A || '').toLowerCase();
      const sb = String(B || '').toLowerCase();
      return sa.localeCompare(sb) * dir;
    });
    return arr;
  }, [students, sortBy, sortDir]);

  const handleSort = useCallback((column: string) => {
    if (sortBy === column) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // default to ascending for non-dob columns, but for dob default to desc
      setSortBy(column);
      setSortDir(column === 'date_of_birth' ? 'desc' : 'asc');
    }
  }, [sortBy]);

  // navigation to detail page will be handled by link/button

  return (
    <div className="p-6 pr-6 md:pr-0 text-white">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Contact Management Page</h2>
        <div className="text-sm text-gray-300 mt-1">View and manage contact submissions and enrollments from visitors and applicants.</div>

        {/* Tabs: left aligned under title */}
        <nav className="mt-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('hms')}
              className={`flex items-center gap-2 transition-colors text-sm ${activeTab === 'hms' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'hms' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">HMS Enrollments</span>
            </button>

            {/* Removed "Other" tab per design */}
          </div>
        </nav>
      </div>

      {unauthorized && (
        <div className="mb-4 p-3 rounded bg-red-900 text-white border border-red-700">
          Your admin session is invalid or expired. Please <Link href="/admin" className="underline text-[#FDB813]">sign in again</Link> to continue.
        </div>
      )}

      {activeTab === 'hms' && (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="md:overflow-x-auto md:-mx-2 md:mx-0">
              <div className="w-full bg-[#1f1f1f] rounded-lg p-2 md:p-3 border border-[#2b2b2b]">
                {/* Desktop/table view (md and up) */}
                <div className="hidden md:block">
                  <table className="w-full text-left text-sm bg-[#232323] rounded-lg overflow-hidden">
                    <thead>
                      <tr style={{ backgroundColor: '#2e2e2e', color: '#e6e6e6' }}>
                        <th onClick={() => handleSort('id')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer"># {sortBy === 'id' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('full_name')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Name {sortBy === 'full_name' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('date_of_birth')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">DOB {sortBy === 'date_of_birth' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('phone_number')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Phone {sortBy === 'phone_number' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('email')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Email {sortBy === 'email' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('status')} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Status {sortBy === 'status' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStudents.map((s, i) => (
                        <tr
                          key={s.id}
                          className={`border-b border-gray-800 hover:bg-[#151515]`}
                          style={{ backgroundColor: i % 2 === 0 ? '#242424' : '#1a1a1a' }}
                        >
                          <td className="px-4 py-3 text-gray-200">{s.id}</td>
                          <td className="px-4 py-3 text-gray-100">{s.full_name}</td>
                          <td className="px-4 py-3 text-gray-200">{formatDateOnly(s.date_of_birth)}</td>
                          <td className="px-4 py-3 text-gray-200">{s.phone_number || '-'}</td>
                          <td className="px-4 py-3 text-gray-200">{s.email || '-'}</td>
                          <td className="px-4 py-3 text-gray-200">{s.status || '-'}</td>
                            <td className="px-4 py-3">
                              <Link href={`/admin/contacts/${s.id}`} className="px-3 py-1 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/card view (below md) */}
                <div className="md:hidden space-y-3 mt-2">
                  {sortedStudents.map((s) => (
                    <div key={s.id} className="bg-[#232323] rounded-md p-3 border border-[#2b2b2b]">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                            <span>#{s.id}</span>
                            <span className="mx-1">•</span>
                            <span className="uppercase text-[11px] text-gray-300">{s.status || 'Submitted'}</span>
                          </div>
                          <div className="font-medium text-gray-100 truncate">{s.full_name}</div>
                          <div className="text-sm text-gray-200 mt-1">{formatDateOnly(s.date_of_birth)} • {s.phone_number || '-'}</div>
                          <div className="text-sm text-gray-200 truncate mt-1">{s.email || '-'}</div>
                        </div>
                        <div className="flex-shrink-0">
                          <Link href={`/admin/contacts/${s.id}`} className="px-3 py-2 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* "Other" tab removed; only HMS Enrollments are shown here now */}
    </div>
  );
}

export default ContactsManager;
