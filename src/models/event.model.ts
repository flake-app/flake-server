export interface EventModel {
  id: number;
  created_by: number;
  event_name: string;
  description?: string;
  start_name: Date;
  end_time?: Date;
  status: 'ONGOING' | 'CANCELLED' | 'COMPLETED' | 'FLAKED';
  created_at: Date;
  updated_at: Date;
}

export type CreateEventModel = Omit<
  EventModel,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdateEventModel = Partial<CreateEventModel>;
