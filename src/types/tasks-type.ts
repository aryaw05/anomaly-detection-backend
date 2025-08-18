import { Status } from "@prisma/client";
export interface Tasks {
  id: number;
  tasks: string;
  status: string;
  created_at: Date;
  updated_at?: Date;
  infrastructure_detail?: {
    infrastructure_name: string;
    latitude: number;
    longitude: number;
    infrastructure_type: {
      infrastructure_type: string;
    };
    upt: {
      upt_name: string;
    };
  };
  anomaly?: {
    anomaly_category: string;
  };
}

export interface RemoveTask {
  id: number;
  id_user: number;
}

export interface getTaskById {
  id: number;
  id_user: number;
}

export interface getAndFilterTask {
  data: Tasks[];
  paging: {
    page: number;
    total_item: number;
    total_page: number;
  };
}

export interface taskUpdate {
  id: number;
  status?: Status;
  tasks?: string;
}

export interface taskStatusUpdate {
  id: number;
  note?: string;
  status: Status;
  infrastructure_detail: {
    infrastructure_name: string;
  };
}
