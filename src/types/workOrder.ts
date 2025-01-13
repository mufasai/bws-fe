export interface WorkOrder {
  no: number;
  noIhld: string;
  namaProject: string;
  projectType: string;
  volumeTanam: number;
  poh: number;
  sti: number;
  jmlPort: number;
  statusProject: 'Take Out' | 'Done' | 'Drop' | 'Og Terminasi';
  issue: string;
  estimasiPoIndMateri: number;
  estimasiPoMaterial: number;
  estimasiPoSurveyMd: number;
  estimasiPoDeployJasa: number;
} 