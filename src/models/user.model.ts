export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export type CreateUserModel = Omit<
  UserModel,
  'id' | 'created_at' | 'updated_at'
>;

export type UpdateUserModel = Partial<CreateUserModel>;
