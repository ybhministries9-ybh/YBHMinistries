import { useState } from 'react';
import { Plus, X, Edit2, Video, FileText, CalendarIcon, Trash2, MessageCircle, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { Checkbox } from '../ui/checkbox';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface Story {
  id: string;
  type: 'text' | 'video';
  category: string;
  
  // Text story fields
  name?: string;
  role?: string;
  location?: string;
  image?: string;
  text?: string;
  
  // Video story fields
  title?: string;
  youtubeUrl?: string;
  
  // Common fields
  date: string;
  status?: 'Submitted' | 'In-Review' | 'Approved' | 'Rejected';
  featured?: boolean;
}

interface ValidationErrors {
  name?: string;
  role?: string;
  location?: string;
  text?: string;
  title?: string;
  youtubeUrl?: string;
}

const CATEGORIES = [
  'Guinness World Records',
  'Asian Book of Records',
  'Ingenious Charm World Record',
  'Song Writing Classes',
  'Bible School Training',
  'Hallel Summer Kids Training'
];

// Date Picker Component
function DatePicker({ 
  value, 
  onChange,
  className 
}: { 
  value: string; 
  onChange: (date: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  
  // Parse the date string (YYYY-MM-DD) correctly as local date
  const dateValue = value ? (() => {
    const [year, month, day] = value.split('-').map(Number);
    return new Date(year, month - 1, day);
  })() : undefined;
  
  const today = new Date();
  today.setHours(23, 59, 59, 999); // Set to end of today
  
  const handleSelect = (date: Date | undefined) => {
    if (date) {
      // Format date using local timezone to avoid off-by-one errors
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start text-left bg-black border-gray-600 text-white hover:bg-black hover:text-white cursor-pointer ${className || ''}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateValue ? format(dateValue, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-black border-gray-600" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={handleSelect}
          disabled={(date) => date > today}
          initialFocus
          className="bg-black text-white"
        />
      </PopoverContent>
    </Popover>
  );
}

export function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([
    {
      id: '1',
      type: 'text',
      category: 'Guinness World Records',
      name: 'Sarah Johnson',
      role: 'Participant',
      date: '2023-06-15',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      text: 'Being part of the Guinness World Record attempt was a life-changing experience...',
      status: 'Approved',
      featured: true
    },
    {
      id: '2',
      type: 'video',
      category: 'Bible School Training',
      title: 'My Journey with Hallel Bible School',
      date: '2023-07-03',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'Submitted',
      featured: false
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [validationErrors, setValidationErrors] = useState<Record<string, ValidationErrors>>({});
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string; name: string }>({
    open: false,
    id: '',
    name: '',
  });

  // Character limits
  const CHAR_LIMITS = {
    name: 100,
    role: 50,
    location: 100,
    image: 500,
    title: 200,
    youtubeUrl: 500,
    text: 1000
  };

  const validateStory = (story: Story): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (story.type === 'text') {
      // Text story validation
      if (!story.name?.trim()) {
        errors.name = 'Full name is required';
      } else if (story.name.length > CHAR_LIMITS.name) {
        errors.name = `Name must be ${CHAR_LIMITS.name} characters or less`;
      }

      if (!story.role?.trim()) {
        errors.role = 'Role is required';
      } else if (story.role.length > CHAR_LIMITS.role) {
        errors.role = `Role must be ${CHAR_LIMITS.role} characters or less`;
      }

      if (!story.location?.trim()) {
        errors.location = 'Location is required';
      } else if (story.location.length > CHAR_LIMITS.location) {
        errors.location = `Location must be ${CHAR_LIMITS.location} characters or less`;
      }

      if (!story.text?.trim()) {
        errors.text = 'Testimony/Story text is required';
      } else if (story.text.length > CHAR_LIMITS.text) {
        errors.text = `Text must be ${CHAR_LIMITS.text} characters or less`;
      }
    } else if (story.type === 'video') {
      // Video story validation
      if (!story.title?.trim()) {
        errors.title = 'Title is required';
      } else if (story.title.length > CHAR_LIMITS.title) {
        errors.title = `Title must be ${CHAR_LIMITS.title} characters or less`;
      }

      if (!story.youtubeUrl?.trim()) {
        errors.youtubeUrl = 'YouTube URL is required';
      } else if (story.youtubeUrl.length > CHAR_LIMITS.youtubeUrl) {
        errors.youtubeUrl = `URL must be ${CHAR_LIMITS.youtubeUrl} characters or less`;
      } else if (!isValidYouTubeUrl(story.youtubeUrl)) {
        errors.youtubeUrl = 'Please enter a valid YouTube URL';
      }
    }

    return errors;
  };

  const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    return youtubeRegex.test(url);
  };

  const handleSaveStory = (storyId: string) => {
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    const errors = validateStory(story);
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors({ ...validationErrors, [storyId]: errors });
      toast.error('Please fix the validation errors');
      return;
    }

    // Clear validation errors for this story
    const newErrors = { ...validationErrors };
    delete newErrors[storyId];
    setValidationErrors(newErrors);

    // Save the story
    toast.success('Story saved successfully!');
    setEditingId(null);
  };

  const handleAddTextStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      type: 'text',
      category: CATEGORIES[0],
      name: '',
      role: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      image: '',
      text: '',
      status: 'Submitted',
      featured: false
    };
    setStories([newStory, ...stories]);
    setEditingId(newStory.id);
  };

  const handleAddVideoStory = () => {
    const newStory: Story = {
      id: Date.now().toString(),
      type: 'video',
      category: CATEGORIES[0],
      title: '',
      date: new Date().toISOString().split('T')[0],
      youtubeUrl: '',
      status: 'Submitted',
      featured: false
    };
    setStories([newStory, ...stories]);
    setEditingId(newStory.id);
  };

  const handleDelete = (id: string) => {
    const story = stories.find(s => s.id === id);
    const name = story?.type === 'text' ? story.name : story?.title;
    setDeleteDialog({ open: true, id, name: name || '' });
  };

  const confirmDelete = () => {
    setStories(stories.filter(s => s.id !== deleteDialog.id));
    toast.success('Story deleted successfully');
    setDeleteDialog({ open: false, id: '', name: '' });
  };

  const handleCancel = (id: string) => {
    const story = stories.find(s => s.id === id);
    
    // If it's a new story (empty fields), delete it
    if (story) {
      if (story.type === 'text' && !story.name && !story.role && !story.location && !story.text) {
        setStories(stories.filter(s => s.id !== id));
      } else if (story.type === 'video' && !story.title && !story.youtubeUrl) {
        setStories(stories.filter(s => s.id !== id));
      }
    }
    
    // Clear validation errors
    const newErrors = { ...validationErrors };
    delete newErrors[id];
    setValidationErrors(newErrors);
    setEditingId(null);
  };

  const handleUpdate = (id: string, field: keyof Story, value: any) => {
    setStories(stories.map(s => s.id === id ? { ...s, [field]: value } : s));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[id]) {
      const newErrors = { ...validationErrors };
      if (newErrors[id]) {
        delete newErrors[id][field as keyof ValidationErrors];
        if (Object.keys(newErrors[id]).length === 0) {
          delete newErrors[id];
        }
        setValidationErrors(newErrors);
      }
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Submitted' | 'In-Review' | 'Approved' | 'Rejected') => {
    setStories(stories.map(s => 
      s.id === id ? { ...s, status: newStatus } : s
    ));
    toast.success(`Story status updated to ${newStatus}`);
  };

  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      'Submitted': 'bg-yellow-900/30 text-yellow-400 border-yellow-700',
      'In-Review': 'bg-blue-900/30 text-blue-400 border-blue-700',
      'Approved': 'bg-green-900/30 text-green-400 border-green-700',
      'Rejected': 'bg-red-900/30 text-red-400 border-red-700',
    };
    return colors[status || 'Submitted'] || colors['Submitted'];
  };

  // Filter by both category and status
  let filteredStories = stories;
  
  if (filterCategory !== 'all') {
    filteredStories = filteredStories.filter(s => s.category === filterCategory);
  }
  
  if (filterStatus !== 'All') {
    filteredStories = filteredStories.filter(s => s.status === filterStatus);
  }

  const statusCounts = {
    All: stories.length,
    Submitted: stories.filter(s => s.status === 'Submitted').length,
    'In-Review': stories.filter(s => s.status === 'In-Review').length,
    Approved: stories.filter(s => s.status === 'Approved').length,
    Rejected: stories.filter(s => s.status === 'Rejected').length,
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-white mb-1">Stories & Testimonies Management</h2>
          <p className="text-sm text-gray-400">Review and approve testimonies from your community</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddTextStory}
            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813] cursor-pointer"
          >
            <FileText size={16} className="mr-2" />
            Add Text Story
          </Button>
          <Button
            onClick={handleAddVideoStory}
            className="bg-[#2E2E2E] hover:bg-[#3E3E3E] text-white border border-[#FDB813] cursor-pointer"
          >
            <Video size={16} className="mr-2" />
            Add Video Story
          </Button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['All', 'Submitted', 'In-Review', 'Approved', 'Rejected'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
              filterStatus === status
                ? 'bg-[#FDB813] text-black'
                : 'bg-black border border-gray-700 text-gray-300 hover:bg-[#2E2E2E]'
            }`}
          >
            {status} <span className="ml-1 text-xs opacity-75">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-64 bg-[#2E2E2E] border-gray-600 text-white cursor-pointer">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-[#2E2E2E] border-gray-600">
            <SelectItem value="all" className="text-white cursor-pointer">All Categories</SelectItem>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat} className="text-white cursor-pointer">{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredStories.length === 0 ? (
          <div className="text-center py-12 bg-black border border-gray-700 rounded-lg">
            <MessageCircle size={48} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">No stories in this category.</p>
          </div>
        ) : (
          filteredStories.map((story) => (
            <div key={story.id} className="bg-black p-5 rounded-lg border border-gray-700 hover:shadow-sm transition-shadow">
              {editingId === story.id ? (
              <div className="space-y-4">
                {/* Story Type Badge */}
                <div className="flex items-center gap-2 mb-2">
                  {story.type === 'text' ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white text-xs">
                      <FileText size={12} />
                      Text Story
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-600 text-white text-xs">
                      <Video size={12} />
                      Video Story
                    </span>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-gray-300">Category <span className="text-red-500">*</span></Label>
                  <Select 
                    value={story.category} 
                    onValueChange={(value) => handleUpdate(story.id, 'category', value)}
                  >
                    <SelectTrigger className="bg-black border-gray-600 text-white cursor-pointer">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-600">
                      {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat} className="text-white cursor-pointer">{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {story.type === 'text' ? (
                  // Text Story Fields
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Full Name <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.name || '').length}/{CHAR_LIMITS.name})
                          </span>
                        </Label>
                        <Input
                          value={story.name || ''}
                          onChange={(e) => handleUpdate(story.id, 'name', e.target.value.slice(0, CHAR_LIMITS.name))}
                          placeholder="Full Name"
                          className={`bg-black border-gray-600 text-white ${
                            validationErrors[story.id]?.name ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.name}
                        />
                        {validationErrors[story.id]?.name && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].name}</p>
                        )}
                      </div>

                      {/* Role */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Role <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.role || '').length}/{CHAR_LIMITS.role})
                          </span>
                        </Label>
                        <Input
                          value={story.role || ''}
                          onChange={(e) => handleUpdate(story.id, 'role', e.target.value.slice(0, CHAR_LIMITS.role))}
                          placeholder="Role (e.g., Participant, Student)"
                          className={`bg-black border-gray-600 text-white ${
                            validationErrors[story.id]?.role ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.role}
                        />
                        {validationErrors[story.id]?.role && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].role}</p>
                        )}
                      </div>

                      {/* Date */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">Date <span className="text-red-500">*</span></Label>
                        <DatePicker
                          value={story.date}
                          onChange={(date) => handleUpdate(story.id, 'date', date)}
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-2">
                        <Label className="text-gray-300">
                          Location <span className="text-red-500">*</span>
                          <span className="text-xs text-gray-500 ml-2">
                            ({(story.location || '').length}/{CHAR_LIMITS.location})
                          </span>
                        </Label>
                        <Input
                          value={story.location || ''}
                          onChange={(e) => handleUpdate(story.id, 'location', e.target.value.slice(0, CHAR_LIMITS.location))}
                          placeholder="Location (e.g., Mumbai, India)"
                          className={`bg-black border-gray-600 text-white ${
                            validationErrors[story.id]?.location ? 'border-red-500' : ''
                          }`}
                          maxLength={CHAR_LIMITS.location}
                        />
                        {validationErrors[story.id]?.location && (
                          <p className="text-xs text-red-500">{validationErrors[story.id].location}</p>
                        )}
                      </div>
                    </div>

                    {/* Profile Image URL */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Profile Image URL (optional)
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.image || '').length}/{CHAR_LIMITS.image})
                        </span>
                      </Label>
                      <Input
                        value={story.image || ''}
                        onChange={(e) => handleUpdate(story.id, 'image', e.target.value.slice(0, CHAR_LIMITS.image))}
                        placeholder="Profile Image URL (optional)"
                        className="bg-black border-gray-600 text-white"
                        maxLength={CHAR_LIMITS.image}
                      />
                    </div>

                    {/* Testimony/Story Text */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Testimony/Story Text <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.text || '').length}/{CHAR_LIMITS.text})
                        </span>
                      </Label>
                      <Textarea
                        value={story.text || ''}
                        onChange={(e) => handleUpdate(story.id, 'text', e.target.value.slice(0, CHAR_LIMITS.text))}
                        placeholder="Testimony/Story Text"
                        className={`bg-black border-gray-600 text-white ${
                          validationErrors[story.id]?.text ? 'border-red-500' : ''
                        }`}
                        rows={5}
                        maxLength={CHAR_LIMITS.text}
                      />
                      {validationErrors[story.id]?.text && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].text}</p>
                      )}
                    </div>
                  </>
                ) : (
                  // Video Story Fields
                  <>
                    {/* Title */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        Title <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.title || '').length}/{CHAR_LIMITS.title})
                        </span>
                      </Label>
                      <Input
                        value={story.title || ''}
                        onChange={(e) => handleUpdate(story.id, 'title', e.target.value.slice(0, CHAR_LIMITS.title))}
                        placeholder="Video Title"
                        className={`bg-black border-gray-600 text-white ${
                          validationErrors[story.id]?.title ? 'border-red-500' : ''
                        }`}
                        maxLength={CHAR_LIMITS.title}
                      />
                      {validationErrors[story.id]?.title && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].title}</p>
                      )}
                    </div>

                    {/* Date */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">Date <span className="text-red-500">*</span></Label>
                      <DatePicker
                        value={story.date}
                        onChange={(date) => handleUpdate(story.id, 'date', date)}
                      />
                    </div>

                    {/* YouTube URL */}
                    <div className="space-y-2">
                      <Label className="text-gray-300">
                        YouTube URL <span className="text-red-500">*</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(story.youtubeUrl || '').length}/{CHAR_LIMITS.youtubeUrl})
                        </span>
                      </Label>
                      <Input
                        value={story.youtubeUrl || ''}
                        onChange={(e) => handleUpdate(story.id, 'youtubeUrl', e.target.value.slice(0, CHAR_LIMITS.youtubeUrl))}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className={`bg-black border-gray-600 text-white ${
                          validationErrors[story.id]?.youtubeUrl ? 'border-red-500' : ''
                        }`}
                        maxLength={CHAR_LIMITS.youtubeUrl}
                      />
                      {validationErrors[story.id]?.youtubeUrl && (
                        <p className="text-xs text-red-500">{validationErrors[story.id].youtubeUrl}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Paste the full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)
                      </p>
                    </div>
                  </>
                )}

                {/* Status and Featured */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Status <span className="text-red-500">*</span></Label>
                    <Select 
                      value={story.status || 'Submitted'} 
                      onValueChange={(value: any) => handleUpdate(story.id, 'status', value)}
                    >
                      <SelectTrigger className="bg-black border-gray-600 text-white cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-600">
                        <SelectItem value="Submitted" className="text-white cursor-pointer">Submitted</SelectItem>
                        <SelectItem value="In-Review" className="text-white cursor-pointer">In-Review</SelectItem>
                        <SelectItem value="Approved" className="text-white cursor-pointer">Approved</SelectItem>
                        <SelectItem value="Rejected" className="text-white cursor-pointer">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-gray-300 pb-2 cursor-pointer">
                      <Checkbox
                        checked={story.featured || false}
                        onCheckedChange={(checked) => handleUpdate(story.id, 'featured', checked)}
                        className="border-gray-600 data-[state=checked]:bg-[#FDB813] data-[state=checked]:border-[#FDB813] cursor-pointer"
                      />
                      Featured Story
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSaveStory(story.id)}
                    className="bg-[#FDB813] hover:bg-[#e5a610] text-black cursor-pointer"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => handleCancel(story.id)}
                    className="bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 cursor-pointer"
                  >
                    <X size={16} className="mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start gap-4 mb-3">
                  {story.type === 'text' && story.image && (
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-16 h-16 object-cover rounded-full flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {story.type === 'text' ? (
                            <FileText size={16} className="text-blue-500" />
                          ) : (
                            <Video size={16} className="text-red-500" />
                          )}
                          <h4 className="text-white">
                            {story.type === 'text' ? story.name : story.title}
                          </h4>
                          <span className={`px-2 py-0.5 text-xs rounded border ${getStatusColor(story.status)}`}>
                            {story.status || 'Submitted'}
                          </span>
                          {story.featured && (
                            <span className="px-2 py-0.5 bg-yellow-900/30 text-yellow-400 text-xs rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">
                          {story.type === 'text' 
                            ? `${story.role} • ${story.location} • ${story.date}`
                            : `Video • ${story.date}`
                          }
                        </p>
                        <p className="text-xs text-[#FDB813] mt-1">{story.category}</p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <button
                          onClick={() => setEditingId(story.id)}
                          className="p-2 bg-[#2E2E2E] text-[#FDB813] hover:bg-[#1a1a1a] border border-[#FDB813] rounded transition-colors cursor-pointer"
                          aria-label="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(story.id)}
                          className="p-2 bg-[#2E2E2E] text-[#FDB813] hover:bg-[#1a1a1a] border border-[#FDB813] rounded transition-colors cursor-pointer"
                          aria-label="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    {story.type === 'text' && story.text && (
                      <p className="text-gray-300 text-sm mb-3 italic">"{story.text}"</p>
                    )}
                    {story.type === 'video' && story.youtubeUrl && (
                      <p className="text-gray-300 text-sm mb-3">
                        <a 
                          href={story.youtubeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline cursor-pointer"
                        >
                          {story.youtubeUrl}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Status Actions */}
                <div className="flex gap-2">
                  {story.status !== 'In-Review' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'In-Review')}
                      className="px-3 py-1 text-xs bg-blue-900/30 text-blue-400 rounded hover:bg-blue-900/50 transition-colors cursor-pointer"
                    >
                      Mark In-Review
                    </button>
                  )}
                  {story.status !== 'Approved' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'Approved')}
                      className="px-3 py-1 text-xs bg-green-900/30 text-green-400 rounded hover:bg-green-900/50 transition-colors cursor-pointer"
                    >
                      Approve
                    </button>
                  )}
                  {story.status !== 'Rejected' && (
                    <button
                      onClick={() => handleStatusChange(story.id, 'Rejected')}
                      className="px-3 py-1 text-xs bg-red-900/30 text-red-400 rounded hover:bg-red-900/50 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        onConfirm={confirmDelete}
        itemType="story"
        itemName={deleteDialog.name}
      />
    </div>
  );
}
