export interface UserEventModel {
  id: number;
  user_id: number;
  event_id: number;
  attending?: boolean;
  created_at: Date;
  updated_at: Date;
}

export type UpdateUserEventModel = Partial<UserEventModel>;
