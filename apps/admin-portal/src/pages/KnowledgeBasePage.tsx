import React from 'react';
import { FileText, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const documents = [
    {
      title: 'Chính sách cước & định mức gói KC135, TK135, MXH120 năm 2026',
      category: 'Gói cước',
      chunks: 48,
      status: 'Đã lập chỉ mục Vector',
      accuracy: '98.5%',
      lastSync: '2 giờ trước',
    },
    {
      title: 'Sổ tay xử lý sự cố trạm phát sóng BTS và kết nối 4G ven biển',
      category: 'Kỹ thuật',
      chunks: 32,
      status: 'Đã lập chỉ mục Vector',
      accuracy: '96.2%',
      lastSync: 'Hôm qua',
    },
    {
      title: 'Quy trình chuẩn hóa thông tin thuê bao chính chủ theo Nghị định 49',
      category: 'Thủ tục',
      chunks: 24,
      status: 'Đã lập chỉ mục Vector',
      accuracy: '99.0%',
      lastSync: '3 ngày trước',
    },
    {
      title: 'Danh bạ địa chỉ, định vị GPS & hotline 10 cửa hàng MobiFone Cà Mau',
      category: 'Mạng lưới',
      chunks: 16,
      status: 'Đã lập chỉ mục Vector',
      accuracy: '100%',
      lastSync: 'Vừa xong',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Cơ Sở Tri Thức AI (RAG Studio)</h1>
          <p className="text-xs text-on-surface-variant">
            Quản lý tài liệu nguồn, đồng bộ Embedding Vector và kiểm soát độ chính xác của câu trả lời trợ lý ảo
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Model: Gemini 1.5 Flash + pgvector</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs text-outline font-medium">Tài liệu đã số hóa</span>
          <div className="text-xl font-bold text-on-surface mt-1">12 văn bản</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs text-outline font-medium">Vector Chunks</span>
          <div className="text-xl font-bold text-primary mt-1">1,248 đoạn</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs text-outline font-medium">Độ chính xác RAG</span>
          <div className="text-xl font-bold text-emerald-600 mt-1">97.8%</div>
        </div>
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm">
          <span className="text-xs text-outline font-medium">Độ trễ trung bình</span>
          <div className="text-xl font-bold text-on-surface mt-1">450ms</div>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <h2 className="font-bold text-base text-on-surface">Danh Mục Nguồn Tri Thức Đồng Bộ</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors">
            <RefreshCw className="w-3.5 h-3.5 text-primary" />
            <span>Tái lập chỉ mục</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Tên Tài Liệu / Nguồn Dữ Liệu</th>
                <th className="px-5 py-3.5">Phân Nhóm</th>
                <th className="px-5 py-3.5">Số Lượng Chunk</th>
                <th className="px-5 py-3.5">Độ Chính Xác</th>
                <th className="px-5 py-3.5">Trạng Thái Vector</th>
                <th className="px-5 py-3.5 text-right">Lần Cuối Cập Nhật</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {documents.map((doc, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-on-surface flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>{doc.title}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 bg-surface-container rounded text-[11px] font-medium text-on-surface-variant">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono">{doc.chunks} chunks</td>
                  <td className="px-5 py-3.5 font-semibold text-emerald-600">{doc.accuracy}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-outline">{doc.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
