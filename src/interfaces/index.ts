import { ReactNode } from "react";

export interface ISelectData {
  value: string;
  label: string;
}

export interface IIconComponent {
  fill?: string;
  stroke?: string;
}

export interface AuthState {
  isLogged: boolean;
  token: string | null;
  refreshToken: string | null;
  user_role: string | null;
}

export interface IParams {
  pi?: number;
  ps?: number;
  s?: string;
  ot?: string;
}

export interface FormStateParams {
  queryKey?: string;
}

export interface FormParams {
  mode?: "edit" | "view" | "create";
  mutate?: (a: any, b?: any) => void;
  loading?: boolean;
  formFooter?: ReactNode;
}


export interface Region {
  id: string;
  code: string;
  name: string;
  branches: any[];
};

export interface RegionBranch {
  id: number;
  region: string;
  branch: string;
};

export interface Rubej {
  id: number;
  region: string;
  branch: string;
  rubej: string;
};