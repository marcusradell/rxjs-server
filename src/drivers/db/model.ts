import { IDb } from "./types";

export class Db implements IDb {
  private state: {
    users: Array<{ name: string; password: string }>;
    online_statuses: Array<{ name: string; status: string }>;
  };

  constructor() {
    this.state = {
      users: [
        { name: "moa", password: "password1" },
        { name: "marcus", password: "password2" }
      ],
      online_statuses: [
        { name: "moa", status: "logged_out" },
        { name: "marcus", status: "logged_out" }
      ]
    };
  }

  public none(query: string, v: any[]): Promise<any> {
    if (query.includes("users")) {
      this.state.users
        .filter(dbRow => dbRow.name === v[1])
        .forEach(dbRow => (dbRow.name = v[0]));
    } else {
      this.state.online_statuses
        .filter(dbRow => dbRow.name === v[1])
        .forEach(dbRow => (dbRow.status = v[0]));
    }

    return Promise.resolve(null);
  }

  public one(query: string, v: any[]): Promise<any> {
    if (query.includes("users")) {
      return Promise.resolve(
        this.state.users.filter(dbRow => dbRow.name === v[1])[0]
      );
    } else {
      return Promise.resolve(
        this.state.online_statuses.filter(dbRow => dbRow.name === v[1])[0]
      );
    }
  }

  public getState() {
    return this.state;
  }
}
