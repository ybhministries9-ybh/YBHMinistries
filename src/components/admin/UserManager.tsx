import { useState } from 'react';
import { Plus, Edit, Trash2, X, User, Mail, Shield, Clock, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { sampleUsers } from '../../utils/sampleAdminData';
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
}

interface ValidationErrors {
  name?: string;
  email?: string;
}

type SortColumn = 'name' | 'role' | 'status' | 'lastLogin' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export function UserManager() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast.error('Please fix the validation errors');
      return;
    }

    // Clear validation errors
    setValidationErrors({});
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
      toast.success('User updated successfully');
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        lastLogin: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([...users, newUser]);
      toast.success('User added successfully');
    }
    
    resetForm();
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      toast.success('User deleted successfully');
      setUserToDelete(null);
    }
    setDeleteDialogOpen(false);
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
          <h2 className="text-2xl text-white mb-2">User Management</h2>
          <p className="text-gray-300">Manage admin portal users and their permissions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FDB813] text-black rounded-lg hover:bg-[#e5a711] transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add User
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
                  className={`w-full px-3 py-2 bg-black border ${
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
                  className={`w-full px-3 py-2 bg-black border ${
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
                  className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
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
                  className="w-full px-3 py-2 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#FDB813] focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Inactive users cannot log in to the admin portal
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#FDB813] text-black rounded-lg hover:bg-[#e5a711] transition-colors cursor-pointer"
              >
                {editingUser ? 'Update' : 'Add'} User
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-[#2E2E2E] hover:bg-[#1a1a1a] text-white border border-gray-600 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-black border border-gray-700 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-[#2E2E2E] border-b border-gray-700">
              <tr>
                <th 
                  className="w-[30%] px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    <span>User</span>
                    <SortIcon column="name" />
                  </div>
                </th>
                <th 
                  className="w-[16%] px-3 py-3 text-left text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center gap-2">
                    <span>Role</span>
                    <SortIcon column="role" />
                  </div>
                </th>
                <th 
                  className="w-[12%] px-3 py-3 text-left text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    <SortIcon column="status" />
                  </div>
                </th>
                <th 
                  className="w-[18%] px-3 py-3 text-left text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('lastLogin')}
                >
                  <div className="flex items-center gap-2">
                    <span>Last Login</span>
                    <SortIcon column="lastLogin" />
                  </div>
                </th>
                <th 
                  className="w-[12%] px-3 py-3 text-left text-xs text-gray-400 uppercase tracking-wider cursor-pointer hover:text-[#FDB813] transition-colors"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-2">
                    <span>Member Since</span>
                    <SortIcon column="createdAt" />
                  </div>
                </th>
                <th className="w-[12%] px-3 py-3 text-right text-xs text-gray-400 uppercase tracking-wider">
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
                  <tr key={user.id} className="hover:bg-[#2E2E2E]">
                    <td className="px-4 py-4">
                      <div className="flex items-center min-w-0">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-900/30 rounded-full flex items-center justify-center">
                          <User size={20} className="text-purple-400" />
                        </div>
                        <div className="ml-3 min-w-0 flex-1">
                          <div className="text-sm text-white truncate">{user.name}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-1 min-w-0">
                            <Mail size={12} className="flex-shrink-0" />
                            <span className="truncate">{user.email}</span>
                          </div>
                        </div>
                      </div>
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
                    <td className="px-3 py-4 text-sm text-gray-400">
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
                    <td className="px-3 py-4 text-sm text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'numeric',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-3 py-4 text-right text-sm">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-gray-400 hover:bg-[#2E2E2E] rounded transition-colors"
                          aria-label="Edit"
                          title="Edit User"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-2 bg-[#2E2E2E] text-[#FDB813] hover:bg-[#1a1a1a] border border-[#FDB813] rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
