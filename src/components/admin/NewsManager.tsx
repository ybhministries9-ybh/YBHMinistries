import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, BarChart3, X, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from '../ui/dialog';
import { toast } from 'sonner';
import { EventsManager } from './EventsManager';
import { useAdminUser } from '@/hooks/useAdminUser';

interface EnrollmentMonth {
  month: string;
  indian: number;
  nonIndian: number;
  total: number;
}

interface YearlyReport {
  id: string;
  year: number;
  classType: 'keyboard' | 'guitar' | 'lcm';
  data: EnrollmentMonth[];
  published: boolean;
}

type ContentType = 'events' | 'reports';

export function NewsManager() {
  const [activeTab, setActiveTab] = useState<ContentType>('events');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">News Management</h2>
        <p className="text-gray-400">Manage events, reports, and news content for the website</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'events'
                ? 'border-[#FDB813] text-[#FDB813] bg-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-[#2E2E2E]'
            }`}
          >
            <Calendar size={18} />
            <span>Upcoming Events</span>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'reports'
                ? 'border-[#FDB813] text-[#FDB813] bg-[#2E2E2E]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-[#2E2E2E]'
            }`}
          >
            <BarChart3 size={18} />
            <span>Yearly Reports</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'events' && <EventsManager />}
        {activeTab === 'reports' && <ReportsManager />}
      </div>
    </div>
  );
}

