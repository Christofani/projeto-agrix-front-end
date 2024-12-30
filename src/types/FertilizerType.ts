export interface Fertilizer {
  id: number;
  name: string;
  brand: string;
  composition: string;
}

export interface CreateFertilizerType {
  name: string;
  brand: string;
  composition: string;
}

export interface FertilizerDetailsProps {
  fertilizerId?: number;
  onBack: () => void;
}

export interface CreateFertilizerProps {
  onCancel?: () => void;
}

export interface FertilizerListProps {
  onNavigate: (fertilizerId: number) => void;
}