import { AlertTriangle } from 'lucide-react';
import { accentGold } from '../../utils/theme';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning';
  hideCancel?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText = 'Cancel',
  type = 'warning',
  hideCancel = false
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#2E2E2E] rounded-lg shadow-2xl border border-[#3a3a3a] max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-[#3a3a3a]">
          <div className={`p-2 rounded-full ${type === 'danger' ? 'bg-red-900/20' : 'bg-yellow-900/20'}`}>
            <AlertTriangle className={`h-6 w-6 ${type === 'danger' ? 'text-red-400' : 'text-yellow-400'}`} />
          </div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-300 leading-relaxed">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 bg-black/30 rounded-b-lg">
          {!hideCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white rounded transition-all cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className={`px-6 py-2 rounded font-medium transition-all cursor-pointer ${
              type === 'danger'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'text-black hover:opacity-90'
            }`}
            style={type === 'warning' ? { backgroundColor: accentGold } : {}}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
