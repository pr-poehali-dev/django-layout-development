export interface QueueItem {
  id: number;
  phone: string;
  message_text: string;
  message_template: string;
  scheduled_at: string;
  sent_at: string | null;
  status: string;
  lead_phone: string;
  lead_name: string;
  course: string;
}

export interface Template {
  id: number;
  name: string;
  title: string;
  content: string;
  delay_days: number;
  course: string | null;
  active: boolean;
}

export interface Stats {
  stats: Array<{ status: string; count: number }>;
  active_campaigns: number;
}
