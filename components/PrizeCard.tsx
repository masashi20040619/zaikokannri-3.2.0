
import React, { useMemo } from 'react';
import { Prize } from '../types';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';
import ImageIcon from './icons/ImageIcon';
import ChartBarIcon from './icons/ChartBarIcon';

interface PrizeCardProps {
  prize: Prize;
  onEdit: (prize: Prize) => void;
  onDelete: (prizeId: string) => void;
  onQuantityChange: (prizeId: string, newQuantity: number) => void;
  onShowHistory?: (prize: Prize) => void;
  onShowDetail?: (prize: Prize) => void;
}

const PrizeCard: React.FC<PrizeCardProps> = ({ prize, onEdit, onDelete, onQuantityChange, onShowHistory, onShowDetail }) => {
  const priceInfo = useMemo(() => {
    if (!prize.priceHistory || prize.priceHistory.length === 0) return null;
    
    const history = prize.priceHistory;
    const current = history[history.length - 1].price;
    const previous = history.length > 1 ? history[history.length - 2].price : current;
    const diff = current - previous;
    
    return { current, previous, diff };
  }, [prize.priceHistory]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden group hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700">
      <div className="relative aspect-[4/3] overflow-hidden">
        {prize.photo ? (
          <img 
            src={prize.photo} 
            alt={prize.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-slate-200 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-4 left-4 flex gap-2">
           <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border border-slate-100 dark:border-slate-700">
            {prize.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="overflow-hidden whitespace-nowrap mb-4 group/marquee relative">
          <div className="inline-block group-hover/marquee:animate-marquee">
            <h3 className="text-lg font-black text-slate-800 dark:text-white inline-block pr-8">
              {prize.name}
            </h3>
            {/* Duplicate text for seamless marquee on hover */}
            <h3 className="text-lg font-black text-slate-800 dark:text-white inline-block pr-8 hidden group-hover/marquee:inline-block">
              {prize.name}
            </h3>
          </div>
        </div>
        
        {prize.notes && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">備考メモ</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">{prize.notes}</p>
          </div>
        )}
        
        <div className="space-y-3">
          {/* Market Price Display */}
          <div className="flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">現在の相場</span>
                <div className="flex items-center gap-1.5">
                   <span className="text-xl font-black text-slate-800 dark:text-white">
                     {priceInfo ? `¥${priceInfo.current.toLocaleString()}` : '---'}
                   </span>
                   {priceInfo && priceInfo.diff !== 0 && (
                     <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${priceInfo.diff > 0 ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                       {priceInfo.diff > 0 ? `+${priceInfo.diff}` : priceInfo.diff}
                     </span>
                   )}
                </div>
             </div>
             {prize.priceHistory && prize.priceHistory.length > 1 && (
               <button 
                 onClick={() => onShowHistory?.(prize)}
                 className="p-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-colors"
                 title="相場履歴を見る"
               >
                 <ChartBarIcon className="w-5 h-5" />
               </button>
             )}
          </div>

          <div className="h-px bg-slate-50 dark:bg-slate-700/50"></div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">在庫数</span>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-2xl">
              <button 
                onClick={() => onQuantityChange(prize.id, Math.max(0, prize.quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
              </button>
              <span className="text-sm font-black text-slate-800 dark:text-white w-4 text-center">{prize.quantity}</span>
              <button 
                onClick={() => onQuantityChange(prize.id, prize.quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onShowDetail?.(prize)}
            className="flex-1 py-2.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-black hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            詳細
          </button>
          <button
            onClick={() => onEdit(prize)}
            className="w-12 h-10 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all"
            title="編集"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(prize.id)}
            className="w-12 h-10 bg-slate-50 dark:bg-slate-700/50 text-slate-300 hover:text-red-500 rounded-xl flex items-center justify-center transition-all"
            title="削除"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;
