
export type TypeGarbage = 'plastic' | 'paper' | 'glass' | 'metal' | 'mixed'
export type TypeBinStatus = 'disabled' | 'enabled'

export interface StateRoot {
  loggedIn: boolean;
  drawerState: boolean;
  filterDialogState: boolean;
  activeBinId: string;
  binStatusValues: TypeBinStatus[];
  binTypeValues: TypeGarbage[];
  binFilter: BinFilter;
  binItems: BinDetail[];
  nextToken: undefined;
  idSearchActive: boolean;
  loading: number;
  selectedBins: Set<string>;
  selectedBinsCount: number;
  azureMapCenter: number[];
  azureMapMaxBounds: number[][];
  mapDialogActive: boolean;
  reports: Report[];
  telemetry: {
    [key: string]: any[]
  }
}

export interface BinDetail {
  binId?: string;
  status?: TypeBinStatus;
  connectionString?: string;
  lon: number;
  lat: number;
  type: TypeGarbage;
  district?: string[];
}

export interface GenericOptionItem {
  label: string;
  value: any;
}

export interface BinFilter {
  status?: TypeBinStatus;
  type?: TypeGarbage;
  location?: any;
  pageSize?: number;
}

export interface Report {
  id: string;
  binId: string;
  type: TypeGarbage;
  message: string;
  _ts: number;
}

export interface BinTelemetry {
  fullness: number;
  smoke: number;
  tilt: number;
  alertFull?: boolean;
  alertFire?: boolean;
  alertFlip?: boolean;
  _ts: number;
}

export interface BinAlert {
  binId: string;
  type: 'fire' | 'flip',
  time: string;
}
