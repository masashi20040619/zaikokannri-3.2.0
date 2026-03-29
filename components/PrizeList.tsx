
import React from 'react';
import { Prize } from '../types';
import PencilIcon from './icons/PencilIcon';
import TrashIcon from './icons/TrashIcon';

interface PrizeListProps {
  prizes: Prize[];
  onEdit: (prize: Prize) => void;
  onDelete: (prizeId: string) => void;
  onQuantityChange: (prizeId: string, newQuantity: number) => void;
  onSale: (prizeId: string) => void;
  onAcquisition: (prizeId: string) => void;
  onShowDetail?: (prize: Prize) => void;
}

const PrizeList: React.FC<PrizeListProps> = ({ prizes, onEdit, onDelete, onQuantityChange, onSale, onAcquisition, onShowDetail }) => {
  return (
    <div className="space-y-3 sm:space-y-0 sm:bg-white sm:dark:bg-slate-800 sm:rounded-lg sm:shadow-lg sm:overflow-x-auto">
      {/* Mobile View: Compact Cards */}
      <div className="sm:hidden space-y-3">
        {prizes.map((prize) => (
          <div key={prize.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-700 shrink-0">
              {prize.photo ? (
                <img src={prize.photo} alt={prize.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-black text-slate-800 dark:text-white truncate">{prize.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-slate-400">{prize.category}</span>
                <span className="text-[10px] font-bold text-slate-400">•</span>
                <span className="text-[10px] font-bold text-slate-400">{prize.manufacturer !== '指定なし' ? prize.manufacturer : 'メーカー不明'}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-lg">
                  <button onClick={() => onQuantityChange(prize.id, Math.max(0, prize.quantity - 1))} className="text-slate-400 text-lg font-bold">-</button>
                  <span className="text-xs font-black w-4 text-center">{prize.quantity}</span>
                  <button onClick={() => onQuantityChange(prize.id, prize.quantity + 1)} className="text-slate-400 text-lg font-bold">+</button>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => onSale(prize.id)} 
                    disabled={prize.quantity === 0}
                    className={`px-2 py-1 rounded-lg text-[10px] font-black ${prize.quantity === 0 ? 'bg-slate-100 text-slate-300' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'}`}
                  >
                    売れた
                  </button>
                  <button 
                    onClick={() => onAcquisition(prize.id)} 
                    className="px-2 py-1 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg text-[10px] font-black"
                  >
                    仕入
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => onShowDetail?.(prize)} className="p-2 text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button>
              <button onClick={() => onEdit(prize)} className="p-2 text-slate-400 bg-slate-50 dark:bg-slate-700 rounded-lg"><PencilIcon className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table */}
      <table className="hidden sm:table w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3 min-w-[200px]">
              景品名
            </th>
            <th scope="col" className="px-6 py-3">
              カテゴリ
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              数量
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              在庫管理
            </th>
            <th scope="col" className="px-6 py-3">
              獲得日
            </th>
            <th scope="col" className="px-6 py-3">
              会社
            </th>
            <th scope="col" className="px-6 py-3">
              備考
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {prizes.map((prize) => (
            <tr key={prize.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50 align-middle">
              <th scope="row" className="px-6 py-4 font-medium text-slate-900 dark:text-white whitespace-nowrap overflow-hidden max-w-[200px] group/marquee">
                <div className="inline-block group-hover/marquee:animate-marquee whitespace-nowrap">
                  <span className="pr-8">{prize.name}</span>
                  <span className="pr-8 hidden group-hover/marquee:inline-block">{prize.name}</span>
                </div>
              </th>
              <td className="px-6 py-4">
                {prize.category}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onQuantityChange(prize.id, Math.max(0, prize.quantity - 1))}
                    className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    aria-label="減らす"
                  >
                    -
                  </button>
                  <span className="font-mono text-base w-8 text-center">{prize.quantity}</span>
                  <button
                    onClick={() => onQuantityChange(prize.id, prize.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-100 flex items-center justify-center font-bold hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
                    aria-label="増やす"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button 
                    onClick={() => onSale(prize.id)} 
                    disabled={prize.quantity === 0}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all ${prize.quantity === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400'}`}
                  >
                    売れた
                  </button>
                  <button 
                    onClick={() => onAcquisition(prize.id)} 
                    className="px-3 py-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 rounded-xl text-[10px] font-black transition-all"
                  >
                    仕入れた
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {prize.acquisitionDate}
              </td>
              <td className="px-6 py-4">
                {prize.manufacturer || '-'}
              </td>
              <td className="px-6 py-4 max-w-[150px] truncate" title={prize.notes}>
                {prize.notes || '-'}
              </td>
              <td className="px-6 py-4">
                 <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onShowDetail?.(prize)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                        aria-label="詳細"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                    <button
                        onClick={() => onEdit(prize)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        aria-label="編集"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onDelete(prize.id)}
                        className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                        aria-label="削除"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrizeList;
