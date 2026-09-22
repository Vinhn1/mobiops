import React from 'react';
import { FileText, Download } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const documents = [
    {
      name: 'Quyết định ban hành gói cước KC135 & TK135 tại Cà Mau.pdf',
      size: '2.4 MB',
      updatedAt: '15/09/2026',
      type: 'Pháp lý',
    },
    {
      name: 'Quy trình kiểm soát thông tin định danh cá nhân NĐ13-2023.pdf',
      size: '1.8 MB',
      updatedAt: '01/09/2026',
      type: 'Bảo mật',
    },
    {
      name: 'Sơ đồ vị trí và tham số kỹ thuật trạm BTS ven biển Cà Mau.xlsx',
      size: '4.1 MB',
      updatedAt: '18/09/2026',
      type: 'Kỹ thuật',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl text-on-surface">Tài Liệu & Nguồn Tri Thức</h1>
        <p className="text-xs text-on-surface-variant">
          Kho văn bản điều hành, thông tư quy định và tài liệu kỹ thuật viễn thông nội bộ
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="divide-y divide-outline-variant/20 text-xs">
          {documents.map((doc, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <span className="font-semibold text-on-surface block">{doc.name}</span>
                  <span className="text-[11px] text-outline">
                    {doc.type} • {doc.size} • Cập nhật: {doc.updatedAt}
                  </span>
                </div>
              </div>

              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-white transition-colors text-[11px] font-semibold">
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
