import React, { useState } from 'react';
import { ShieldAlert, Eye, Lock, AlertTriangle, X, Check } from 'lucide-react';
import { apiClient } from '../../services/api-client';

interface PIIRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  maskedValue: string;
  unmaskedValue: string;
  fieldLabel: string;
  targetResource: string;
  targetId: string;
}

export const PIIRevealModal: React.FC<PIIRevealModalProps> = ({
  isOpen,
  onClose,
  maskedValue,
  unmaskedValue,
  fieldLabel,
  targetResource,
  targetId,
}) => {
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || reason.trim().length < 10) {
      setError('Lý do truy cập dữ liệu định danh phải từ 10 ký tự trở lên theo quy định.');
      return;
    }
    if (!confirmed) {
      setError('Vui lòng xác nhận bạn hiểu rõ trách nhiệm bảo mật thông tin khách hàng.');
      return;
    }

    try {
      // Record immutable audit log per Decree 13/2023/ND-CP & OWASP ASVS
      await apiClient.recordAuditLog({
        actorName: 'Nguyễn Văn Quản Trị',
        actorRole: 'Super Admin',
        action: 'XEM_PII',
        targetResource,
        targetId,
        ipAddress: '113.161.88.24',
        reason: `[XEM_PII] ${fieldLabel}: ${reason.trim()}`,
      });

      setIsRevealed(true);
      setError(null);
    } catch {
      setError('Không thể ghi nhật ký kiểm toán. Truy cập bị từ chối.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(unmaskedValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setReason('');
    setConfirmed(false);
    setIsRevealed(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
              <ShieldAlert className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-h3 text-h3 text-on-surface">Kiểm Soát Truy Cập Dữ Liệu PII</h3>
              <p className="font-caption text-caption text-on-surface-variant">
                Tuân thủ Nghị định 13/2023/NĐ-CP & ISO 27001
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Cảnh báo bảo mật:</strong> Hành vi xem dữ liệu cá nhân chưa che giấu ({fieldLabel}) sẽ được ghi nhận vào Nhật ký Kiểm toán bất biến kèm định danh tài khoản và IP máy trạm.
            </div>
          </div>

          <div className="bg-surface-container rounded-xl p-4 space-y-1.5">
            <div className="text-xs font-semibold text-outline uppercase tracking-wider">Trường dữ liệu yêu cầu</div>
            <div className="font-medium text-sm text-on-surface">{fieldLabel} ({targetResource})</div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/30">
              <span className="text-xs text-on-surface-variant">Trạng thái hiện tại:</span>
              <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 bg-surface-container-lowest rounded-md">
                {isRevealed ? unmaskedValue : maskedValue}
              </span>
            </div>
          </div>

          {!isRevealed ? (
            <form onSubmit={handleReveal} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Lý do nghiệp vụ truy xuất PII <span className="text-secondary">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Ví dụ: Liên hệ tư vấn trực tiếp gói cước KC135 theo yêu cầu của khách hàng..."
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all"
                />
                <span className="text-[11px] text-outline">Tối thiểu 10 ký tự ({reason.length}/10)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="confirm-pii"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-outline-variant text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
                <label htmlFor="confirm-pii" className="text-xs text-on-surface-variant cursor-pointer leading-relaxed">
                  Tôi cam kết chỉ sử dụng thông tin này cho mục đích hỗ trợ nghiệp vụ viễn thông MobiFone và chịu trách nhiệm bảo mật theo quy định pháp luật.
                </label>
              </div>

              {error && (
                <div className="text-xs text-secondary font-medium bg-secondary-fixed/50 p-2.5 rounded-lg border border-secondary/20">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                  Xác nhận mở dữ liệu
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-800 font-semibold mb-1">Dữ liệu đã được giải mã tạm thời:</div>
                  <div className="font-mono text-base font-bold text-emerald-950 tracking-wider">
                    {unmaskedValue}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-50 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Lock className="w-3.5 h-3.5" />}
                  {copied ? 'Đã sao chép' : 'Sao chép'}
                </button>
              </div>

              <p className="text-[11px] text-outline italic text-center">
                Phiên giải mã sẽ tự đóng và dữ liệu được che lại ngay khi bạn đóng cửa sổ này.
              </p>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm"
                >
                  Đóng & Khóa dữ liệu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
