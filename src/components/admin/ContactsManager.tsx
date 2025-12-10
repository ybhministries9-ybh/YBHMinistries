"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Book, ChevronUp, ChevronDown, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Download } from 'lucide-react';
import { accentGold } from '../../utils/theme';
import Link from 'next/link';
import { downloadExcelFile } from '@/lib/exportUtils';

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

export function ContactsManager({ forcedActiveTab }: { forcedActiveTab?: 'hms' | 'getintouch' }) {
  const [activeTab, setActiveTab] = useState<'hms' | 'getintouch'>(forcedActiveTab || 'hms');
  // Pagination for Get In Touch
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [hmsSearchQuery, setHmsSearchQuery] = useState<string>('');
  const [activeHmsSearchQuery, setActiveHmsSearchQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);
  const [hmsExporting, setHmsExporting] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  
  // Export filters for Get In Touch
  const [exportMonth, setExportMonth] = useState<string>('');
  const [exportYear, setExportYear] = useState<string>('');
  
  // Export filters for HMS
  const [hmsExportMonth, setHmsExportMonth] = useState<string>('');
  const [hmsExportYear, setHmsExportYear] = useState<string>('');
  
  const [students, setStudents] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hmsTotalCount, setHmsTotalCount] = useState<number>(0);
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
        const limit = pageSize + 1;
        const offset = (page - 1) * pageSize;
        const qParam = activeHmsSearchQuery && activeHmsSearchQuery.trim().length > 0 ? `&q=${encodeURIComponent(activeHmsSearchQuery.trim())}` : '';
        const resp = await fetch(`/api/admin/hms-students?limit=${limit}&offset=${offset}${qParam}`, {
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
          const arr = j.data || [];
          if (arr.length > pageSize) {
            setHasMore(true);
            setStudents(arr.slice(0, pageSize));
          } else {
            setHasMore(false);
            setStudents(arr);
          }
          setHmsTotalCount(j.total || 0);
          setUnauthorized(false);
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [activeTab, page, activeHmsSearchQuery]);

  useEffect(() => {
    if (activeTab !== 'getintouch') return;
    let aborted = false;
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        // fetch one extra record to detect if there is a next page
        const limit = pageSize + 1;
        const offset = (page - 1) * pageSize;
        const qParam = activeSearchQuery && activeSearchQuery.trim().length > 0 ? `&q=${encodeURIComponent(activeSearchQuery.trim())}` : '';
        const resp = await fetch(`/api/admin/get-in-touch?limit=${limit}&offset=${offset}${qParam}`, {
          headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
          signal: controller.signal,
        });
        if (aborted) return;
        if (resp.status === 401) {
          setUnauthorized(true);
          setContacts([]);
          return;
        }
        const j = await resp.json();
        if (j && j.success) {
          const arr = j.data || [];
          if (arr.length > pageSize) {
            setHasMore(true);
            setContacts(arr.slice(0, pageSize));
          } else {
            setHasMore(false);
            setContacts(arr);
          }
          setTotalCount(j.total || 0);
          setUnauthorized(false);
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => { aborted = true; controller.abort(); };
  }, [activeTab, page, activeSearchQuery]);

  // Trigger search: updating `activeSearchQuery` will cause the effect above to re-run.
  const doSearch = useCallback(() => {
    setPage(1);
    setActiveSearchQuery(searchQuery);
    setSearching(true);
    setTimeout(() => setSearching(false), 300);
  }, [searchQuery]);

  const doHmsSearch = useCallback(() => {
    setPage(1);
    setActiveHmsSearchQuery(hmsSearchQuery);
    setSearching(true);
    setTimeout(() => setSearching(false), 300);
  }, [hmsSearchQuery]);

  // Export get-in-touch data to Excel
  const handleExport = useCallback(async () => {
    try {
      setExporting(true);
      const params = new URLSearchParams();
      
      // Add search query if present
      if (activeSearchQuery && activeSearchQuery.trim().length > 0) {
        params.append('q', activeSearchQuery.trim());
      }
      
      // Add month and year filters if selected
      if (exportMonth) params.append('month', exportMonth);
      if (exportYear) params.append('year', exportYear);
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const resp = await fetch(`/api/admin/get-in-touch/export${queryString}`, {
        headers: getAuthHeader(),
      });
      
      if (resp.status === 401) {
        alert('Unauthorized. Please log in again.');
        return;
      }
      
      if (!resp.ok) {
        throw new Error('Export failed');
      }
      
      // Extract filename from Content-Disposition header
      const contentDisposition = resp.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `get-in-touch-export-${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Download the file
      const blob = await resp.blob();
      downloadExcelFile(blob, filename);
    } catch (err) {
      console.error('Export failed:', err);
      alert('Failed to export data. Please try again.');
    } finally {
      setExporting(false);
    }
  }, [activeSearchQuery, exportMonth, exportYear]);

  // Memoize export button disabled state
  const isExportDisabled = useMemo(() => {
    if (exporting || totalCount === 0) return true;
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Disable if future month/year is selected
    if (exportYear && exportMonth) {
      const selectedYear = parseInt(exportYear);
      const selectedMonth = parseInt(exportMonth);
      if (selectedYear === currentYear && selectedMonth > currentMonth) return true;
      if (selectedYear > currentYear) return true;
    }
    
    return false;
  }, [exporting, totalCount, exportMonth, exportYear]);

  // Export HMS enrollments to Excel
  const handleHmsExport = useCallback(async () => {
    try {
      setHmsExporting(true);
      const params = new URLSearchParams();
      
      // Add search query if present
      if (activeHmsSearchQuery && activeHmsSearchQuery.trim().length > 0) {
        params.append('q', activeHmsSearchQuery.trim());
      }
      
      // Add month and year filters if selected
      if (hmsExportMonth) params.append('month', hmsExportMonth);
      if (hmsExportYear) params.append('year', hmsExportYear);
      
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const resp = await fetch(`/api/admin/hms-students/export${queryString}`, {
        headers: getAuthHeader(),
      });
      
      if (resp.status === 401) {
        alert('Unauthorized. Please log in again.');
        return;
      }
      
      if (!resp.ok) {
        throw new Error('Export failed');
      }
      
      // Extract filename from Content-Disposition header
      const contentDisposition = resp.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `hms-enrollments-export-${new Date().toISOString().split('T')[0]}.xlsx`;
      
      // Download the file
      const blob = await resp.blob();
      downloadExcelFile(blob, filename);
    } catch (err) {
      console.error('HMS Export failed:', err);
      alert('Failed to export data. Please try again.');
    } finally {
      setHmsExporting(false);
    }
  }, [activeHmsSearchQuery, hmsExportMonth, hmsExportYear]);

  // Memoize HMS export button disabled state
  const isHmsExportDisabled = useMemo(() => {
    if (hmsExporting || hmsTotalCount === 0) return true;
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Disable if future month/year is selected
    if (hmsExportYear && hmsExportMonth) {
      const selectedYear = parseInt(hmsExportYear);
      const selectedMonth = parseInt(hmsExportMonth);
      if (selectedYear === currentYear && selectedMonth > currentMonth) return true;
      if (selectedYear > currentYear) return true;
    }
    
    return false;
  }, [hmsExporting, hmsTotalCount, hmsExportMonth, hmsExportYear]);

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

  const formatDatePretty = useCallback((raw?: string | null) => {
    if (!raw) return '-';
    try {
      // For date-only strings (YYYY-MM-DD), parse without timezone to avoid date shifts
      const dateStr = String(raw).split('T')[0];
      const [year, month, day] = dateStr.split('-').map(Number);
      if (year && month && day) {
        const d = new Date(year, month - 1, day);
        if (!Number.isNaN(d.getTime())) {
          return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(d);
        }
      }
      return dateStr || raw;
    } catch (e) {
      return String(raw).split('T')[0] || String(raw);
    }
  }, []);

  const formatDateShort = useCallback((raw?: string | null) => {
    if (!raw) return '-';
    try {
      // Extract date part only (YYYY-MM-DD format)
      const dateStr = String(raw).split('T')[0];
      return dateStr;
    } catch (e) {
      return '-';
    }
  }, []);

  const sortedStudents = useMemo(() => {
    const arr = [...students];
    const dir = sortDir === 'asc' ? 1 : -1;
    
    if (sortBy === 'id') {
      arr.sort((a: any, b: any) => (Number(a.id || 0) - Number(b.id || 0)) * dir);
      return arr;
    }
    
    if (sortBy === 'date_of_birth' || sortBy === 'created_at') {
      // ISO date strings can be compared directly
      arr.sort((a: any, b: any) => {
        const dateA = String(a?.[sortBy] || '').split('T')[0];
        const dateB = String(b?.[sortBy] || '').split('T')[0];
        return dateA.localeCompare(dateB) * dir;
      });
      return arr;
    }
    
    if (sortBy === 'phone_number') {
      arr.sort((a: any, b: any) => {
        const na = Number(String(a.phone_number || '').replace(/\D/g, '')) || 0;
        const nb = Number(String(b.phone_number || '').replace(/\D/g, '')) || 0;
        return (na - nb) * dir;
      });
      return arr;
    }
    
    // String comparison for other fields
    arr.sort((a: any, b: any) => {
      const sa = String(a?.[sortBy] || '').toLowerCase();
      const sb = String(b?.[sortBy] || '').toLowerCase();
      return sa.localeCompare(sb) * dir;
    });
    return arr;
  }, [students, sortBy, sortDir]);

  const sortedContacts = useMemo(() => {
    const arr = [...contacts];
    const dir = sortDir === 'asc' ? 1 : -1;
    
    if (sortBy === 'id') {
      arr.sort((a: any, b: any) => (Number(a.id || 0) - Number(b.id || 0)) * dir);
      return arr;
    }
    
    if (sortBy === 'created_at') {
      // ISO date strings can be compared directly
      arr.sort((a: any, b: any) => {
        const dateA = String(a.created_at || '').split('T')[0];
        const dateB = String(b.created_at || '').split('T')[0];
        return dateA.localeCompare(dateB) * dir;
      });
      return arr;
    }
    
    // String comparison for other fields
    arr.sort((a: any, b: any) => {
      const sa = String(a?.[sortBy] || '').toLowerCase();
      const sb = String(b?.[sortBy] || '').toLowerCase();
      return sa.localeCompare(sb) * dir;
    });
    return arr;
  }, [contacts, sortBy, sortDir]);

  const handleSort = useCallback((column: string) => {
    if (sortBy === column) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // default to ascending for non-dob columns, but for dob default to desc
      setSortBy(column);
      setSortDir(column === 'date_of_birth' ? 'desc' : 'asc');
    }
  }, [sortBy]);

  const goldBtnClass = (_disabled: boolean) => `px-3 py-2 rounded bg-[#FDB813] text-black disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#FDB813]/90 transition-colors ${!_disabled ? 'cursor-pointer' : ''}`;

  // navigation to detail page will be handled by link/button

  return (
    <div className="p-6 pr-6 md:pr-0 text-white">
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Contact Management</h2>
        <div className="text-sm text-gray-300 mt-1">View and manage contact submissions and enrollments from visitors and applicants.</div>

        {/* Tabs: left aligned under title */}
        <nav className="mt-5">
          <div className="flex items-center gap-4 border-b border-gray-700">
            <button
              onClick={() => { setActiveTab('hms'); setPage(1); }}
              className={`flex items-center gap-2 transition-colors text-base ${activeTab === 'hms' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'hms' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">HMS Enrollments</span>
            </button>

            <button
              onClick={() => { setActiveTab('getintouch'); setPage(1); }}
              className={`flex items-center gap-2 transition-colors text-base ${activeTab === 'getintouch' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'getintouch' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">Get In Touch</span>
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
            <>
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <input
                  type="search"
                  value={hmsSearchQuery}
                  onChange={(e) => setHmsSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') doHmsSearch(); }}
                  placeholder="Search name, email or phone"
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white w-full md:w-1/3"
                />
                <button
                  onClick={doHmsSearch}
                  disabled={searching}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer"
                >
                  Search
                </button>
                <button
                  onClick={() => { setHmsSearchQuery(''); setActiveHmsSearchQuery(''); setPage(1); }}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-[#FDB813] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Export Filters and Button for HMS */}
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-300">Export Filters:</span>
                <select
                  value={hmsExportMonth}
                  onChange={(e) => setHmsExportMonth(e.target.value)}
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white"
                  style={{ 
                    colorScheme: 'dark',
                    background: '#111',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ background: '#111', color: 'white' }}>All Months</option>
                  <option value="1" style={{ background: '#111', color: 'white' }}>January</option>
                  <option value="2" style={{ background: '#111', color: 'white' }}>February</option>
                  <option value="3" style={{ background: '#111', color: 'white' }}>March</option>
                  <option value="4" style={{ background: '#111', color: 'white' }}>April</option>
                  <option value="5" style={{ background: '#111', color: 'white' }}>May</option>
                  <option value="6" style={{ background: '#111', color: 'white' }}>June</option>
                  <option value="7" style={{ background: '#111', color: 'white' }}>July</option>
                  <option value="8" style={{ background: '#111', color: 'white' }}>August</option>
                  <option value="9" style={{ background: '#111', color: 'white' }}>September</option>
                  <option value="10" style={{ background: '#111', color: 'white' }}>October</option>
                  <option value="11" style={{ background: '#111', color: 'white' }}>November</option>
                  <option value="12" style={{ background: '#111', color: 'white' }}>December</option>
                </select>
                <select
                  value={hmsExportYear}
                  onChange={(e) => setHmsExportYear(e.target.value)}
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white"
                  style={{ 
                    colorScheme: 'dark',
                    background: '#111',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ background: '#111', color: 'white' }}>All Years</option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const years = [];
                    for (let year = currentYear; year >= 2020; year--) {
                      years.push(year);
                    }
                    return years.map(year => (
                      <option key={year} value={year} style={{ background: '#111', color: 'white' }}>{year}</option>
                    ));
                  })()}
                </select>
                <button
                  onClick={handleHmsExport}
                  disabled={isHmsExportDisabled}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Export enrollments to Excel file"
                >
                  <Download size={16} />
                  {hmsExporting ? 'Exporting...' : 'Export to Excel'}
                </button>
              </div>

              <div className="mb-3 text-sm text-gray-300">
                {activeHmsSearchQuery ? (
                  hmsTotalCount === 0 ? (
                    <span>No results found for &quot;{activeHmsSearchQuery}&quot;</span>
                  ) : (
                    <span>Found {hmsTotalCount} result{hmsTotalCount !== 1 ? 's' : ''} for &quot;{activeHmsSearchQuery}&quot;</span>
                  )
                ) : (
                  <span>Total: {hmsTotalCount} enrollment{hmsTotalCount !== 1 ? 's' : ''}</span>
                )}
              </div>

              {hmsTotalCount > 0 && (
                <div className="md:overflow-x-auto md:-mx-2 md:mx-0">
                  <div className="w-full bg-[#1f1f1f] rounded-lg p-2 md:p-3 border border-gray-700">
                    {/* Desktop/table view (md and up) */}
                    <div className="hidden md:block">
                      <table className="w-full table-fixed text-left text-sm bg-[#232323] rounded-lg overflow-hidden">
                        <thead>
                          <tr style={{ backgroundColor: '#2e2e2e', color: '#e6e6e6' }}>
                        <th onClick={() => handleSort('id')} style={{ width: '5%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer"># {sortBy === 'id' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('full_name')} style={{ width: '23%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Name {sortBy === 'full_name' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('date_of_birth')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">DOB {sortBy === 'date_of_birth' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('phone_number')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Phone {sortBy === 'phone_number' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('email')} style={{ width: '22%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Email {sortBy === 'email' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('status')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Status {sortBy === 'status' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th onClick={() => handleSort('created_at')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap">Enrolled {sortBy === 'created_at' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                        <th style={{ width: '8%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
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
                          <td className="px-4 py-3 text-gray-100 truncate max-w-[1px]">{s.full_name}</td>
                          <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(s.date_of_birth)}</td>
                          <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{s.phone_number || '-'}</td>
                          <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{s.email || '-'}</td>
                          <td className="px-4 py-3 text-gray-200">{s.status || '-'}</td>
                          <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDateShort(s.created_at)}</td>
                            <td className="px-4 py-3 text-right">
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
                    <div key={s.id} className="bg-[#232323] rounded-md p-3 border border-gray-700">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                            <span>#{s.id}</span>
                            <span className="mx-1">•</span>
                            <span className="uppercase text-[11px] text-gray-300">{s.status || 'Submitted'}</span>
                          </div>
                          <div className="font-medium text-gray-100 truncate">{s.full_name}</div>
                          <div className="text-sm text-gray-200 mt-1">{formatDatePretty(s.date_of_birth)} • {s.phone_number || '-'}</div>
                          <div className="text-sm text-gray-200 truncate mt-1">{s.email || '-'}</div>
                          <div className="text-xs text-gray-400 mt-1">Enrolled: {formatDateShort(s.created_at)}</div>
                        </div>
                        <div className="flex-shrink-0">
                          <Link href={`/admin/contacts/${s.id}`} className="px-3 py-2 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination controls (mobile) */}
                <div className="md:hidden flex items-center justify-between mt-3">
                  <div className="text-sm text-gray-400">Page {page}</div>
                  <div className="flex items-center gap-2">
                    <button disabled={page <= 1} onClick={() => setPage(1)} className={goldBtnClass(page <= 1)} title="First Page">
                      <ChevronsLeft size={16} />
                    </button>
                    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={goldBtnClass(page <= 1)} title="Previous Page">
                      <ChevronLeft size={16} />
                    </button>
                    <button disabled={!hasMore} onClick={() => setPage(p => p + 1)} className={goldBtnClass(!hasMore)} title="Next Page">
                      <ChevronRight size={16} />
                    </button>
                    <button disabled={!hasMore} onClick={() => setPage(Math.ceil(hmsTotalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
                      <ChevronsRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Pagination controls (desktop) */}
                <div className="hidden md:flex items-center justify-between mt-3 px-2">
                  <div className="text-sm text-gray-400">Page {page}</div>
                  <div className="flex items-center gap-2">
                    <button disabled={page <= 1} onClick={() => setPage(1)} className={goldBtnClass(page <= 1)} title="First Page">
                      <ChevronsLeft size={16} />
                    </button>
                    <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={goldBtnClass(page <= 1)} title="Previous Page">
                      <ChevronLeft size={16} />
                    </button>
                    <button disabled={!hasMore} onClick={() => setPage(p => p + 1)} className={goldBtnClass(!hasMore)} title="Next Page">
                      <ChevronRight size={16} />
                    </button>
                    <button disabled={!hasMore} onClick={() => setPage(Math.ceil(hmsTotalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
                      <ChevronsRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )}

      {activeTab === 'getintouch' && (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') doSearch(); }}
                  placeholder="Search name, email, phone or location"
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white w-full md:w-1/3"
                />
                <button
                  onClick={doSearch}
                  disabled={searching}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer"
                >
                  Search
                </button>
                <button
                  onClick={() => { setSearchQuery(''); setActiveSearchQuery(''); setPage(1); }}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-[#FDB813] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Export Filters and Button */}
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-300">Export Filters:</span>
                <select
                  value={exportMonth}
                  onChange={(e) => setExportMonth(e.target.value)}
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white"
                  style={{ 
                    colorScheme: 'dark',
                    background: '#111',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ background: '#111', color: 'white' }}>All Months</option>
                  <option value="1" style={{ background: '#111', color: 'white' }}>January</option>
                  <option value="2" style={{ background: '#111', color: 'white' }}>February</option>
                  <option value="3" style={{ background: '#111', color: 'white' }}>March</option>
                  <option value="4" style={{ background: '#111', color: 'white' }}>April</option>
                  <option value="5" style={{ background: '#111', color: 'white' }}>May</option>
                  <option value="6" style={{ background: '#111', color: 'white' }}>June</option>
                  <option value="7" style={{ background: '#111', color: 'white' }}>July</option>
                  <option value="8" style={{ background: '#111', color: 'white' }}>August</option>
                  <option value="9" style={{ background: '#111', color: 'white' }}>September</option>
                  <option value="10" style={{ background: '#111', color: 'white' }}>October</option>
                  <option value="11" style={{ background: '#111', color: 'white' }}>November</option>
                  <option value="12" style={{ background: '#111', color: 'white' }}>December</option>
                </select>
                <select
                  value={exportYear}
                  onChange={(e) => setExportYear(e.target.value)}
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white"
                  style={{ 
                    colorScheme: 'dark',
                    background: '#111',
                    color: 'white'
                  }}
                >
                  <option value="" style={{ background: '#111', color: 'white' }}>All Years</option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1;
                    const years = [];
                    for (let year = currentYear; year >= 2020; year--) {
                      years.push(year);
                    }
                    return years.map(year => (
                      <option key={year} value={year} style={{ background: '#111', color: 'white' }}>{year}</option>
                    ));
                  })()}
                </select>
                <button
                  onClick={handleExport}
                  disabled={isExportDisabled}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  title="Export data to Excel file"
                >
                  <Download size={16} />
                  {exporting ? 'Exporting...' : 'Export to Excel'}
                </button>
              </div>

              <div className="mb-3 text-sm text-gray-300">
                {activeSearchQuery ? (
                  totalCount === 0 ? (
                    <span>No results found for &quot;{activeSearchQuery}&quot;</span>
                  ) : (
                    <span>Found {totalCount} result{totalCount !== 1 ? 's' : ''} for &quot;{activeSearchQuery}&quot;</span>
                  )
                ) : (
                  <span>Total: {totalCount} submission{totalCount !== 1 ? 's' : ''}</span>
                )}
              </div>

              {totalCount > 0 && (
                <div className="overflow-x-auto">
                  <div className="w-full bg-[#1f1f1f] rounded-lg p-2 md:p-3 border border-gray-700">
                    <div className="hidden md:block">
                      <table className="w-full table-fixed text-left text-sm bg-[#232323] rounded-lg overflow-hidden">
                        <thead>
                          <tr style={{ backgroundColor: '#2e2e2e', color: '#e6e6e6' }}>
                            <th onClick={() => handleSort('id')} style={{ width: '5%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer"># {sortBy === 'id' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th onClick={() => handleSort('name')} style={{ width: '18%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Name {sortBy === 'name' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th onClick={() => handleSort('phone')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Phone {sortBy === 'phone' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th onClick={() => handleSort('email')} style={{ width: '22%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Email {sortBy === 'email' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th onClick={() => handleSort('location')} style={{ width: '18%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer">Location {sortBy === 'location' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th onClick={() => handleSort('created_at')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap">Submitted {sortBy === 'created_at' && (sortDir === 'asc' ? <ChevronUp size={12} className="inline"/> : <ChevronDown size={12} className="inline"/>)}</th>
                            <th style={{ width: '9%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sortedContacts.map((c: any, i) => (
                            <tr key={c.id} className={`border-b border-gray-800 hover:bg-[#151515]`} style={{ backgroundColor: i % 2 === 0 ? '#242424' : '#1a1a1a' }}>
                              <td className="px-4 py-3 text-gray-200">{c.id}</td>
                              <td className="px-4 py-3 text-gray-100 truncate max-w-[1px]">{c.name}</td>
                              <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.phone || '-'}</td>
                              <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.email || '-'}</td>
                              <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.location || '-'}</td>
                              <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(c.created_at)}</td>
                              <td className="px-4 py-3 text-right">
                                <Link href={`/admin/contacts/getintouch/${c.id}`} className="px-3 py-1 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="md:hidden space-y-3 mt-2">
                      {sortedContacts.map((c: any) => (
                        <div key={c.id} className="bg-[#232323] rounded-md p-3 border border-gray-700">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                <span>#{c.id}</span>
                                <span className="mx-1">•</span>
                                <span className="uppercase text-[11px] text-gray-300">{c.status || 'Submitted'}</span>
                              </div>
                              <div className="font-medium text-gray-100 truncate">{c.name}</div>
                              <div className="text-sm text-gray-200 mt-1">{formatDatePretty(c.created_at)} • {c.phone || '-'}</div>
                              <div className="text-sm text-gray-200 truncate mt-1">{c.email || '-'}</div>
                              {c.location && <div className="text-sm text-gray-200 truncate mt-1">{c.location}</div>}
                            </div>
                            <div className="flex-shrink-0">
                              <Link href={`/admin/contacts/getintouch/${c.id}`} className="px-3 py-2 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="md:hidden flex items-center justify-between mt-3">
                      <div className="text-sm text-gray-400">Page {page}</div>
                      <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage(1)} className={goldBtnClass(page <= 1)} title="First Page">
                          <ChevronsLeft size={16} />
                        </button>
                        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={goldBtnClass(page <= 1)} title="Previous Page">
                          <ChevronLeft size={16} />
                        </button>
                        <button disabled={!hasMore} onClick={() => setPage(p => p + 1)} className={goldBtnClass(!hasMore)} title="Next Page">
                          <ChevronRight size={16} />
                        </button>
                        <button disabled={!hasMore} onClick={() => setPage(Math.ceil(totalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
                          <ChevronsRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-between mt-3 px-2">
                      <div className="text-sm text-gray-400">Page {page}</div>
                      <div className="flex items-center gap-2">
                        <button disabled={page <= 1} onClick={() => setPage(1)} className={goldBtnClass(page <= 1)} title="First Page">
                          <ChevronsLeft size={16} />
                        </button>
                        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={goldBtnClass(page <= 1)} title="Previous Page">
                          <ChevronLeft size={16} />
                        </button>
                        <button disabled={!hasMore} onClick={() => setPage(p => p + 1)} className={goldBtnClass(!hasMore)} title="Next Page">
                          <ChevronRight size={16} />
                        </button>
                        <button disabled={!hasMore} onClick={() => setPage(Math.ceil(totalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
                          <ChevronsRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* "Other" tab removed; only HMS Enrollments are shown here now */}
    </div>
  );
}
export default ContactsManager;
