"use client";
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Book, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Download, ArrowUpDown } from 'lucide-react';
import ManageSlots from './ManageSlots';
import { accentGold } from '../../utils/theme';
import Link from 'next/link';
import { downloadExcelFile } from '@/lib/exportUtils';
import { useSearchParams } from 'next/navigation';

const normalizeContactStatus = (status?: string | null) => {
  const s = String(status || '').trim();
  if (!s || s.toLowerCase() === 'new') return 'Submitted';
  return s;
};

const getHmsStatusBadge = (status: string) => {
  const s = normalizeContactStatus(status);
  const colors: Record<string, { bg: string; text: string }> = {
    Submitted: { bg: '#eab308', text: '#000' },
    Accepted: { bg: '#3b82f6', text: '#fff' },
    Rejected: { bg: '#dc2626', text: '#fff' },
    Enrolled: { bg: '#16a34a', text: '#fff' },
    Archived: { bg: '#6b7280', text: '#fff' },
  };
  const c = colors[s] || { bg: '#4b5563', text: '#fff' };
  return <span style={{ backgroundColor: c.bg, color: c.text, padding: '2px 8px', borderRadius: '9999px', fontSize: '12px', fontWeight: 600, display: 'inline-block' }}>{s}</span>;
};

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

export function ContactsManager({ forcedActiveTab }: { forcedActiveTab?: 'hms' | 'getintouch' | 'worship24' }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'hms' | 'getintouch' | 'worship24'>(forcedActiveTab || 'hms');
  const [worship24SubTab, setWorship24SubTab] = useState<'notifications' | 'slots'>('notifications');
  const getInTouchReturnTo = '/admin/contacts/getintouch';
  // Pagination for Get In Touch
  const [page, setPage] = useState<number>(1);
  const pageSize = 20;
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [activeSearchQuery, setActiveSearchQuery] = useState<string>('');
  const [hmsSearchQuery, setHmsSearchQuery] = useState<string>('');
  const [hmsInputValue, setHmsInputValue] = useState<string>('');
  const [activeHmsSearchQuery, setActiveHmsSearchQuery] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [exporting, setExporting] = useState<boolean>(false);
  const [hmsExporting, setHmsExporting] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const subtab = (searchParams?.get('subtab') || '').trim();
    if (subtab === 'slots' || subtab === 'notifications') {
      setWorship24SubTab(subtab as 'slots' | 'notifications');

      // When the page route forces Worship24, we still want the URL to control
      // the Worship24 sub-tab (e.g. return from details back to Manage Slots).
      if (!forcedActiveTab) {
        setActiveTab('worship24');
      }
    }
  }, [forcedActiveTab, searchParams]);
  
  // Export filters for Get In Touch
  const [exportMonth, setExportMonth] = useState<string>('');
  const [exportYear, setExportYear] = useState<string>('');
  const [exportStatus, setExportStatus] = useState<string>('');
  // Export filters for Worship24
  const [worshipExportMonth, setWorshipExportMonth] = useState<string>('');
  const [worshipExportYear, setWorshipExportYear] = useState<string>('');
  const [worshipExportStatus, setWorshipExportStatus] = useState<string>('');
  const [worshipYears, setWorshipYears] = useState<number[] | null>(null);
  
  // Export filters for HMS
  const [hmsExportMonth, setHmsExportMonth] = useState<string>('');
  const [hmsExportYear, setHmsExportYear] = useState<string>('');
  const [hmsExportStatus, setHmsExportStatus] = useState<string>('');
  
  // Applied filters for table data
  const [appliedMonth, setAppliedMonth] = useState<string>('');
  const [appliedYear, setAppliedYear] = useState<string>('');
  const [appliedStatus, setAppliedStatus] = useState<string>('');
  const [worshipAppliedMonth, setWorshipAppliedMonth] = useState<string>('');
  const [worshipAppliedYear, setWorshipAppliedYear] = useState<string>('');
  const [worshipAppliedStatus, setWorshipAppliedStatus] = useState<string>('');
  const [hmsAppliedMonth, setHmsAppliedMonth] = useState<string>('');
  const [hmsAppliedYear, setHmsAppliedYear] = useState<string>('');
  const [hmsAppliedStatus, setHmsAppliedStatus] = useState<string>('');
  
  const [students, setStudents] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [worship, setWorship] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [worshipTotalCount, setWorshipTotalCount] = useState<number>(0);
  const [hmsTotalCount, setHmsTotalCount] = useState<number>(0);
  // replaced modal flow with separate detail page; no selected state here
  const [sortBy, setSortBy] = useState<string>('created_at');
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
        const monthParam = hmsAppliedMonth ? `&month=${hmsAppliedMonth}` : '';
        const yearParam = hmsAppliedYear ? `&year=${hmsAppliedYear}` : '';
        const statusParam = hmsAppliedStatus ? `&status=${encodeURIComponent(hmsAppliedStatus)}` : '';
        const resp = await fetch(`/api/admin/hms-students?limit=${limit}&offset=${offset}${qParam}${monthParam}${yearParam}${statusParam}`, {
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
  }, [activeTab, page, activeHmsSearchQuery, hmsAppliedMonth, hmsAppliedYear, hmsAppliedStatus]);

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
        const monthParam = appliedMonth ? `&month=${appliedMonth}` : '';
        const yearParam = appliedYear ? `&year=${appliedYear}` : '';
        const statusParam = appliedStatus ? `&status=${encodeURIComponent(appliedStatus)}` : '';
        const resp = await fetch(`/api/admin/get-in-touch?limit=${limit}&offset=${offset}${qParam}${monthParam}${yearParam}${statusParam}`, {
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
  }, [activeTab, page, activeSearchQuery, appliedMonth, appliedYear, appliedStatus]);

  // Fetch worship24 records for admin listing
  useEffect(() => {
    if (activeTab !== 'worship24') return;
    let aborted = false;
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const limit = pageSize + 1;
        const offset = (page - 1) * pageSize;
        const qParam = activeSearchQuery && activeSearchQuery.trim().length > 0 ? `&q=${encodeURIComponent(activeSearchQuery.trim())}` : '';
        const monthParam = worshipAppliedMonth ? `&month=${worshipAppliedMonth}` : '';
        const yearParam = worshipAppliedYear ? `&year=${worshipAppliedYear}` : '';
        const worshipStatusParam = worshipAppliedStatus ? `&status=${encodeURIComponent(worshipAppliedStatus)}` : '';
        const resp = await fetch(`/api/admin/worship24?limit=${limit}&offset=${offset}${qParam}${monthParam}${yearParam}${worshipStatusParam}`, {
          headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
          signal: controller.signal,
        });
        if (aborted) return;
        if (resp.status === 401) {
          setUnauthorized(true);
          setWorship([]);
          return;
        }
        const j = await resp.json();
        if (j && j.success) {
          const arr = j.data || [];
          if (arr.length > pageSize) {
            setHasMore(true);
            setWorship(arr.slice(0, pageSize));
          } else {
            setHasMore(false);
            setWorship(arr);
          }
          setWorshipTotalCount(j.total || 0);
          setUnauthorized(false);
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => { aborted = true; controller.abort(); };
  }, [activeTab, page, activeSearchQuery, worshipAppliedMonth, worshipAppliedYear, worshipAppliedStatus]);

  // Load distinct booking years for worship24 so the year dropdown shows real data years
  useEffect(() => {
    let aborted = false;
    (async () => {
      try {
        const resp = await fetch('/api/admin/worship24/years', { headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) } });
        if (aborted) return;
        if (!resp.ok) return;
        const j = await resp.json();
        if (j && j.success) {
          setWorshipYears(Array.isArray(j.data) ? j.data.map((y: any) => Number(y)) : []);
        }
      } catch (e) {
        // ignore
      }
    })();
    return () => { aborted = true; };
  }, []);

  // Trigger search: updating `activeSearchQuery` will cause the effect above to re-run.
  const doSearch = useCallback(() => {
    setPage(1);
    setActiveSearchQuery(searchInputValue);
    setSearching(true);
    setTimeout(() => setSearching(false), 300);
  }, [searchInputValue]);

  // Trigger worship search (reuse search input for now)
  const doWorshipSearch = useCallback(() => {
    setPage(1);
    setActiveSearchQuery(searchInputValue);
    setSearching(true);
    setTimeout(() => setSearching(false), 300);
  }, [searchQuery]);

  const doHmsSearch = useCallback(() => {
    setPage(1);
    setActiveHmsSearchQuery(hmsInputValue);
    setSearching(true);
    setTimeout(() => setSearching(false), 300);
  }, [hmsInputValue]);

  // Debounce helpers for search inputs to reduce rapid handlers
  const searchTimer = React.useRef<number | null>(null);
  const hmsSearchTimer = React.useRef<number | null>(null);

  const handleSearchInputChange = useCallback((val: string) => {
    setSearchInputValue(val);
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      setSearchQuery(val);
      searchTimer.current = null;
    }, 300) as unknown as number;
  }, []);

  const flushSearchInput = useCallback(() => {
    if (searchTimer.current) { window.clearTimeout(searchTimer.current); searchTimer.current = null; }
    setSearchQuery(searchInputValue);
  }, [searchInputValue]);

  const handleHmsInputChange = useCallback((val: string) => {
    setHmsInputValue(val);
    if (hmsSearchTimer.current) window.clearTimeout(hmsSearchTimer.current);
    hmsSearchTimer.current = window.setTimeout(() => {
      setHmsSearchQuery(val);
      hmsSearchTimer.current = null;
    }, 300) as unknown as number;
  }, []);

  const flushHmsInput = useCallback(() => {
    if (hmsSearchTimer.current) { window.clearTimeout(hmsSearchTimer.current); hmsSearchTimer.current = null; }
    setHmsSearchQuery(hmsInputValue);
  }, [hmsInputValue]);

  // Apply filters for Get In Touch table
  const applyFilters = useCallback(() => {
    setAppliedMonth(exportMonth);
    setAppliedYear(exportYear);
    setAppliedStatus(exportStatus);
    setPage(1);
  }, [exportMonth, exportYear, exportStatus]);

  // Apply filters for Worship24 table (do not auto-apply when dropdowns change)
  const applyWorshipFilters = useCallback(() => {
    setWorshipAppliedMonth(worshipExportMonth);
    setWorshipAppliedYear(worshipExportYear);
    setWorshipAppliedStatus(worshipExportStatus);
    setPage(1);
    setActiveSearchQuery(searchQuery);
  }, [worshipExportMonth, worshipExportYear, worshipExportStatus, searchQuery]);

  // Apply filters for HMS table
  const applyHmsFilters = useCallback(() => {
    setHmsAppliedMonth(hmsExportMonth);
    setHmsAppliedYear(hmsExportYear);
    setHmsAppliedStatus(hmsExportStatus);
    setPage(1);
  }, [hmsExportMonth, hmsExportYear, hmsExportStatus]);

  // Clear filters for Get In Touch
  const clearFilters = useCallback(() => {
    setExportMonth('');
    setExportYear('');
    setExportStatus('');
    setAppliedMonth('');
    setAppliedYear('');
    setAppliedStatus('');
    setPage(1);
  }, []);

  // Clear filters for HMS
  const clearHmsFilters = useCallback(() => {
    setHmsExportMonth('');
    setHmsExportYear('');
    setHmsExportStatus('');
    setHmsAppliedMonth('');
    setHmsAppliedYear('');
    setHmsAppliedStatus('');
    setPage(1);
  }, []);

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

  // Export worship24 data to Excel
  const handleWorshipExport = useCallback(async () => {
    try {
      setExporting(true);
      const params = new URLSearchParams();
      if (activeSearchQuery && activeSearchQuery.trim().length > 0) params.append('q', activeSearchQuery.trim());
      if (worshipExportMonth) params.append('month', worshipExportMonth);
      if (worshipExportYear) params.append('year', worshipExportYear);
      if (worshipExportStatus) params.append('status', worshipExportStatus);
      const queryString = params.toString() ? `?${params.toString()}` : '';
      const resp = await fetch(`/api/admin/worship24/export${queryString}`, {
        headers: getAuthHeader(),
      });
      if (resp.status === 401) { alert('Unauthorized. Please log in again.'); return; }
      if (!resp.ok) throw new Error('Export failed');
      const contentDisposition = resp.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || `worship24-export-${new Date().toISOString().split('T')[0]}.xlsx`;
      const blob = await resp.blob();
      downloadExcelFile(blob, filename);
    } catch (err) {
      console.error('Worship export failed:', err);
      alert('Failed to export data. Please try again.');
    } finally { setExporting(false); }
  }, [activeSearchQuery, worshipExportMonth, worshipExportYear, worshipExportStatus]);

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

  // Export HMS enrollments to Excel - exports the currently filtered/searched data
  const handleHmsExport = useCallback(async () => {
    try {
      setHmsExporting(true);
      const params = new URLSearchParams();
      
      // Add search query if present
      if (activeHmsSearchQuery && activeHmsSearchQuery.trim().length > 0) {
        params.append('q', activeHmsSearchQuery.trim());
      }
      
      // Add applied filters (month, year, status)
      if (hmsAppliedMonth) params.append('month', hmsAppliedMonth);
      if (hmsAppliedYear) params.append('year', hmsAppliedYear);
      if (hmsAppliedStatus) params.append('status', hmsAppliedStatus);
      
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
  }, [activeHmsSearchQuery, hmsAppliedMonth, hmsAppliedYear, hmsAppliedStatus]);

  // Memoize HMS export button disabled state
  const isHmsExportDisabled = useMemo(() => {
    if (hmsExporting || hmsTotalCount === 0) return true;
    
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    // Disable if future month/year is selected in applied filters
    if (hmsAppliedYear && hmsAppliedMonth) {
      const selectedYear = parseInt(hmsAppliedYear);
      const selectedMonth = parseInt(hmsAppliedMonth);
      if (selectedYear === currentYear && selectedMonth > currentMonth) return true;
      if (selectedYear > currentYear) return true;
    }
    
    return false;
  }, [hmsExporting, hmsTotalCount, hmsAppliedMonth, hmsAppliedYear]);

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

  const studentsRowsDesktop = useMemo(() => {
    return sortedStudents.map((s: any, i: number) => (
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
        <td className="px-4 py-3 text-gray-200">{getHmsStatusBadge(s.status)}</td>
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(s.created_at)}</td>
        <td className="px-4 py-3 text-right">
          <Link href={`/admin/contacts/${s.id}`} className="px-3 py-1 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
        </td>
      </tr>
    ));
  }, [sortedStudents, formatDatePretty, formatDateShort]);

  const studentsRowsMobile = useMemo(() => {
    return sortedStudents.map((s: any) => (
      <div key={s.id} className="bg-[#232323] rounded-md p-3 border border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span>#{s.id}</span>
              <span className="mx-1">•</span>
              {getHmsStatusBadge(s.status)}
            </div>
            <div className="font-medium text-gray-100 truncate">{s.full_name}</div>
            <div className="text-sm text-gray-200 mt-1">{formatDatePretty(s.date_of_birth)} • {s.phone_number || '-'}</div>
            <div className="text-sm text-gray-200 truncate mt-1">{s.email || '-'}</div>
            <div className="text-xs text-gray-400 mt-1">Submitted: {formatDatePretty(s.created_at)}</div>
          </div>
          <div className="flex-shrink-0">
            <Link href={`/admin/contacts/${s.id}`} className="px-3 py-2 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
          </div>
        </div>
      </div>
    ));
  }, [sortedStudents, formatDatePretty, formatDateShort]);

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

  const contactsRowsDesktop = useMemo(() => {
    return sortedContacts.map((c: any, i: number) => (
      <tr key={c.id} className={`border-b border-gray-800 hover:bg-[#151515]`} style={{ backgroundColor: i % 2 === 0 ? '#242424' : '#1a1a1a' }}>
        <td className="px-4 py-3 text-gray-200">{c.id}</td>
        <td className="px-4 py-3 text-gray-100 truncate max-w-[1px]">{c.name}</td>
        <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.phone || '-'}</td>
        <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.email || '-'}</td>
        <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.location || '-'}</td>
        <td className="px-4 py-3 text-gray-200">{getHmsStatusBadge(c.status)}</td>
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(c.created_at)}</td>
        <td className="px-4 py-3 text-right">
          <Link
            href={`/admin/contacts/getintouch/${c.id}?return=${encodeURIComponent(getInTouchReturnTo)}`}
            className="px-3 py-1 rounded text-black whitespace-nowrap inline-block"
            style={{ backgroundColor: accentGold }}
          >
            View
          </Link>
        </td>
      </tr>
    ));
  }, [sortedContacts, formatDatePretty]);

  const contactsRowsMobile = useMemo(() => {
    return sortedContacts.map((c: any) => (
      <div key={c.id} className="bg-[#232323] rounded-md p-3 border border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span>#{c.id}</span>
              <span className="mx-1">•</span>
              {getHmsStatusBadge(c.status)}
            </div>
            <div className="font-medium text-gray-100 truncate">{c.name}</div>
            <div className="text-sm text-gray-200 mt-1">{formatDatePretty(c.created_at)} • {c.phone || '-'}</div>
            <div className="text-sm text-gray-200 truncate mt-1">{c.email || '-'}</div>
            {c.location && <div className="text-sm text-gray-200 truncate mt-1">{c.location}</div>}
            {c.hear_about_us && <div className="text-sm text-gray-200 truncate mt-1">{c.hear_about_us + (c.other_hear_about_us ? `: ${c.other_hear_about_us}` : '')}</div>}
          </div>
          <div className="flex-shrink-0">
            <Link
              href={`/admin/contacts/getintouch/${c.id}?return=${encodeURIComponent(getInTouchReturnTo)}`}
              className="px-3 py-2 rounded text-black whitespace-nowrap inline-block"
              style={{ backgroundColor: accentGold }}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    ));
  }, [sortedContacts, formatDatePretty]);

  const sortedWorship = useMemo(() => {
    const arr = [...worship];
    const dir = sortDir === 'asc' ? 1 : -1;
    if (sortBy === 'id') {
      arr.sort((a: any, b: any) => (Number(a.id || 0) - Number(b.id || 0)) * dir);
      return arr;
    }
    if (sortBy === 'created_at' || sortBy === 'booking_date') {
      arr.sort((a: any, b: any) => {
        const dateA = String(a[sortBy] || '').split('T')[0];
        const dateB = String(b[sortBy] || '').split('T')[0];
        return dateA.localeCompare(dateB) * dir;
      });
      return arr;
    }
    arr.sort((a: any, b: any) => {
      const sa = String(a?.[sortBy] || '').toLowerCase();
      const sb = String(b?.[sortBy] || '').toLowerCase();
      return sa.localeCompare(sb) * dir;
    });
    return arr;
  }, [worship, sortBy, sortDir]);

  const worshipRowsDesktop = useMemo(() => {
    return sortedWorship.map((c: any, i: number) => (
      <tr key={c.id} className={`border-b border-gray-800 hover:bg-[#151515]`} style={{ backgroundColor: i % 2 === 0 ? '#242424' : '#1a1a1a' }}>
        <td className="px-4 py-3 text-gray-200">{c.id}</td>
        <td className="px-4 py-3 text-gray-100 truncate max-w-[1px]">{c.name}</td>
        <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.phone || '-'}</td>
        <td className="px-4 py-3 text-gray-200 truncate max-w-[1px]">{c.email || '-'}</td>
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(c.booking_date)}</td>
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{c.timeslot ? String(c.timeslot).replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase()) : '-'}</td>
        <td className="px-4 py-3 text-gray-200">{getHmsStatusBadge(c.status)}</td>
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{formatDatePretty(c.created_at)}</td>
        <td className="px-4 py-3 text-right">
          <Link href={`/admin/contacts/worship24/${c.id}`} className="px-3 py-1 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
        </td>
      </tr>
    ));
  }, [sortedWorship, formatDatePretty]);

  const worshipRowsMobile = useMemo(() => {
    return sortedWorship.map((c: any) => (
      <div key={c.id} className="bg-[#232323] rounded-md p-3 border border-gray-700">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
              <span>#{c.id}</span>
              <span className="mx-1">•</span>
              {getHmsStatusBadge(c.status)}
            </div>
            <div className="font-medium text-gray-100 truncate">{c.name}</div>
            <div className="text-sm text-gray-200 mt-1">{formatDatePretty(c.booking_date)} • {c.phone || '-'}</div>
            <div className="text-sm text-gray-200 truncate mt-1">{c.email || '-'}</div>
            {c.location && <div className="text-sm text-gray-200 truncate mt-1">{c.location}</div>}
          </div>
          <div className="flex-shrink-0">
            <Link href={`/admin/contacts/worship24/${c.id}`} className="px-3 py-2 rounded text-black whitespace-nowrap inline-block" style={{ backgroundColor: accentGold }}>View</Link>
          </div>
        </div>
      </div>
    ));
  }, [sortedWorship, formatDatePretty]);

  const isWorshipExportDisabled = useMemo(() => {
    if (exporting || worshipTotalCount === 0) return true;
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (worshipExportYear && worshipExportMonth) {
      const selectedYear = parseInt(worshipExportYear);
      const selectedMonth = parseInt(worshipExportMonth);
      if (selectedYear === currentYear && selectedMonth > currentMonth) return true;
      if (selectedYear > currentYear) return true;
    }
    return false;
  }, [exporting, worshipTotalCount, worshipExportMonth, worshipExportYear]);

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
              className={`flex items-center gap-2 transition-colors text-base cursor-pointer ${activeTab === 'hms' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'hms' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">HMS Enrollments</span>
            </button>

            <button
              onClick={() => { setActiveTab('getintouch'); setPage(1); }}
              className={`flex items-center gap-2 transition-colors text-base cursor-pointer ${activeTab === 'getintouch' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'getintouch' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">Get In Touch</span>
            </button>

            <button
              onClick={() => { setActiveTab('worship24'); setWorship24SubTab('notifications'); setPage(1); }}
              className={`flex items-center gap-2 transition-colors text-base cursor-pointer ${activeTab === 'worship24' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
              style={activeTab === 'worship24' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
            >
              <Book size={16} />
              <span className="font-medium">24 Hours Worship</span>
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
                  value={hmsInputValue}
                  onChange={(e) => handleHmsInputChange(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { flushHmsInput(); doHmsSearch(); } }}
                  placeholder="Search name, email or phone"
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white w-full md:w-1/3"
                />
                <button
                  onClick={() => { flushHmsInput(); doHmsSearch(); }}
                  disabled={searching}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer"
                >
                  Search
                </button>
                <button
                  onClick={() => { setHmsInputValue(''); setHmsSearchQuery(''); setActiveHmsSearchQuery(''); setPage(1); }}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-[#FDB813] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Export Filters and Button for HMS */}
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-300">Filters:</span>
                <select
                  value={hmsExportMonth}
                  onChange={(e) => setHmsExportMonth(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Months</option>
                  <option value="1" style={{ background: '#2e2e2e', color: 'white' }}>January</option>
                  <option value="2" style={{ background: '#2e2e2e', color: 'white' }}>February</option>
                  <option value="3" style={{ background: '#2e2e2e', color: 'white' }}>March</option>
                  <option value="4" style={{ background: '#2e2e2e', color: 'white' }}>April</option>
                  <option value="5" style={{ background: '#2e2e2e', color: 'white' }}>May</option>
                  <option value="6" style={{ background: '#2e2e2e', color: 'white' }}>June</option>
                  <option value="7" style={{ background: '#2e2e2e', color: 'white' }}>July</option>
                  <option value="8" style={{ background: '#2e2e2e', color: 'white' }}>August</option>
                  <option value="9" style={{ background: '#2e2e2e', color: 'white' }}>September</option>
                  <option value="10" style={{ background: '#2e2e2e', color: 'white' }}>October</option>
                  <option value="11" style={{ background: '#2e2e2e', color: 'white' }}>November</option>
                  <option value="12" style={{ background: '#2e2e2e', color: 'white' }}>December</option>
                </select>
                <select
                  value={hmsExportYear}
                  onChange={(e) => setHmsExportYear(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Years</option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const years = [];
                    for (let year = currentYear; year >= 2020; year--) {
                      years.push(year);
                    }
                    return years.map(year => (
                      <option key={year} value={year} style={{ background: '#2e2e2e', color: 'white' }}>{year}</option>
                    ));
                  })()}
                </select>
                <select
                  value={hmsExportStatus}
                  onChange={(e) => setHmsExportStatus(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Status</option>
                  <option value="Submitted" style={{ background: '#2e2e2e', color: 'white' }}>Submitted</option>
                  <option value="Accepted" style={{ background: '#2e2e2e', color: 'white' }}>Accepted</option>
                  <option value="Rejected" style={{ background: '#2e2e2e', color: 'white' }}>Rejected</option>
                  <option value="Enrolled" style={{ background: '#2e2e2e', color: 'white' }}>Enrolled</option>
                  <option value="Archived" style={{ background: '#2e2e2e', color: 'white' }}>Archived</option>
                </select>
                <button
                  onClick={applyHmsFilters}
                  className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
                <button
                  onClick={clearHmsFilters}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-gray-600 hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={handleHmsExport}
                  disabled={isHmsExportDisabled}
                  className="px-3 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  title="Export enrollments to Excel file"
                >
                  <Download size={16} />
                  {hmsExporting ? 'Exporting...' : 'Export to Excel'}
                </button>
              </div>

              <div className="mt-2 text-white text-base font-medium">
                {activeHmsSearchQuery ? (
                  hmsTotalCount === 0 ? (
                    <span>No results found for &quot;{activeHmsSearchQuery}&quot;</span>
                  ) : (
                    <span>Found {hmsTotalCount} Result{hmsTotalCount !== 1 ? 's' : ''} for &quot;{activeHmsSearchQuery}&quot;</span>
                  )
                ) : (
                  <span>Total: {hmsTotalCount} Enrollment{hmsTotalCount !== 1 ? 's' : ''}</span>
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
                        <th onClick={() => handleSort('id')} style={{ width: '5%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            # {sortBy === 'id' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('full_name')} style={{ width: '23%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            Name {sortBy === 'full_name' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('date_of_birth')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            DOB {sortBy === 'date_of_birth' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('phone_number')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            Phone {sortBy === 'phone_number' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('email')} style={{ width: '22%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            Email {sortBy === 'email' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('status')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            Status {sortBy === 'status' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                          </div>
                        </th>
                        <th onClick={() => handleSort('created_at')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                          <div className="flex items-center gap-1">
                            Submitted <ArrowUpDown size={14} className={sortBy === 'created_at' ? 'text-[#FDB813]' : 'opacity-40'}/>
                          </div>
                        </th>
                        <th style={{ width: '12%', minWidth: '110px' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsRowsDesktop}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/card view (below md) */}
                <div className="md:hidden space-y-3 mt-2">
                  {studentsRowsMobile}
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
                  value={searchInputValue}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { flushSearchInput(); doSearch(); } }}
                  placeholder="Search name, email, phone or location"
                  className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white w-full md:w-1/3"
                />
                <button
                  onClick={() => { flushSearchInput(); doSearch(); }}
                  disabled={searching}
                  className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer"
                >
                  Search
                </button>
                <button
                  onClick={() => { setSearchInputValue(''); setSearchQuery(''); setActiveSearchQuery(''); setPage(1); }}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-[#FDB813] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>

              {/* Export Filters and Button */}
              <div className="mb-3 flex gap-2 items-center flex-wrap">
                <span className="text-sm text-gray-300">Filters:</span>
                <select
                  value={exportMonth}
                  onChange={(e) => setExportMonth(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Months</option>
                  <option value="1" style={{ background: '#2e2e2e', color: 'white' }}>January</option>
                  <option value="2" style={{ background: '#2e2e2e', color: 'white' }}>February</option>
                  <option value="3" style={{ background: '#2e2e2e', color: 'white' }}>March</option>
                  <option value="4" style={{ background: '#2e2e2e', color: 'white' }}>April</option>
                  <option value="5" style={{ background: '#2e2e2e', color: 'white' }}>May</option>
                  <option value="6" style={{ background: '#2e2e2e', color: 'white' }}>June</option>
                  <option value="7" style={{ background: '#2e2e2e', color: 'white' }}>July</option>
                  <option value="8" style={{ background: '#2e2e2e', color: 'white' }}>August</option>
                  <option value="9" style={{ background: '#2e2e2e', color: 'white' }}>September</option>
                  <option value="10" style={{ background: '#2e2e2e', color: 'white' }}>October</option>
                  <option value="11" style={{ background: '#2e2e2e', color: 'white' }}>November</option>
                  <option value="12" style={{ background: '#2e2e2e', color: 'white' }}>December</option>
                </select>
                <select
                  value={exportYear}
                  onChange={(e) => setExportYear(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Years</option>
                  {(() => {
                    const currentYear = new Date().getFullYear();
                    const currentMonth = new Date().getMonth() + 1;
                    const years = [];
                    for (let year = currentYear; year >= 2020; year--) {
                      years.push(year);
                    }
                    return years.map(year => (
                      <option key={year} value={year} style={{ background: '#2e2e2e', color: 'white' }}>{year}</option>
                    ));
                  })()}
                </select>
                <select
                  value={exportStatus}
                  onChange={(e) => setExportStatus(e.target.value)}
                  className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                >
                  <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Status</option>
                  <option value="Submitted" style={{ background: '#2e2e2e', color: 'white' }}>Submitted</option>
                  <option value="Accepted" style={{ background: '#2e2e2e', color: 'white' }}>Accepted</option>
                  <option value="Rejected" style={{ background: '#2e2e2e', color: 'white' }}>Rejected</option>
                  <option value="Archived" style={{ background: '#2e2e2e', color: 'white' }}>Archived</option>
                </select>
                <button
                  onClick={applyFilters}
                  className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Apply
                </button>
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 rounded bg-[#333] text-white border border-gray-600 hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                >
                  Clear
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExportDisabled}
                  className="px-3 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  title="Export data to Excel file"
                >
                  <Download size={16} />
                  {exporting ? 'Exporting...' : 'Export to Excel'}
                </button>
              </div>

              <div className="mt-2 text-white text-base font-medium">
                {activeSearchQuery ? (
                  totalCount === 0 ? (
                    <span>No results found for &quot;{activeSearchQuery}&quot;</span>
                  ) : (
                    <span>Found {totalCount} Result{totalCount !== 1 ? 's' : ''} for &quot;{activeSearchQuery}&quot;</span>
                  )
                ) : (
                  <span>Total: {totalCount} Submission{totalCount !== 1 ? 's' : ''}</span>
                )}
              </div>

              {totalCount > 0 && (
                <div className="overflow-x-auto">
                  <div className="w-full bg-[#1f1f1f] rounded-lg p-2 md:p-3 border border-gray-700">
                    <div className="hidden md:block">
                      <table className="w-full table-fixed text-left text-sm bg-[#232323] rounded-lg overflow-hidden">
                        <thead>
                          <tr style={{ backgroundColor: '#2e2e2e', color: '#e6e6e6' }}>
                            <th onClick={() => handleSort('id')} style={{ width: '5%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                # {sortBy === 'id' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('name')} style={{ width: '18%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                Name {sortBy === 'name' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('phone')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                Phone {sortBy === 'phone' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('email')} style={{ width: '22%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                Email {sortBy === 'email' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('location')} style={{ width: '18%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                Location {sortBy === 'location' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('status')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                              <div className="flex items-center gap-1">
                                Status {sortBy === 'status' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th onClick={() => handleSort('created_at')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors whitespace-nowrap">
                              <div className="flex items-center gap-1">
                                Submitted {sortBy === 'created_at' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}
                              </div>
                            </th>
                            <th style={{ width: '12%', minWidth: '110px' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contactsRowsDesktop}
                        </tbody>
                      </table>
                    </div>

                    <div className="md:hidden space-y-3 mt-2">
                      {contactsRowsMobile}
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

        {activeTab === 'worship24' && (
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex items-center gap-4 border-b border-gray-700">
                    <button
                      onClick={() => setWorship24SubTab('notifications')}
                      className={`transition-colors text-base cursor-pointer ${worship24SubTab === 'notifications' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
                      style={worship24SubTab === 'notifications' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
                    >
                      <span className="font-medium">Email Notifications</span>
                    </button>
                    <button
                      onClick={() => setWorship24SubTab('slots')}
                      className={`transition-colors text-base cursor-pointer ${worship24SubTab === 'slots' ? 'pb-2' : 'text-gray-300 hover:text-gray-100 pb-2'}`}
                      style={worship24SubTab === 'slots' ? { color: accentGold, borderBottom: `2px solid ${accentGold}`, background: 'transparent' } : { background: 'transparent' }}
                    >
                      <span className="font-medium">View Slots</span>
                    </button>
                  </div>
                </div>

                {worship24SubTab === 'slots' ? (
                  <ManageSlots />
                ) : (
                  <>
                <div className="mb-3 flex gap-2 items-center flex-wrap">
                  <input
                    type="search"
                    value={searchInputValue}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { flushSearchInput(); doWorshipSearch(); } }}
                    placeholder="Search name, email, phone or location"
                    className="px-3 py-2 rounded bg-[#111] border border-gray-700 text-sm text-white w-full md:w-1/3"
                  />
                  <button
                    onClick={() => { flushSearchInput(); doWorshipSearch(); }}
                    disabled={searching}
                    className="px-3 py-2 rounded bg-[#FDB813] text-black font-semibold hover:bg-[#e5a711] transition-colors cursor-pointer"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => { setSearchInputValue(''); setSearchQuery(''); setActiveSearchQuery(''); setPage(1); }}
                    className="px-3 py-2 rounded bg-[#333] text-white border border-[#FDB813] hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                </div>

                <div className="mb-3 flex gap-2 items-center flex-wrap">
                  <span className="text-sm text-gray-300">Filters:</span>
                  <select
                    value={worshipExportMonth}
                    onChange={(e) => setWorshipExportMonth(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                  >
                    <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Months</option>
                    {Array.from({ length: 12 }, (_, i) => <option key={i+1} value={i+1} style={{ background: '#2e2e2e', color: 'white' }}>{new Date(0, i).toLocaleString('en-US', { month: 'long' })}</option>)}
                  </select>
                  <select
                    value={worshipExportYear}
                    onChange={(e) => setWorshipExportYear(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                  >
                    <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Years</option>
                    {worshipYears && worshipYears.length > 0 ? (
                      worshipYears.map(y => (<option key={y} value={y} style={{ background: '#2e2e2e', color: 'white' }}>{y}</option>))
                    ) : (
                      (() => { const currentYear = new Date().getFullYear(); const years = []; for (let year = currentYear; year >= 2020; year--) { years.push(year); } return years.map(year => (<option key={year} value={year} style={{ background: '#2e2e2e', color: 'white' }}>{year}</option>)); })()
                    )}
                  </select>
                  <select
                    value={worshipExportStatus}
                    onChange={(e) => setWorshipExportStatus(e.target.value)}
                    className="px-3 py-2 rounded-md bg-[#2e2e2e] border-2 border-[#FDB813] text-sm text-white"
                  >
                    <option value="" style={{ background: '#2e2e2e', color: 'white' }}>All Status</option>
                    <option value="Submitted" style={{ background: '#2e2e2e', color: 'white' }}>Submitted</option>
                    <option value="Accepted" style={{ background: '#2e2e2e', color: 'white' }}>Accepted</option>
                    <option value="Rejected" style={{ background: '#2e2e2e', color: 'white' }}>Rejected</option>
                    <option value="Archived" style={{ background: '#2e2e2e', color: 'white' }}>Archived</option>
                  </select>
                  <button
                    onClick={applyWorshipFilters}
                    className="px-3 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => { setWorshipExportMonth(''); setWorshipExportYear(''); setWorshipExportStatus(''); setWorshipAppliedMonth(''); setWorshipAppliedYear(''); setWorshipAppliedStatus(''); setPage(1); }}
                    className="px-3 py-2 rounded bg-[#333] text-white border border-gray-600 hover:bg-[#3E3E3E] transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                  <div className="ml-auto flex flex-col items-end gap-2">
                    <button
                      onClick={handleWorshipExport}
                      disabled={isWorshipExportDisabled}
                      className="px-3 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      title="Export worship24 to Excel file"
                    >
                      <Download size={16} />
                      {exporting ? 'Exporting...' : 'Export to Excel'}
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-white text-base font-medium">
                  {activeSearchQuery ? (
                    worshipTotalCount === 0 ? (
                      <span>No results found for &quot;{activeSearchQuery}&quot;</span>
                    ) : (
                      <span>Found {worshipTotalCount} Result{worshipTotalCount !== 1 ? 's' : ''} for &quot;{activeSearchQuery}&quot;</span>
                    )
                  ) : (
                    <span>Total: {worshipTotalCount} Submission{worshipTotalCount !== 1 ? 's' : ''}</span>
                  )}
                </div>

                {worshipTotalCount > 0 && (
                  <div className="overflow-x-auto">
                    <div className="w-full bg-[#1f1f1f] rounded-lg p-2 md:p-3 border border-gray-700">
                      <div className="hidden md:block">
                        <table className="w-full table-fixed text-left text-sm bg-[#232323] rounded-lg overflow-hidden">
                          <thead>
                            <tr style={{ backgroundColor: '#2e2e2e', color: '#e6e6e6' }}>
                              <th onClick={() => handleSort('id')} style={{ width: '5%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1"># {sortBy === 'id' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('name')} style={{ width: '20%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Name {sortBy === 'name' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('phone')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Phone {sortBy === 'phone' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('email')} style={{ width: '14%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Email {sortBy === 'email' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('booking_date')} style={{ width: '15%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Booking Date {sortBy === 'booking_date' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('timeslot')} style={{ width: '18%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Timeslot {sortBy === 'timeslot' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('status')} style={{ width: '12%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Status {sortBy === 'status' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th onClick={() => handleSort('created_at')} style={{ width: '10%' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-[#3a3a3a] transition-colors">
                                <div className="flex items-center gap-1">Submitted {sortBy === 'created_at' ? <span className="text-[#FDB813]">{sortDir === 'asc' ? '↑' : '↓'}</span> : <ArrowUpDown size={14} className="inline opacity-40"/>}</div>
                              </th>
                              <th style={{ width: '12%', minWidth: '110px' }} className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {worshipRowsDesktop}
                          </tbody>
                        </table>
                      </div>

                      <div className="md:hidden space-y-3 mt-2">
                        {worshipRowsMobile}
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
                          <button disabled={!hasMore} onClick={() => setPage(Math.ceil(worshipTotalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
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
                          <button disabled={!hasMore} onClick={() => setPage(Math.ceil(worshipTotalCount / pageSize))} className={goldBtnClass(!hasMore)} title="Last Page">
                            <ChevronsRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                  </>
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
