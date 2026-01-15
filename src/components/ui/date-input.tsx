"use client";

import React, { useEffect, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Calendar } from './calendar';
import { Input } from './input';

// Reusable Date input with popover calendar. Value format is YYYY-MM-DD string.
export function DateInput({ value, onChange, className, disabled = false, allowFuture = true, isDateDisabled, yearStart, yearEnd }: { value?: string; onChange: (v: string) => void; className?: string; disabled?: boolean; allowFuture?: boolean; isDateDisabled?: (d: Date) => boolean; yearStart?: number; yearEnd?: number }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState<string>(value || '');

  const parseDateValue = (v?: string) => {
    if (!v) return undefined;
    try {
      let s = String(v).trim();
      if (!s) return undefined;
      if (s.includes('T')) s = s.split('T')[0];
      const parts = s.split('-').map(p => Number(p));
      if (parts.length === 3 && parts.every(p => !Number.isNaN(p))) {
        const [year, month, day] = parts;
        return new Date(year, month - 1, day);
      }
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d;
    } catch (e) {
      // ignore
    }
    return undefined;
  };

  useEffect(() => { setText(value || ''); }, [value]);

  const dateValue = parseDateValue(text || value);

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const [displayMonth, setDisplayMonth] = useState<Date>(() => parseDateValue(value) || new Date());
  useEffect(() => {
    const dv = parseDateValue(value);
    setDisplayMonth(prev => {
      if (!dv) return prev || new Date();
      if (!prev || dv.getTime() !== prev.getTime()) return dv;
      return prev;
    });
  }, [value]);

  const handleSelect = (date?: Date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      setText(formatted);
      onChange(formatted);
      setDisplayMonth(date);
      setOpen(false);
    }
  };

  const handleInputChange = (v: string) => setText(v);

  const handleBlur = () => {
    const s = (text || '').trim();
    if (!s) { onChange(''); return; }
    const parsed = parseDateValue(s);
    if (parsed) {
      const year = parsed.getFullYear();
      const month = String(parsed.getMonth() + 1).padStart(2, '0');
      const day = String(parsed.getDate()).padStart(2, '0');
      const formatted = `${year}-${month}-${day}`;
      setText(formatted);
      onChange(formatted);
      setDisplayMonth(parsed);
    } else {
      setText(value || '');
    }
  };

  const handleClear = () => { setText(''); onChange(''); };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex flex-col gap-1">
        <div style={{ width: '100%' }} className="relative">
          <Input
            value={text}
            onChange={(e: any) => handleInputChange(e.target.value)}
            onBlur={handleBlur}
            placeholder="YYYY-MM-DD"
            disabled={disabled}
            className={
              `w-full px-4 py-2 ${disabled ? 'bg-gray-800' : 'bg-[#2e2e2e]'} rounded-md border border-gray-600 text-white pl-10 pr-3 focus:outline-none focus:border-[#FDB813] cursor-text ${className || ''}`
            }
          />
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Open calendar"
              title="Open calendar"
              disabled={disabled}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 ${disabled ? 'text-gray-400' : 'text-white'}`}
            >
              <CalendarIcon />
            </button>
          </PopoverTrigger>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className={`text-xs ${disabled ? 'text-gray-500' : 'text-gray-400 hover:text-gray-200'}`}
          >
            Clear
          </button>
        </div>
      </div>
      <PopoverContent className="w-auto p-2 !bg-[#2e2e2e] border-gray-600" align="start" style={{ backgroundColor: '#2e2e2e', color: '#fff' }}>
        <div className="flex items-center justify-between px-2 pb-2 gap-2">
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-300">Month</div>
            <select
              value={displayMonth ? displayMonth.getMonth() : ''}
              onChange={(e) => {
                const m = Number(e.target.value);
                if (!Number.isFinite(m)) return;
                const y = displayMonth ? displayMonth.getFullYear() : new Date().getFullYear();
                setDisplayMonth(new Date(y, m, 1));
              }}
              className="bg-[#1a1a1a] text-white border border-gray-700 rounded px-2 py-1"
            >
              {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((label, i) => (
                <option key={i} value={i}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-300">Year</div>
            <select
              value={displayMonth ? displayMonth.getFullYear() : new Date().getFullYear()}
              onChange={(e) => {
                const y = Number(e.target.value);
                if (!Number.isFinite(y)) return;
                const m = displayMonth ? displayMonth.getMonth() : new Date().getMonth();
                setDisplayMonth(new Date(y, m, 1));
              }}
              className="bg-[#1a1a1a] text-white border border-gray-700 rounded px-2 py-1"
            >
              {(() => {
                const currentYear = new Date().getFullYear();
                let start = yearStart;
                let end = yearEnd;
                if (!Number.isFinite(start as number)) start = currentYear - 5; // default: show a few past years
                if (!Number.isFinite(end as number)) end = currentYear + 1; // default: current and next year
                const years: number[] = [];
                for (let y = start as number; y <= (end as number); y++) years.push(y);
                return years.map((yr) => <option key={yr} value={yr}>{yr}</option>);
              })()}
            </select>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={dateValue}
          month={displayMonth}
          onSelect={(d) => handleSelect(d as Date | undefined)}
          onMonthChange={(m: Date) => setDisplayMonth(m)}
          disabled={(date) => {
            if (!allowFuture && date > today) return true;
            if (typeof isDateDisabled === 'function') return isDateDisabled(date);
            return false;
          }}
          initialFocus
          className="!bg-[#2e2e2e] text-white"
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateInput;
