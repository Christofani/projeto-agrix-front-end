 export interface ApiError {
  message: string;
  status?: number; // Opcional: Inclua se o back-end retorna um código de status
  timestamp?: string; // Opcional: Inclua se o back-end retorna um timestamp
}
