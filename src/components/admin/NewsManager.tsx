import { useState } from 'react';
import { Plus, Trash2, Edit2, Calendar, BarChart3, Clock, MapPin, Users, X, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ImageUpload } from './ImageUpload';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  extendedDescription: string;
  capacity: number | string;
  imageUrl: string;
  speakers: string[];
  whatToBring: string[];
  registration: {
    enabled: boolean;
    nationalFee?: number;
    internationalFee?: number;
    registrationFee?: number;
    description?: string;
  };
  published: boolean;
}

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
        <h2 className="text-2xl text-white mb-2">News Management</h2>
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

// Events Manager Sub-Component
function EventsManager() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Annual Hallel Conference 2025',
      date: '2025-12-15',
      time: '10:00 AM',
      location: 'Hyderabad, India',
      description: 'Join us for our biggest worship gathering of the year',
      extendedDescription: 'Experience powerful worship, inspiring messages, and connect with believers from around the world. This conference will feature renowned speakers, worship leaders, and special sessions.',
      capacity: 500,
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      speakers: ['Ps. Augustine Dandingi', 'Dr. Sarah Johnson'],
      whatToBring: ['Notepad and pen', 'Water bottle', 'Bible'],
      registration: {
        enabled: true,
        nationalFee: 2500,
        internationalFee: 5000,
        registrationFee: 500,
        description: 'Register early to secure your spot for this event.'
      },
      published: true
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: '',
      date: new Date().toISOString().split('T')[0],
      time: '10:00 AM',
      location: '',
      description: '',
      extendedDescription: '',
      capacity: 100,
      imageUrl: '',
      speakers: [],
      whatToBring: [],
      registration: {
        enabled: false
      },
      published: false
    };
    setEvents([newEvent, ...events]);
    setEditingId(newEvent.id);
    setExpandedEvent(newEvent.id);
  };

  const handleUpdate = (id: string, updates: Partial<Event>) => {
    setEvents(events.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const handleDelete = (id: string) => {
    setEventToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      setEvents(events.filter(e => e.id !== eventToDelete));
      toast.success('Event deleted successfully');
      setEventToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Event saved successfully');
  };

  const addSpeaker = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, { speakers: [...event.speakers, ''] });
    }
  };

  const updateSpeaker = (eventId: string, index: number, value: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newSpeakers = [...event.speakers];
      newSpeakers[index] = value;
      handleUpdate(eventId, { speakers: newSpeakers });
    }
  };

  const removeSpeaker = (eventId: string, index: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, { speakers: event.speakers.filter((_, i) => i !== index) });
    }
  };

  const addWhatToBring = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, { whatToBring: [...event.whatToBring, ''] });
    }
  };

  const updateWhatToBring = (eventId: string, index: number, value: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newItems = [...event.whatToBring];
      newItems[index] = value;
      handleUpdate(eventId, { whatToBring: newItems });
    }
  };

  const removeWhatToBring = (eventId: string, index: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, { whatToBring: event.whatToBring.filter((_, i) => i !== index) });
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Button */}
      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          Total: <span className="text-[#FDB813] font-bold">{events.length}</span> event(s)
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813]"
        >
          <Plus size={16} className="mr-2" />
          Add Event
        </Button>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="text-center py-12 bg-black rounded-lg border border-gray-700">
          <Calendar size={48} className="mx-auto mb-4 text-gray-600" />
          <p className="text-gray-400">No events yet. Click "Add Event" to create one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            const isEditing = editingId === event.id;
            const isExpanded = expandedEvent === event.id;

            return (
              <div key={event.id} className="bg-black rounded-lg border border-gray-700">
                {/* Header */}
                <div className="p-4 flex items-start justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={event.title}
                        onChange={(e) => handleUpdate(event.id, { title: e.target.value })}
                        placeholder="Event Title"
                        className="bg-black border-gray-600 text-white text-lg mb-2"
                      />
                    ) : (
                      <h3 className="text-white text-lg mb-1">{event.title || 'Untitled Event'}</h3>
                    )}
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location || 'No location'}
                      </span>
                      <span className={event.published ? 'text-green-500' : 'text-yellow-500'}>
                        {event.published ? '● Published' : '● Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                      size="sm"
                      className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                    {isEditing ? (
                      <>
                        <Button
                          onClick={() => handleSave(event.id)}
                          size="sm"
                          className="bg-[#FDB813] hover:bg-[#e5a610] text-black"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            if (!event.title) {
                              setEvents(events.filter(e => e.id !== event.id));
                            }
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
                          onClick={() => setEditingId(event.id)}
                          size="sm"
                          className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-[#FDB813] border border-[#FDB813]"
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          onClick={() => handleDelete(event.id)}
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Date</label>
                        <Input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleUpdate(event.id, { date: e.target.value })}
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Time</label>
                        <Input
                          value={event.time}
                          onChange={(e) => handleUpdate(event.id, { time: e.target.value })}
                          placeholder="10:00 AM"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Location</label>
                        <Input
                          value={event.location}
                          onChange={(e) => handleUpdate(event.id, { location: e.target.value })}
                          placeholder="City, Country"
                          className="bg-black border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Capacity</label>
                      <Input
                        value={event.capacity}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Try to parse as number, otherwise keep as string
                          const numValue = parseInt(value);
                          handleUpdate(event.id, { capacity: isNaN(numValue) ? value : numValue });
                        }}
                        placeholder="e.g., 100 or 'Unlimited'"
                        className="bg-black border-gray-600 text-white"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Short Description</label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleUpdate(event.id, { description: e.target.value })}
                        placeholder="Brief description for event card"
                        className="bg-black border-gray-600 text-white"
                        rows={2}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Extended Description</label>
                      <Textarea
                        value={event.extendedDescription}
                        onChange={(e) => handleUpdate(event.id, { extendedDescription: e.target.value })}
                        placeholder="Full description for event details page"
                        className="bg-black border-gray-600 text-white"
                        rows={4}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-2 block">Event Image</label>
                      {isEditing ? (
                        <div className="space-y-3">
                          <ImageUpload
                            bucket="event-images"
                            onUploadComplete={(url) => handleUpdate(event.id, { imageUrl: url })}
                            currentImage={event.imageUrl}
                            imageType="gallery"
                          />
                          <div className="text-xs text-gray-500 text-center">OR</div>
                          <Input
                            value={event.imageUrl}
                            onChange={(e) => handleUpdate(event.id, { imageUrl: e.target.value })}
                            placeholder="Enter image URL manually"
                            className="bg-black border-gray-600 text-white"
                          />
                        </div>
                      ) : (
                        event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt="Event preview"
                            className="w-full h-48 object-cover rounded border border-gray-600"
                          />
                        )
                      )}
                    </div>

                    {/* Speakers Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white block">Speakers / Instructors</label>
                        {isEditing && (
                          <Button
                            onClick={() => addSpeaker(event.id)}
                            size="sm"
                            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#FDB813] border border-[#FDB813]"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Speaker
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.speakers.map((speaker, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={speaker}
                              onChange={(e) => updateSpeaker(event.id, index, e.target.value)}
                              placeholder="Speaker name"
                              className="bg-black border-gray-600 text-white flex-1"
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <Button
                                onClick={() => removeSpeaker(event.id, index)}
                                size="sm"
                                className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What to Bring Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white block">What to Bring</label>
                        {isEditing && (
                          <Button
                            onClick={() => addWhatToBring(event.id)}
                            size="sm"
                            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-[#FDB813] border border-[#FDB813]"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Item
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.whatToBring.map((item, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateWhatToBring(event.id, index, e.target.value)}
                              placeholder="Item to bring"
                              className="bg-black border-gray-600 text-white flex-1"
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <Button
                                onClick={() => removeWhatToBring(event.id, index)}
                                size="sm"
                                className="bg-[#2E2E2E] hover:bg-red-900 text-red-500 border border-red-500"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Registration Section */}
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-4">
                        <input
                          type="checkbox"
                          checked={event.registration.enabled}
                          onChange={(e) => handleUpdate(event.id, {
                            registration: { ...event.registration, enabled: e.target.checked }
                          })}
                          className="w-4 h-4"
                          disabled={!isEditing}
                        />
                        <label className="text-white">Enable Registration</label>
                      </div>

                      {event.registration.enabled && (
                        <div className="space-y-3 pl-6">
                          <div>
                            <label className="text-sm text-white mb-1 block">Registration Description</label>
                            <Textarea
                              value={event.registration.description || ''}
                              onChange={(e) => handleUpdate(event.id, {
                                registration: { ...event.registration, description: e.target.value }
                              })}
                              placeholder="Register early to secure your spot..."
                              className="bg-black border-gray-600 text-white"
                              rows={2}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="text-sm text-white mb-1 block">National Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.nationalFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, nationalFee: parseFloat(e.target.value) }
                                })}
                                placeholder="2500"
                                className="bg-black border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">International Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.internationalFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, internationalFee: parseFloat(e.target.value) }
                                })}
                                placeholder="5000"
                                className="bg-black border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">Registration Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.registrationFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, registrationFee: parseFloat(e.target.value) }
                                })}
                                placeholder="500"
                                className="bg-black border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Published Toggle */}
                    <div className="flex items-center gap-2 border-t border-gray-700 pt-4">
                      <input
                        type="checkbox"
                        checked={event.published}
                        onChange={(e) => handleUpdate(event.id, { published: e.target.checked })}
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
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}

