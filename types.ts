
export type PrizeCategory = 'マスコット' | 'ぬいぐるみ' | 'フィギュア' | 'その他';

export type Manufacturer = 'バンダイナムコ' | 'タイトー' | 'SEGA FAVE' | 'FuRyu' | 'Parade' | 'SK' | 'その他';

export interface PriceRecord {
  date: string;
  price: number;
}

export type HistoryAction = 'registration' | 'quantity_change' | 'edit' | 'import' | 'sale' | 'acquisition';

export interface HistoryRecord {
  timestamp: string;
  action: HistoryAction;
  details: string;
  price?: number; // 売却価格や獲得時の相場 (互換性のため残す)
  quantity?: number; // 数量
  unitPrice?: number; // 単価（その時の相場）
  prizeId?: string; // 商品ID
  type?: 'sell' | 'buy'; // 種類（sell または buy）
}

export interface Prize {
  id: string;
  name: string;
  quantity: number;
  acquisitionDate: string;
  category: PrizeCategory;
  manufacturer?: Manufacturer;
  photo?: string;
  notes?: string;
  priceHistory?: PriceRecord[]; // 相場の履歴
  history?: HistoryRecord[]; // 変更履歴
}
