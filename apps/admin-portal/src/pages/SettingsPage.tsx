import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [sessionTimeout, setSessionTimeout] = useState('15');
  const [requireMfa, setRequireMfa] = useState(true);
  const [autoMaskPii, setAutoMaskPii] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-bold text-2xl text-on-surface">Cấu Hình Chung Hệ Thống</h1>
        <p className="text-xs text-on-surface-variant">
          Quản lý chính sách an toàn thông tin, thời hạn phiên làm việc và giao thức bảo mật PII
        </p>
      </div>

      {saved && (
        <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Đã lưu thành công cấu hình hệ thống!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-5 text-xs">
        <div className="space-y-4">
          <h2 className="font-bold text-xs text-outline uppercase tracking-wider">
            Chính Sách An Toàn Thông Tin & PII
          </h2>

          <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl">
            <div>
              <span className="font-semibold text-on-surface block">
                Tự động che giấu thông tin PII (Masking)
              </span>
              <span className="text-outline text-[11px]">
                Áp dụng bắt buộc đối với tất cả tài khoản theo Nghị định 13/2023/NĐ-CP
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoMaskPii}
              onChange={(e) => setAutoMaskPii(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl">
            <div>
              <span className="font-semibold text-on-surface block">
                Bắt buộc xác thực 2 yếu tố (MFA / OTP)
              </span>
              <span className="text-outline text-[11px]">
                Yêu cầu mã xác thực khi đăng nhập tài khoản quản trị từ ngoài mạng nội bộ
              </span>
            </div>
            <input
              type="checkbox"
              checked={requireMfa}
              onChange={(e) => setRequireMfa(e.target.checked)}
              className="w-4 h-4 rounded text-primary focus:ring-primary"
            />
          </div>

          <div className="p-3.5 bg-surface-container-low rounded-xl space-y-1.5">
            <span className="font-semibold text-on-surface block">
              Thời gian hết hạn phiên làm việc (Session Timeout)
            </span>
            <span className="text-outline text-[11px] block">
              Tự động khóa màn hình và yêu cầu đăng nhập lại khi không có thao tác
            </span>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none"
            >
              <option value="15">15 phút (Khuyến nghị OWASP ASVS)</option>
              <option value="30">30 phút</option>
              <option value="60">60 phút</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/30 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition-all shadow-sm"
          >
            Lưu cấu hình hệ thống
          </button>
        </div>
      </form>
    </div>
  );
};