// Reports Manager Sub-Component
function ReportsManager() {
  const [reports, setReports] = useState<YearlyReport[]>([
    {
      id: '1',
      year: 2023,
      classType: 'keyboard',
      published: true,
      data: [
        { month: 'January', indian: 32, nonIndian: 8, total: 40 },
        { month: 'February', indian: 34, nonIndian: 9, total: 43 },
        { month: 'March', indian: 36, nonIndian: 9, total: 45 },
        { month: 'April', indian: 38, nonIndian: 10, total: 48 },
        { month: 'May', indian: 40, nonIndian: 12, total: 52 },
        { month: 'June', indian: 40, nonIndian: 12, total: 52 },
        { month: 'July', indian: 38, nonIndian: 12, total: 50 },
        { month: 'August', indian: 36, nonIndian: 10, total: 46 },
        { month: 'September', indian: 38, nonIndian: 10, total: 48 },
        { month: 'October', indian: 39, nonIndian: 11, total: 50 },
        { month: 'November', indian: 41, nonIndian: 12, total: 53 },
        { month: 'December', indian: 43, nonIndian: 12, total: 55 }
      ]
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    const newReport: YearlyReport = {
      id: Date.now().toString(),
      year: new Date().getFullYear(),
      classType: 'keyboard',
      published: false,
      data: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].map(month => ({ month, indian: 0, nonIndian: 0, total: 0 }))
    };
    setReports([newReport, ...reports]);
    setEditingId(newReport.id);
    setExpandedReport(newReport.id);
  };

  const handleUpdate = (id: string, updates: Partial<YearlyReport>) => {
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

  const confirmDelete = () => {
    if (reportToDelete) {
      setReports(reports.filter(r => r.id !== reportToDelete));
      toast.success('Report deleted successfully');
      setReportToDelete(null);
    }
    setDeleteDialogOpen(false);
  };

  const handleSave = (id: string) => {
    setEditingId(null);
    toast.success('Report saved successfully');
  };

  const getClassTypeName = (type: string) => {
    const names = {
      keyboard: 'Keyboard',
      guitar: 'Guitar',
      lcm: 'LCM (London College of Music)'
    };
    return names[type] || type;
  };

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
                      <span>Indian: {totalYearly.indian}</span>
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
                          value={report.year}
                          onChange={(e) => handleUpdate(report.id, { year: parseInt(e.target.value) })}
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
                              <th className="text-center text-white p-2 border border-gray-700">Indian</th>
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
                                    type="number"
                                    value={month.indian}
                                    onChange={(e) => handleUpdateMonth(report.id, index, 'indian', parseInt(e.target.value) || 0)}
                                    className="bg-black border-gray-600 text-white text-center"
                                    disabled={!isEditing}
                                  />
                                </td>
                                <td className="p-2 border border-gray-700">
                                  <Input
                                    type="number"
                                    value={month.nonIndian}
                                    onChange={(e) => handleUpdateMonth(report.id, index, 'nonIndian', parseInt(e.target.value) || 0)}
                                    className="bg-black border-gray-600 text-white text-center"
                                    disabled={!isEditing}
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