// Reports Manager Sub-Component
function ReportsManager() {
  const { isViewer } = useAdminUser();
  const [reports, setReports] = useState<YearlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || '') : '';
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('/api/admin/reports', {
        cache: 'no-store',
        headers
      });
      const result = await response.json();

      if (result.success) {
        setReports(result.data);
      } else {
        toast.error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Error loading reports');
    } finally {
      setLoading(false);
    }
  };

  // Load reports on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  const handleAdd = () => {
    // If there is already a temporary (unsaved) report open, show confirmation
    const hasTemp = reports.some(r => r.id.startsWith('temp-'));
    if (hasTemp) {
      setShowDiscardConfirm(true);
      return;
    }

    // Create a temporary new report in local state for editing
    const tempId = `temp-${Date.now()}`;
    const newReport: YearlyReport = {
      id: tempId,
      year: new Date().getFullYear(),
      classType: 'keyboard',
      published: true,
      data: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map(month => ({ month, indian: 0, nonIndian: 0, total: 0 }))
    };
    
    setReports(prev => [newReport, ...prev]);
    setEditingId(tempId);
    setExpandedReport(tempId);
  };

  const handleUpdate = (id: string, updates: Partial<YearlyReport>) => {
    // Update local state immediately for responsive UI
    setReports(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const handleUpdateMonth = (reportId: string, monthIndex: number, field: keyof EnrollmentMonth, value: number) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const newData = [...report.data];
      newData[monthIndex] = {
        ...newData[monthIndex],
        [field]: value,
        total: field === 'indian' || field === 'nonIndian' 
          ? (field === 'indian' ? value + newData[monthIndex].nonIndian : newData[monthIndex].indian + value)
          : newData[monthIndex].total
      };
      handleUpdate(reportId, { data: newData });
    }
  };

  const handleDelete = (id: string) => {
    setReportToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (reportToDelete) {
      try {
        const token = typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || '') : '';
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(`/api/admin/reports?id=${reportToDelete}`, {
          method: 'DELETE',
          headers
        });

        const result = await response.json();

        if (result.success) {
          setReports(prev => prev.filter(r => r.id !== reportToDelete));
          toast.success('Report deleted successfully');
        } else {
          toast.error(result.error || 'Failed to delete report');
        }
      } catch (error) {
        console.error('Error deleting report:', error);
        toast.error('Error deleting report');
      } finally {
        setReportToDelete(null);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = async (id: string) => {
    try {
      const report = reports.find(r => r.id === id);
      if (!report) return;

      // Validate year before saving
      const yearVal = Number(report.year);
      if (!Number.isInteger(yearVal) || yearVal < 1900 || String(yearVal).length > 4) {
        setValidationErrors(prev => ({ ...prev, [id]: 'Year must be a number ≥ 1900 and at most 4 digits' }));
        toast.error('Please fix validation errors before saving');
        return;
      }

      // Check if this is a new report (temporary ID)
      const isNewReport = id.startsWith('temp-');

      const token = typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || '') : '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      if (isNewReport) {
        // Create new report
        const response = await fetch('/api/admin/reports', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            year: report.year,
            classType: report.classType,
            data: report.data,
            published: report.published
          })
        });

        const result = await response.json();

        if (result.success) {
          // Remove temp report and refresh from database
          await fetchReports();
          setEditingId(null);
          setExpandedReport(null);
          toast.success('Report created successfully');
        } else {
          toast.error(result.error || 'Failed to create report');
        }
      } else {
        // Update existing report
        const response = await fetch('/api/admin/reports', {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            id: report.id,
            year: report.year,
            classType: report.classType,
            data: report.data,
            published: report.published
          })
        });

        const result = await response.json();

        if (result.success) {
          setEditingId(null);
          // Close expanded form and show card
          setExpandedReport(null);
          toast.success('Report saved successfully');
        } else {
          toast.error(result.error || 'Failed to save report');
        }
      }
    } catch (error) {
      console.error('Error saving report:', error);
      toast.error('Error saving report');
    }
  };

  // Toggle published (visibility) for a report card
  const togglePublished = async (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (!report) return;

    const newVal = !report.published;
    // Optimistic update
    handleUpdate(reportId, { published: newVal });

    // If it's a temporary report, don't call API yet
    if (reportId.startsWith('temp-')) return;

    try {
      const token = typeof window !== 'undefined' ? (localStorage.getItem('admin_token') || '') : '';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch('/api/admin/reports', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id: reportId, published: newVal })
      });

      const result = await response.json();
      if (!result.success) {
        // revert
        handleUpdate(reportId, { published: report.published });
        toast.error(result.error || 'Failed to update visibility');
      } else {
        toast.success(newVal ? 'Report published' : 'Report unpublished');
      }
    } catch (err) {
      handleUpdate(reportId, { published: report.published });
      console.error('Error toggling visibility:', err);
      toast.error('Error updating visibility');
    }
  };

  const getClassTypeName = (type: string) => {
    const names = {
      keyboard: 'Keyboard',
      guitar: 'Guitar',
      lcm: 'LCM (London College of Music)'
    };
    return names[type] || type;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <div className="text-white text-base font-medium">
          Total: <span className="text-[#FDB813] font-bold">{reports.length}</span> report(s)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{reports.filter(r => r.published).length}</span>
        </div>
        <Button
          onClick={handleAdd}
          title="Add a new report"
          disabled={isViewer}
          className={`bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
        >
          <Plus size={16} className="mr-2" />
          Add Report
        </Button>
      </div>

      {/* Discard confirmation dialog shown when attempting to open a new form while a temp exists */}
      <Dialog open={showDiscardConfirm} onOpenChange={(open) => setShowDiscardConfirm(open)}>
        <DialogOverlay />
        <DialogContent hideClose className="bg-[#2E2E2E] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Save draft?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mb-6 text-gray-300">You have an unsaved report open.</DialogDescription>
          <DialogFooter>
            <Button onClick={() => setShowDiscardConfirm(false)} className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-700 px-4 py-2 rounded-md">Cancel</Button>
            <Button onClick={() => {
              // remove any temp reports and then create a new one
              setReports(prev => prev.filter(r => !r.id.startsWith('temp-')));
              const tempId = `temp-${Date.now()}`;
              const newReport: YearlyReport = {
                id: tempId,
                year: new Date().getFullYear(),
                classType: 'keyboard',
                published: true,
                data: [
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ].map(month => ({ month, indian: 0, nonIndian: 0, total: 0 }))
              };
              setReports(prev => [newReport, ...prev]);
              setExpandedReport(tempId);
              setEditingId(tempId);
              setShowDiscardConfirm(false);
            }} className="bg-[#FDB813] hover:bg-[#e5a711] text-black px-4 py-2 rounded-md">Discard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reports List */}
      {reports.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No reports yet. Click "Add Report" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => {
            const isEditing = editingId === report.id;
            const isExpanded = expandedReport === report.id;
            const totalYearly = report.data.reduce((acc, month) => ({
              indian: acc.indian + month.indian,
              nonIndian: acc.nonIndian + month.nonIndian,
              total: acc.total + month.total
            }), { indian: 0, nonIndian: 0, total: 0 });

            return (
              <div key={report.id} className="bg-black rounded-lg border border-gray-700">
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-white text-lg mb-1">
                      {report.year} - {getClassTypeName(report.classType)}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span>Total: {totalYearly.total} students</span>
                      <span>National: {totalYearly.indian}</span>
                      <span>International: {totalYearly.nonIndian}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-green-900 text-green-300">{report.published ? 'Published' : 'Draft'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button
                      title={report.published ? 'Unpublish' : 'Publish'}
                      onClick={() => togglePublished(report.id)}
                      size="sm"
                      disabled={isViewer}
                      aria-label={report.published ? 'Unpublish report' : 'Publish report'}
                      className={`bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {report.published ? <EyeOff size={14} /> : <Eye size={14} />}
                    </Button>
                    {/* Expand/collapse control removed per request */}
                    {!isEditing && (
                      <>
                        <Button
                          title={isViewer ? 'View' : 'Edit'}
                          onClick={() => { setExpandedReport(report.id); if (!isViewer) setEditingId(report.id); }}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          title="Delete"
                          onClick={() => handleDelete(report.id)}
                          size="sm"
                          disabled={isViewer}
                          className={`bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]${isViewer ? ' opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-4 border-t border-gray-700 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Year <span className="text-[#FDB813]">*</span></label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={report.year ? String(report.year) : ''}
                          onChange={(e) => {
                            const onlyDigits = e.target.value.replace(/\D+/g, '');
                            const num = onlyDigits === '' ? 0 : parseInt(onlyDigits, 10);
                            handleUpdate(report.id, { year: num });

                            // validation: min 1900 and max 4 digits
                            if (onlyDigits.length > 4) {
                              setValidationErrors(prev => ({ ...prev, [report.id]: 'Year must be at most 4 digits' }));
                            } else if (onlyDigits !== '' && num < 1900) {
                              setValidationErrors(prev => ({ ...prev, [report.id]: 'Year must be ≥ 1900' }));
                            } else {
                              setValidationErrors(prev => { const c = { ...prev }; delete c[report.id]; return c; });
                            }
                          }}
                          placeholder="YYYY"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                        <div className="text-xs mt-1">{validationErrors[report.id] ? <span className="text-red-400">{validationErrors[report.id]}</span> : <span>&nbsp;</span>}</div>
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Class Type</label>
                        <select
                          value={report.classType}
                          onChange={(e) => handleUpdate(report.id, { classType: e.target.value as any })}
                          className="w-full bg-[#2E2E2E] border border-gray-600 rounded-md px-3 py-2 text-white"
                          disabled={!isEditing}
                        >
                          <option value="keyboard">Keyboard</option>
                          <option value="guitar">Guitar</option>
                          <option value="lcm">LCM (London College of Music)</option>
                        </select>
                      </div>
                    </div>

                    {/* Monthly Data Table */}
                    <div>
                      <label className="text-sm text-white mb-2 block">Monthly Enrollment Data</label>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-[#2E2E2E]">
                            <tr>
                              <th className="text-left text-white p-2 border border-gray-700">Month</th>
                              <th className="text-center text-white p-2 border border-gray-700">National</th>
                              <th className="text-center text-white p-2 border border-gray-700">International</th>
                              <th className="text-center text-white p-2 border border-gray-700">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {report.data.map((month, index) => (
                              <tr key={index} className="border-b border-gray-700">
                                <td className="text-gray-300 p-2 border border-gray-700">{month.month}</td>
                                <td className="p-2 border border-gray-700">
                                  <Input
                                    type="text"
                                    value={month.indian === 0 ? '' : month.indian}
                                    onChange={(e) => {
                                      const value = e.target.value.trim();
                                      if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 10000)) {
                                        handleUpdateMonth(report.id, index, 'indian', value === '' ? 0 : parseInt(value));
                                      }
                                    }}
                                    className="bg-[#2E2E2E] border-gray-600 text-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    disabled={!isEditing}
                                    placeholder="0"
                                  />
                                </td>
                                <td className="p-2 border border-gray-700">
                                  <Input
                                    type="text"
                                    value={month.nonIndian === 0 ? '' : month.nonIndian}
                                    onChange={(e) => {
                                      const value = e.target.value.trim();
                                      if (value === '' || (/^\d+$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 10000)) {
                                        handleUpdateMonth(report.id, index, 'nonIndian', value === '' ? 0 : parseInt(value));
                                      }
                                    }}
                                    className="bg-[#2E2E2E] border-gray-600 text-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    disabled={!isEditing}
                                    placeholder="0"
                                  />
                                </td>
                                <td className="text-center text-[#FDB813] p-2 border border-gray-700 font-bold">
                                  {month.total}
                                </td>
                              </tr>
                            ))}
                            <tr className="bg-[#2E2E2E] font-bold">
                              <td className="text-white p-2 border border-gray-700">TOTAL</td>
                              <td className="text-center text-[#FDB813] p-2 border border-gray-700">{totalYearly.indian}</td>
                              <td className="text-center text-[#FDB813] p-2 border border-gray-700">{totalYearly.nonIndian}</td>
                              <td className="text-center text-[#FDB813] p-2 border border-gray-700">{totalYearly.total}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Published is controlled via the action buttons in the header */}

                    {/* Actions: Save/Cancel placed at bottom-right of expanded form when editing */}
                    {isEditing && (
                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-700">
                        <Button
                          title="Cancel"
                          onClick={() => {
                            // If it's a temp report, remove it from the list and close
                            if (report.id.startsWith('temp-')) {
                              setReports(prev => prev.filter(r => r.id !== report.id));
                              setExpandedReport(null);
                            } else {
                              // For existing reports, refresh from database to restore original values
                              fetchReports();
                              // Close the expanded form without saving
                              setExpandedReport(null);
                            }
                            setEditingId(null);
                          }}
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                        <Button
                          title="Save"
                          onClick={() => handleSave(report.id)}
                          className="bg-[#FDB813] hover:bg-[#e5a711] text-black font-semibold cursor-pointer"
                        >
                          <Save size={16} className="mr-2" />
                          Save Report
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete Report"
        description="Are you sure you want to delete this report? This action cannot be undone."
      />
    </div>
  );
}
