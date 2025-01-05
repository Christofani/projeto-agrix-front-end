import { Crop } from "./CropType";
import { PersonInfoDto } from "./PersonType";

export interface Farm {
  id: number;
  name: string;
  size: number;
  crops: Crop[];
  person: PersonInfoDto;
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
  onCancel: () => void;
}

export interface FarmListProps {
  onNavigate: (farmId?: number) => void;
}