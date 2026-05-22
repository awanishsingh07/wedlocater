export const authService = {
  register: async (data) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Registration successful", user: data } });
      }, 1500);
    });
  },
  login: async (credentials) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Login successful" } });
      }, 1500);
    });
  }
};
