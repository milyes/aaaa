export interface ESim {
  id: string;
  iccid: string;
  status: 'active' | 'inactive' | 'provisioning' | 'error';
  plan: string;
  usage: number; // in GB
  limit: number; // in GB
  lastActive: string;
  country: string;
}

export interface ApiLog {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  status: number;
  latency: number; // in ms
}
