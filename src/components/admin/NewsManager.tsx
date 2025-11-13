import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, BarChart3, ChevronUp, ChevronDown, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';
import { EventsManager } from './EventsManager';

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
  const [reports, setReports] = useState<YearlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  // Fetch reports from API
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reports', {
        cache: 'no-store'
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
    // Create a temporary new report in local state for editing
    const tempId = `temp-${Date.now()}`;
    const newReport: YearlyReport = {
      id: tempId,
      year: new Date().getFullYear(),
      classType: 'keyboard',
      published: false,
      data: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map(month => ({ month, indian: 0, nonIndian: 0, total: 0 }))
    };
    
    setReports([newReport, ...reports]);
    setEditingId(tempId);
    setExpandedReport(tempId);
  };

  const handleUpdate = (id: string, updates: Partial<YearlyReport>) => {
    // Update local state immediately for responsive UI
    setReports(reports.map(r => r.id === id ? { ...r, ...updates } : r));
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
        const response = await fetch(`/api/admin/reports?id=${reportToDelete}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
          setReports(reports.filter(r => r.id !== reportToDelete));
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

      // Check if this is a new report (temporary ID)
      const isNewReport = id.startsWith('temp-');

      if (isNewReport) {
        // Create new report
        const response = await fetch('/api/admin/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
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
          headers: { 'Content-Type': 'application/json' },
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
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{reports.length}</span> report(s)
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Report
        </Button>
      </div>

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
                <div className="p-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white text-lg mb-1">
                      {report.year} - {getClassTypeName(report.classType)}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span>Total: {totalYearly.total} students</span>
                      <span>National: {totalYearly.indian}</span>
                      <span>International: {totalYearly.nonIndian}</span>
                      <span className={report.published ? 'text-green-500' : 'text-yellow-500'}>
                        {report.published ? '● Published' : '● Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setExpandedReport(isExpanded ? null : report.id)}
                      size="sm"
                      className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => handleSave(report.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            // If it's a temp report, remove it from the list
                            if (report.id.startsWith('temp-')) {
                              setReports(reports.filter(r => r.id !== report.id));
                              setExpandedReport(null);
                            } else {
                              // For existing reports, refresh from database to restore original values
                              fetchReports();
                            }
                            setEditingId(null);
                          }}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-gray-600"
                        >
                          <X size={14} className="mr-1" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => setEditingId(report.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(report.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
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
                        <label className="text-sm text-white mb-1 block">Year</label>
                        <Input
                          type="number"
                          min="1900"
                          max="2100"
                          value={report.year}
                          onChange={(e) => {
                            const value = e.target.value === '' ? '' : parseInt(e.target.value);
                            if (value === '' || (typeof value === 'number' && value >= 1900)) {
                              handleUpdate(report.id, { year: value === '' ? new Date().getFullYear() : value });
                            }
                          }}
                          placeholder="2024"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Class Type</label>
                        <select
                          value={report.classType}
                          onChange={(e) => handleUpdate(report.id, { classType: e.target.value as any })}
                          className="w-full bg-black border border-gray-600 rounded-md px-3 py-2 text-white"
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
                                    className="bg-black border-gray-600 text-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                                    className="bg-black border-gray-600 text-white text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

                    {/* Published Toggle */}
                    <div className="flex items-center gap-2 border-t border-gray-700 pt-4">
                      <input
                        type="checkbox"
                        checked={report.published}
                        onChange={(e) => handleUpdate(report.id, { published: e.target.checked })}
                        className="w-4 h-4"
                        disabled={!isEditing}
                      />
                      <label className="text-white">Published (visible on website)</label>
                    </div>
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
