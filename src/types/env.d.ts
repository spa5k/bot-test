declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ProcessEnv {
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    GUILD_ID: string;
    PREFIX: string;
    DATABASE_URL: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    GIPHY_API_KEY: string;
  }
}
