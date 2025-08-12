export interface Tasks {
  id: number;
  tasks: string;
  status: string;
  id_infrastructure_detail: number;
  id_anomaly: number;
  id_user: number;
  created_at: Date;
  updated_at: Date;
}

export interface RemoveTask {
  id: number;
  id_user: number;
}
