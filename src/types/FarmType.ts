export interface Farm {
  id: number;
  name: string;
  size: number;
}

export interface CreateFarm {
  name: string;
  size: number;
}

export interface FarmDetailsProps {
  farmId: number;
  onBack: () => void;
}

export interface CreateFarmProps {
  onCancel?: () => void; // Função para cancelar
}

export interface FarmListProps {
  onNavigate: (farmId: number) => void;
}