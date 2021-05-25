
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
