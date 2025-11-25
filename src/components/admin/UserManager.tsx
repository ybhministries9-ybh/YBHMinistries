import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, User, Mail, Shield, Clock, ArrowUpDown, ArrowUp, ArrowDown, Power, RotateCw, Edit2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  createdAt: string;
  mustReset?: boolean;
}

interface ValidationErrors {
  name?: string;
  email?: string;
}

type SortColumn = 'name' | 'role' | 'status' | 'lastLogin' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export function UserManager() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer',
    status: 'Active',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Character limits
  const CHAR_LIMITS = {
    name: 100,
    email: 100,
  };

  // Load users from API
  useEffect(() => {
    const load = async () => {
      try {
        // include admin token for server-side validation
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const res = await fetch('/api/admin/users', { headers: { 'Authorization': `Bearer ${token}` } });
        const j = await res.json();
        if (j.success) {
          const mapped = (j.data || []).map((r: any) => ({
            id: String(r.id),
            name: r.name,
            email: r.email,
            role: r.role,
            status: r.status,
            lastLogin: r.last_login ? new Date(r.last_login).toLocaleString() : 'Never',
            createdAt: r.created_at || r.createdAt || new Date().toISOString(),
            mustReset: !!r.must_reset_password,
          }));
          setUsers(mapped);
        } else {
          toast.error('Failed to load users');
        }
      } catch (err) {
        console.error('load users failed', err);
        toast.error('Failed to load users');
      }
    };
    load();
  }, []);

  const validateForm = (): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (formData.name.length > CHAR_LIMITS.name) {
      errors.name = `Name must be ${CHAR_LIMITS.name} characters or less`;
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name)) {
      errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (formData.email.length > CHAR_LIMITS.email) {
      errors.email = `Email must be ${CHAR_LIMITS.email} characters or less`;
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else {
      // Check for duplicate email (only when adding new user or changing email)
      const isDuplicate = users.some(
        user => user.email.toLowerCase() === formData.email.toLowerCase() && 
        (!editingUser || user.id !== editingUser.id)
      );
      if (isDuplicate) {
        errors.email = 'This email address is already in use';
      }
    }

    return errors;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix the validation errors');
      return;
    }

    setValidationErrors({});

    try {
        if (editingUser) {
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch(`/api/admin/users?id=${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(formData)
        });
        const j = await resp.json();
        if (!j.success) {
          toast.error(j.error || 'Failed to update user');
          return;
        }
        const updated = {
          id: String(j.data.id),
          name: j.data.name,
          email: j.data.email,
          role: j.data.role,
          status: j.data.status,
          lastLogin: j.data.last_login ? new Date(j.data.last_login).toLocaleString() : 'Never',
          createdAt: j.data.created_at || new Date().toISOString(),
        } as User;
        setUsers(u => u.map(x => x.id === editingUser.id ? updated : x));
        toast.success('User updated successfully');
      } else {
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch('/api/admin/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(formData)
        });
        const j = await resp.json();
        if (!j.success) {
          toast.error(j.error || 'Failed to create user');
          return;
        }
        const created = {
          id: String(j.data.id),
          name: j.data.name,
          email: j.data.email,
          role: j.data.role,
          status: j.data.status,
          lastLogin: j.data.last_login ? new Date(j.data.last_login).toLocaleString() : 'Never',
          createdAt: j.data.created_at || new Date().toISOString(),
          mustReset: !!j.data.must_reset_password,
        } as User;
        setUsers(u => [created, ...u]);
        // No invite flow — password is set to default and user must reset at first login.
        toast.success('User added successfully');
      }
      resetForm();
    } catch (err) {
      console.error('submit user failed', err);
      toast.error('Failed to save user');
    }
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const doDelete = async () => {
      if (!userToDelete) return;
      try {
        const rawToken = localStorage.getItem('admin_token');
        let token = '';
        if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch(`/api/admin/users?id=${userToDelete.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
        const j = await resp.json();
        if (!j.success) {
          toast.error(j.error || 'Failed to delete user');
        } else {
          setUsers(u => u.filter(user => user.id !== userToDelete.id));
          toast.success('User deleted successfully');
        }
      } catch (err) {
        console.error('delete user failed', err);
        toast.error('Failed to delete user');
      } finally {
        setUserToDelete(null);
        setDeleteDialogOpen(false);
      }
    };
    doDelete();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setValidationErrors({});
    setShowForm(true);
  };

  const toggleActive = async (user: User) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    // optimistic update
    setUsers(u => u.map(x => x.id === user.id ? { ...x, status: newStatus } : x));
    try {
      const rawToken = localStorage.getItem('admin_token');
      let token = '';
      if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
        const resp = await fetch(`/api/admin/users?id=${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ ...user, status: newStatus })
        });
      const j = await resp.json();
      if (!j.success) {
        toast.error(j.error || 'Failed to update status');
        // revert
        setUsers(u => u.map(x => x.id === user.id ? { ...x, status: user.status } : x));
      } else {
        toast.success(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'}`);
      }
    } catch (err) {
      console.error('toggleActive failed', err);
      toast.error('Failed to update status');
      setUsers(u => u.map(x => x.id === user.id ? { ...x, status: user.status } : x));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'Viewer',
      status: 'Active',
    });
    setEditingUser(null);
    setValidationErrors({});
    setShowForm(false);
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      const newErrors = { ...validationErrors };
      delete newErrors[field as keyof ValidationErrors];
      setValidationErrors(newErrors);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-900/30 text-green-400'
      : 'bg-gray-800 text-gray-400';
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      'Super Admin': 'bg-purple-900/30 text-purple-400',
      'Content Manager': 'bg-blue-900/30 text-blue-400',
      'Viewer': 'bg-cyan-900/30 text-cyan-400',
    };
    return colors[role] || 'bg-gray-800 text-gray-400';
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column with ascending direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedUsers = () => {
    const sortedUsers = [...users].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortColumn) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'role':
          aValue = a.role.toLowerCase();
          bValue = b.role.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        case 'lastLogin':
          // Handle "Never" case - put it at the end
          if (a.lastLogin === 'Never' && b.lastLogin === 'Never') return 0;
          if (a.lastLogin === 'Never') return 1;
          if (b.lastLogin === 'Never') return -1;
          // Convert date strings to timestamps for comparison
          aValue = new Date(a.lastLogin).getTime();
          bValue = new Date(b.lastLogin).getTime();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedUsers;
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown size={14} className="opacity-50" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp size={14} className="text-[#FDB813]" />
    ) : (
      <ArrowDown size={14} className="text-[#FDB813]" />
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-300">Manage admin portal users and their permissions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-3 px-4 py-2 bg-[#111] text-white border border-[#FDB813] rounded-md hover:bg-[#0d0d0d] transition-colors cursor-pointer"
        >
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full">
            <Plus size={14} className="text-white" />
          </span>
          <span className="font-medium">Add User</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-black border border-gray-700 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-white">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-300">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({formData.name.length}/{CHAR_LIMITS.name})
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value.slice(0, CHAR_LIMITS.name))}
                  placeholder="Enter full name"
                  style={{ backgroundColor: '#2e2e2e' }}
                  className={`w-full px-3 py-2 !bg-[#2e2e2e] border ${
                    validationErrors.name ? 'border-red-500' : 'border-gray-600'
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent selection:bg-[#FDB813] selection:text-black`}
                  maxLength={CHAR_LIMITS.name}
                />
                {validationErrors.name && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.name}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({formData.email.length}/{CHAR_LIMITS.email})
                  </span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value.slice(0, CHAR_LIMITS.email))}
                  placeholder="user@example.com"
                  style={{ backgroundColor: '#2e2e2e' }}
                  className={`w-full px-3 py-2 !bg-[#2e2e2e] border ${
                    validationErrors.email ? 'border-red-500' : 'border-gray-600'
                  } text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent selection:bg-[#FDB813] selection:text-black`}
                  maxLength={CHAR_LIMITS.email}
                />
                {validationErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Role */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => handleFieldChange('role', e.target.value)}
                  style={{ backgroundColor: '#2e2e2e' }}
                  className="w-full px-3 py-2 !bg-[#2e2e2e] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Content Manager">Content Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Viewer: Read-only access • Content Manager: Edit access • Super Admin: Full access
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm text-gray-300 mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  style={{ backgroundColor: '#2e2e2e' }}
                  className="w-full px-3 py-2 !bg-[#2e2e2e] border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Inactive users cannot log in to the admin portal
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2 justify-end">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <X size={14} />
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#FDB813] text-black rounded-lg hover:bg-[#e5a711] transition-colors cursor-pointer flex items-center gap-2"
              >
                <Save size={14} />
                {editingUser ? 'Update' : 'Add User'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile: stacked list */}
      <div className="md:hidden space-y-4">
        {getSortedUsers().map(user => (
          <div key={user.id} className="bg-[#111] border border-gray-700 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 bg-purple-900/30 rounded-full flex items-center justify-center">
                <User size={20} className="text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-white font-medium">{user.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                  <Mail size={12} />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <span className={`inline-flex px-2.5 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>{user.role}</span>
                  <span className={`inline-flex px-2.5 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>{user.status}</span>
                  <span className="text-xs text-gray-400">Last login: {user.lastLogin}</span>
                  <span className="text-xs text-gray-400">Member since: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => toggleActive(user)} className={`p-2 rounded ${user.status === 'Active' ? 'bg-[#FDB813] text-black' : 'bg-gray-800 text-gray-300'}`} title={user.status === 'Active' ? 'Deactivate' : 'Activate'}>
                <Power size={16} />
              </button>
              <button onClick={async () => {
                try {
                  const rawToken = localStorage.getItem('admin_token');
                  let token = '';
                  if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
                  const resp = await fetch('/api/admin/users/reset', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ id: user.id }) });
                  const j = await resp.json();
                  if (!j.success) { toast.error(j.error || 'Failed to reset password'); return; }
                  setUsers(u => u.map(x => x.id === user.id ? { ...x, mustReset: false } : x));
                  toast.success('Password reset to default and must-reset cleared');
                } catch (err) { console.error(err); toast.error('Failed to reset password'); }
              }} className="p-2 bg-[#FDB813] text-black rounded">
                <RotateCw size={16} />
              </button>
              <button onClick={() => handleEdit(user)} className="h-9 w-9 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#111] hover:bg-[#0d0d0d] text-white transition-colors" title="Edit">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(user)} className="h-9 w-9 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#111] hover:bg-[#0d0d0d] text-white transition-colors" title="Delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block bg-black border border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-[#2E2E2E] border-b border-gray-700">
              <tr>
                <th 
                  className="w-[26%] px-4 py-3 text-left text-xs text-white uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    <span>User</span>
                    <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  className="w-[16%] px-3 py-3 text-left text-xs text-white uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center gap-2">
                    <span>Role</span>
                    <SortIcon column="role" />
                  </div>
                </th>
                <th 
                  className="w-[12%] px-3 py-3 text-left text-xs text-white uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    <SortIcon column="status" />
                  </div>
                </th>
                <th 
                  className="w-[18%] px-3 py-3 text-left text-xs text-white uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('lastLogin')}
                >
                  <div className="flex items-center gap-2">
                    <span>Last Login</span>
                    <SortIcon column="lastLogin" />
                  </div>
                </th>
                <th 
                  className="w-[12%] px-3 py-3 text-left text-xs text-white uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    <span>Member Since</span>
                    <SortIcon column="createdAt" />
                  </div>
                </th>
                <th className="w-[16%] px-3 py-3 text-right text-xs text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No users yet. Add your first user!
                  </td>
                </tr>
              ) : (
                getSortedUsers().map((user) => (
                  <tr key={user.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-4 py-4">
                      <div className="flex items-center min-w-0">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-900/30 rounded-full flex items-center justify-center">
                          <User size={20} className="text-white" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="text-sm text-white truncate">{user.name}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-1 min-w-0">
                            <Mail size={12} className="flex-shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>
                      {/* Mobile actions removed from table row; mobile-only list is rendered above table */}
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                        <Shield size={12} className="flex-shrink-0" />
                        <span className="truncate">{user.role}</span>
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex px-2.5 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-white">
                      <div className="flex items-start gap-1">
                        <Clock size={14} className="flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col leading-tight">
                          {user.lastLogin === 'Never' ? (
                            <span>{user.lastLogin}</span>
                          ) : (
                            <>
                              <span className="truncate">{user.lastLogin.split(' ')[0]}</span>
                              <span className="text-xs text-gray-500">
                                {user.lastLogin.split(' ')[1]} {user.lastLogin.split(' ')[2]}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-white">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-3 py-4 text-right text-sm">
                      <div className="hidden md:flex items-center justify-end gap-2 flex-wrap">
                        <button
                          onClick={() => toggleActive(user)}
                          className={`px-3 py-2 rounded transition-colors text-sm font-medium ${user.status === 'Active' ? 'bg-[#FDB813] text-black hover:bg-[#e5a711]' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                          title={user.status === 'Active' ? 'Deactivate user' : 'Activate user'}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        {/* Reset password to default and require reset on first login */}
                        <button
                          onClick={async () => {
                            try {
                              const rawToken = localStorage.getItem('admin_token');
                              let token = '';
                              if (rawToken) try { token = JSON.parse(rawToken).token || rawToken } catch (e) { token = rawToken }
                              const resp = await fetch('/api/admin/users/reset', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ id: user.id }) });
                              const j = await resp.json();
                              if (!j.success) {
                                toast.error(j.error || 'Failed to reset password');
                                return;
                              }
                              // optimistic update: password reset to default and clear mustReset flag
                              setUsers(u => u.map(x => x.id === user.id ? { ...x, mustReset: false } : x));
                              toast.success('Password reset to default and must-reset cleared');
                            } catch (err) {
                              console.error('reset password failed', err);
                              toast.error('Failed to reset password');
                            }
                          }}
                          className="px-3 py-2 bg-[#FDB813] text-black rounded hover:bg-[#e5a711] transition-colors text-sm font-medium"
                          title="Reset password to default"
                        >
                          Reset Password
                        </button>
                        {/* Removed 'Require Reset' toggle — admin can use Reset Password to set default and clear the flag */}
                        <button
                          onClick={() => handleEdit(user)}
                          className="h-9 w-9 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#111] hover:bg-[#0d0d0d] text-white transition-colors"
                          aria-label="Edit"
                          title="Edit User"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="h-9 w-9 flex items-center justify-center rounded-md border border-[#FDB813] bg-[#111] hover:bg-[#0d0d0d] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Delete"
                          title={user.role === 'Super Admin' ? 'Cannot delete Super Admin' : 'Delete User'}
                          disabled={user.role === 'Super Admin'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        <p>Total Users: {users.length} • Active: {users.filter(u => u.status === 'Active').length}</p>
      </div>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="Delete User"
        description={
          userToDelete 
            ? `Are you sure you want to delete user "${userToDelete.name}" (${userToDelete.email})? This action cannot be undone.`
            : 'Are you sure you want to delete this user? This action cannot be undone.'
        }
      />
    </div>
  );
}
