import bcrypt from "bcrypt";

// Hash password
const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// Compare plain password with hashed password
const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

export { hashPassword, comparePassword };
