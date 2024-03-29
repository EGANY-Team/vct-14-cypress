export default class AuthService {
  static async login(username, password) {
    const delay = Math.ceil(Math.random() * 2) * 1000;

    // fake network latency
    await new Promise(resolve => setTimeout(resolve, delay));

    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length === 0
    ) {
      throw new Error("Username must be non-empty string");
    }
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      throw new Error("Password must be non-empty string");
    }

    if (password !== "bananhthanh") {
      throw new Error("Incorrect username or password");
    }

    return {
      user: {
        displayName: username.trim().toUpperCase()
      },
      token: "người đã đến vui đấy nhưng rồi cũng đi"
    };
  }
}
