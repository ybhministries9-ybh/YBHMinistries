import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Calendar, X, ChevronDown, ChevronUp, Save, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'conference' | 'class' | 'record';
  description: string;
  extendedDescription: string;
  capacity: string;
  imageUrl: string;
  speakers: string[];
  whatToBring: string[];
  registration: {
    enabled: boolean;
    description?: string;
    nationalFee?: number;
    internationalFee?: number;
    registrationFee?: number;
  };
  published: boolean;
}

export function EventsManager() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch events from API
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/events');
      const result = await response.json();
      
      if (result.success) {
        setEvents(result.data);
      } else {
        toast.error('Failed to load events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    const newEvent: Event = {
      id: `temp-${Date.now()}`,
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'conference',
      description: '',
      extendedDescription: '',
      capacity: '',
      imageUrl: '',
      speakers: [],
      whatToBring: [],
      registration: {
        enabled: false,
        description: '',
        nationalFee: 0,
        internationalFee: 0,
        registrationFee: 0
      },
      published: false
    };
    
    setEvents([newEvent, ...events]);
    setExpandedId(newEvent.id);
    setEditingId(newEvent.id);
  };

  const handleSave = async (event: Event) => {
    try {
      const isNew = event.id.startsWith('temp-');
      const url = '/api/admin/events';
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success(isNew ? 'Event created successfully' : 'Event updated successfully');
        setEditingId(null);
        fetchEvents(); // Refresh the list
      } else {
        toast.error(result.error || 'Failed to save event');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // If it's a temporary (unsaved) event, just remove from state
      if (id.startsWith('temp-')) {
        setEvents(events.filter(e => e.id !== id));
        setDeleteConfirm(null);
        toast.success('Event removed');
        return;
      }

      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        setEvents(events.filter(e => e.id !== id));
        setDeleteConfirm(null);
        toast.success('Event deleted successfully');
      } else {
        toast.error(result.error || 'Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    }
  };

  const handleUpdate = (id: string, updates: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
  };

  const togglePublished = async (event: Event) => {
    const updatedEvent = { ...event, published: !event.published };
    handleUpdate(event.id, { published: !event.published });
    
    // If it's not a new event, save to API
    if (!event.id.startsWith('temp-')) {
      await handleSave(updatedEvent);
    }
  };

  const addArrayItem = (eventId: string, field: 'speakers' | 'whatToBring') => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      handleUpdate(eventId, {
        [field]: [...event[field], '']
      });
    }
  };

  const updateArrayItem = (eventId: string, field: 'speakers' | 'whatToBring', index: number, value: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newArray = [...event[field]];
      newArray[index] = value;
      handleUpdate(eventId, { [field]: newArray });
    }
  };

  const removeArrayItem = (eventId: string, field: 'speakers' | 'whatToBring', index: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newArray = event[field].filter((_, i) => i !== index);
      handleUpdate(eventId, { [field]: newArray });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FDB813]" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">Events Management</h2>
        <p className="text-gray-400 text-sm mt-1">
          Manage upcoming events, conferences, and classes
        </p>
      </div>

      {/* Stats and Add Button */}
      <div className="flex items-center justify-between bg-black p-4 rounded-lg">
        <div className="text-white text-sm">
          Total: <span className="text-[#FDB813] font-bold">{events.length}</span> event(s)
          {' | '}
          Published: <span className="text-[#FDB813] font-bold">{events.filter(e => e.published).length}</span>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-[#FDB813] hover:bg-[#e5a711] text-black font-semibold cursor-pointer"
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
            const isExpanded = expandedId === event.id;
            const isEditing = editingId === event.id;
            const isNew = event.id.startsWith('temp-');

            return (
              <div
                key={event.id}
                className="bg-black rounded-lg border border-gray-700 overflow-hidden"
              >
                {/* Event Header */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-white font-semibold text-lg">{event.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        event.published ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {event.published ? 'Published' : 'Draft'}
                      </span>
                      <span className="px-2 py-1 rounded text-xs bg-[#2E2E2E] text-gray-300">
                        {event.type}
                      </span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      {event.date} • {event.time} • {event.location}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => togglePublished(event)}
                      className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                      size="sm"
                      title={event.published ? 'Unpublish' : 'Publish'}
                    >
                      {event.published ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setExpandedId(isExpanded ? null : event.id);
                        if (!isExpanded) setEditingId(event.id);
                      }}
                      className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                      size="sm"
                    >
                      <Edit2 size={16} className="mr-1" />
                      Edit
                    </Button>

                    {deleteConfirm === event.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 text-sm">Delete?</span>
                        <Button
                          onClick={() => handleDelete(event.id)}
                          className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                          size="sm"
                        >
                          Yes
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                          size="sm"
                        >
                          No
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setDeleteConfirm(event.id)}
                        className="bg-[#2E2E2E] hover:bg-red-600 text-white cursor-pointer"
                        size="sm"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}

                    <Button
                      onClick={() => setExpandedId(isExpanded ? null : event.id)}
                      className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                      size="sm"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>
                </div>

                {/* Event Details (Expanded) */}
                {isExpanded && (
                  <div className="border-t border-gray-700 p-4 space-y-4">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Event Title</label>
                        <Input
                          value={event.title}
                          onChange={(e) => handleUpdate(event.id, { title: e.target.value })}
                          placeholder="Enter event title"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>

                      <div>
                        <label className="text-sm text-white mb-1 block">Event Type</label>
                        <select
                          value={event.type}
                          onChange={(e) => handleUpdate(event.id, { type: e.target.value as any })}
                          className="w-full bg-[#2E2E2E] border border-gray-600 text-white rounded-md px-3 py-2 cursor-pointer"
                          disabled={!isEditing}
                        >
                          <option value="conference">Conference</option>
                          <option value="class">Class</option>
                          <option value="record">Record Attempt</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-white mb-1 block">Date</label>
                        <Input
                          type="date"
                          value={event.date}
                          onChange={(e) => handleUpdate(event.id, { date: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Time</label>
                        <Input
                          value={event.time}
                          onChange={(e) => handleUpdate(event.id, { time: e.target.value })}
                          placeholder="10:00 AM - 5:00 PM"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-1 block">Location</label>
                        <Input
                          value={event.location}
                          onChange={(e) => handleUpdate(event.id, { location: e.target.value })}
                          placeholder="City, Country"
                          className="bg-[#2E2E2E] border-gray-600 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Capacity</label>
                      <Input
                        value={event.capacity}
                        onChange={(e) => handleUpdate(event.id, { capacity: e.target.value })}
                        placeholder="e.g., 100 or 'Unlimited'"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Short Description</label>
                      <Textarea
                        value={event.description}
                        onChange={(e) => handleUpdate(event.id, { description: e.target.value })}
                        placeholder="Brief description for event card"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        rows={2}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Extended Description</label>
                      <Textarea
                        value={event.extendedDescription}
                        onChange={(e) => handleUpdate(event.id, { extendedDescription: e.target.value })}
                        placeholder="Detailed description for event detail page"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        rows={4}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-white mb-1 block">Event Image URL</label>
                      <Input
                        value={event.imageUrl}
                        onChange={(e) => handleUpdate(event.id, { imageUrl: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="bg-[#2E2E2E] border-gray-600 text-white"
                        disabled={!isEditing}
                      />
                      {event.imageUrl && (
                        <img 
                          src={event.imageUrl} 
                          alt="Event preview" 
                          className="mt-2 max-w-xs rounded border border-gray-600"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                    </div>

                    {/* Speakers */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white">Speakers / Instructors</label>
                        {isEditing && (
                          <Button
                            onClick={() => addArrayItem(event.id, 'speakers')}
                            className="bg-[#FDB813] hover:bg-[#e5a711] text-black cursor-pointer"
                            size="sm"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Speaker
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.speakers.map((speaker, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={speaker}
                              onChange={(e) => updateArrayItem(event.id, 'speakers', index, e.target.value)}
                              placeholder="Speaker name"
                              className="bg-[#2E2E2E] border-gray-600 text-white"
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <Button
                                onClick={() => removeArrayItem(event.id, 'speakers', index)}
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                size="sm"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {event.speakers.length === 0 && (
                          <p className="text-gray-500 text-sm">No speakers added</p>
                        )}
                      </div>
                    </div>

                    {/* What to Bring */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-white">What to Bring</label>
                        {isEditing && (
                          <Button
                            onClick={() => addArrayItem(event.id, 'whatToBring')}
                            className="bg-[#FDB813] hover:bg-[#e5a711] text-black cursor-pointer"
                            size="sm"
                          >
                            <Plus size={14} className="mr-1" />
                            Add Item
                          </Button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {event.whatToBring.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={item}
                              onChange={(e) => updateArrayItem(event.id, 'whatToBring', index, e.target.value)}
                              placeholder="Item to bring"
                              className="bg-[#2E2E2E] border-gray-600 text-white"
                              disabled={!isEditing}
                            />
                            {isEditing && (
                              <Button
                                onClick={() => removeArrayItem(event.id, 'whatToBring', index)}
                                className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                                size="sm"
                              >
                                <X size={14} />
                              </Button>
                            )}
                          </div>
                        ))}
                        {event.whatToBring.length === 0 && (
                          <p className="text-gray-500 text-sm">No items added</p>
                        )}
                      </div>
                    </div>

                    {/* Registration */}
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <input
                          type="checkbox"
                          checked={event.registration.enabled}
                          onChange={(e) => handleUpdate(event.id, {
                            registration: { ...event.registration, enabled: e.target.checked }
                          })}
                          className="cursor-pointer"
                          disabled={!isEditing}
                        />
                        <label className="text-sm text-white">Enable Registration</label>
                      </div>

                      {event.registration.enabled && (
                        <div className="space-y-4 pl-6">
                          <div>
                            <label className="text-sm text-white mb-1 block">Registration Description</label>
                            <Textarea
                              value={event.registration.description || ''}
                              onChange={(e) => handleUpdate(event.id, {
                                registration: { ...event.registration, description: e.target.value }
                              })}
                              placeholder="Registration information..."
                              className="bg-[#2E2E2E] border-gray-600 text-white"
                              rows={2}
                              disabled={!isEditing}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="text-sm text-white mb-1 block">National Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.nationalFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, nationalFee: parseInt(e.target.value) || 0 }
                                })}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">International Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.internationalFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, internationalFee: parseInt(e.target.value) || 0 }
                                })}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                            <div>
                              <label className="text-sm text-white mb-1 block">Registration Fee (₹)</label>
                              <Input
                                type="number"
                                value={event.registration.registrationFee || ''}
                                onChange={(e) => handleUpdate(event.id, {
                                  registration: { ...event.registration, registrationFee: parseInt(e.target.value) || 0 }
                                })}
                                className="bg-[#2E2E2E] border-gray-600 text-white"
                                disabled={!isEditing}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {isEditing && (
                      <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-700">
                        <Button
                          onClick={() => {
                            if (isNew) {
                              setEvents(events.filter(e => e.id !== event.id));
                            }
                            setEditingId(null);
                            setExpandedId(null);
                          }}
                          className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => handleSave(event)}
                          className="bg-[#FDB813] hover:bg-[#e5a711] text-black font-semibold cursor-pointer"
                        >
                          <Save size={16} className="mr-2" />
                          Save Event
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
    </div>
  );
}
