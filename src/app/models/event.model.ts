export interface Event {
  id?: number; // Opcional, pois não estará presente na criação
  titulo: string;
  descricao: string;
  dataHora: string; // Usaremos string para LocalDateTime vindo do backend
  localizacao: string;
  apagado?: boolean; // Opcional, para o soft delete
  criadoEm?: string;
  modificadoEm?: string
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
