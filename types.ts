
export type PrizeCategory = 'マスコット' | 'ぬいぐるみ' | 'フィギュア' | 'その他';

export type Manufacturer = 'バンダイナムコ' | 'タイトー' | 'SEGA FAVE' | 'FuRyu' | 'Parade' | 'SK' | 'その他';

export interface PriceRecord {
  date: string;
  price: number;
}

export type HistoryAction = 'registration' | 'quantity_change' | 'edit' | 'import';

export interface HistoryRecord {
  timestamp: string;
  action: HistoryAction;
  details: string;
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
