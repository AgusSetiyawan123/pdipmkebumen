export interface News {
  id: number;
  title: string;
  content: string;
  author: string;
  image_url?: string;
  created_at: string;
}

export interface Stats {
  cabang: StatItem[];
  ranting: StatItem[];
}

export interface StatItem {
  id: number;
  type: 'cabang' | 'ranting';
  name: string;
  location?: string;
}
