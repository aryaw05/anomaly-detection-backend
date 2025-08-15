export interface Infrastructure {
  id: number;
  infrastructure_name: string;
  latitude: number;
  longitude: number;
  infrastructure_task: {
    status: string;
    tasks: string;
    created_at: Date;
  }[];
  infrastructure_type: {
    infrastructure_type: string;
  };
}

export interface InfrastructureDetail {
  id: number;
  infrastructure_name: string;
  infrastructure_task: {
    status: string;
    tasks: string;
    created_at: Date;
    anomaly: {
      anomaly_category: string;
    };
  }[];
  infrastructure_type: {
    infrastructure_type: string;
  };
  upt: {
    upt_name: string;
  };
}
