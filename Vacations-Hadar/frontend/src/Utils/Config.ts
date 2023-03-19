class Config { 
      public vacations = "";
      public followedVacations = "";
      public vacationsImages = "";
      public register = "";
      public login = "";
      public users = "";
      public addFollow = "";
      public removeFollow = "";
};

class DevelopmentConfig extends Config {
    public vacations = "http://localhost:3001/api/vacations/";
    public followedVacations = "http://localhost:3001/api/vacations/followed/";
    public vacationsImages = "http://localhost:3001/api/vacations/images/";
    public register = "http://localhost:3001/api/auth/register/";
    public login = "http://localhost:3001/api/auth/login/";
    public users = "http://localhost:3001/api/auth/users/";
    public addFollow = "http://localhost:3001/api/follows/add/";
    public removeFollow = "http://localhost:3001/api/follows/remove/";
};

class ProductionConfig extends Config {
    public vacations = "http://localhost:3001/api/vacations/";
    public followedVacations = "http://localhost:3001/api/vacations/followed/";
    public vacationsImages = "http://localhost:3001/api/vacations/images/";
    public register = "http://localhost:3001/api/auth/register/";
    public login = "http://localhost:3001/api/auth/login/";
    public users = "http://localhost:3001/api/auth/users/";
    public addFollow = "http://localhost:3001/api/follows/add/";
    public removeFollow = "http://localhost:3001/api/follows/remove/";
}

let config: Config;
process.env.NODE_ENV === "development" ? config = new DevelopmentConfig() : config = new ProductionConfig();

export default config;
