export const mockDb = {
  users: [
    { id: "1", first_name: "John", last_name: "Doe", email: "john.doe@example.com", hashed_pw: "hashedpassword", created_at: new Date(), updated_at: new Date() },
  ],

  // Simulating select all users operation
  async select(table: string) {
    if (table === 'users') {
      return this.users;
    }
    return [];
  },

  // Simulating insert user operation
  async insert(table: string, user: any) {
    if (table === 'users') {
      const newUser = { id: (this.users.length + 1).toString(), ...user, created_at: new Date(), updated_at: new Date() };
      this.users.push(newUser);
      return newUser;
    }
    return null;
  },

  // Simulating find user by id
  async find(table: string, id: string) {
    if (table === 'users') {
      return this.users.find(user => user.id === id) || null;
    }
    return null;
  },

  // Simulating delete user operation
  async delete(table: string, id: string) {
    if (table === 'users') {
      const index = this.users.findIndex(user => user.id === id);
      if (index !== -1) {
        this.users.splice(index, 1);
        return true;
      }
    }
    return false;
  },

  // Simulating update user operation
  async update(table: string, id: string, newData: any) {
    if (table === 'users') {
      const userIndex = this.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        this.users[userIndex] = { ...this.users[userIndex], ...newData, updated_at: new Date() };
        return this.users[userIndex];
      }
    }
    return null;
  }
};
