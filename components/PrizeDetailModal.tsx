
import React from 'react';
import { Prize, HistoryRecord } from '../types';
import ImageIcon from './icons/ImageIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import PriceHistoryChart from './PriceHistoryChart';

interface PrizeDetailModalProps {
  prize: Prize;
  isOpen: boolean;
  onClose: () => void;
  onShowPriceHistory: (prize: Prize) => void;
}

const PrizeDetailModal: React.FC<PrizeDetailModalProps> = ({ prize, isOpen, onClose, onShowPriceHistory }) => {
  if (!isOpen) return null;

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'registration': return '登録';
      case 'quantity_change': return '在庫数変更';
      case 'edit': return '編集';
      case 'import': return 'インポート';
      default: return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'registration': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'quantity_change': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'edit': return 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
      case 'import': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">商品詳細</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full hover:bg-slate-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Image and Info */}
            <div className="space-y-6">
              <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                {prize.photo ? (
                  <img src={prize.photo} alt={prize.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-20 h-20 text-slate-200 dark:text-slate-600" />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white">{prize.name}</h3>
                  <div className="flex gap-2 mt-2">
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {prize.category}
                    </span>
                    {prize.manufacturer && (
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                        {prize.manufacturer}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">現在の在庫</p>
                    <p className="text-xl font-black text-slate-800 dark:text-white">{prize.quantity} <span className="text-xs font-normal">個</span></p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">獲得日</p>
                    <p className="text-sm font-black text-slate-800 dark:text-white">{prize.acquisitionDate}</p>
                  </div>
                </div>

                {prize.notes && (
                  <div className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">備考メモ</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{prize.notes}</p>
                  </div>
                )}

                <button 
                  onClick={() => onShowPriceHistory(prize)}
                  className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <ChartBarIcon className="w-5 h-5" />
                  相場履歴を表示
                </button>
              </div>
            </div>

            {/* Right: History Logs */}
            <div className="flex flex-col h-full">
              <h4 className="text-sm font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                変更履歴
              </h4>
              <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-4 overflow-y-auto custom-scrollbar border border-slate-100 dark:border-slate-700">
                {prize.history && prize.history.length > 0 ? (
                  <div className="space-y-4">
                    {prize.history.slice().reverse().map((log, index) => (
                      <div key={index} className="relative pl-6 pb-4 border-l-2 border-slate-200 dark:border-slate-700 last:pb-0">
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-500"></div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${getActionColor(log.action)}`}>
                              {getActionLabel(log.action)}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">{formatDate(log.timestamp)}</span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{log.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <p className="text-xs font-bold">履歴がありません</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrizeDetailModal;
