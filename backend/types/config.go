package types

type AppConfig struct {
	DevMode string
}

type DBConfig struct {
	PathTo string
}

type EnvConfig struct {
	PathTo string
}

type LogsConfig struct {
	PathToBackend string
}

type SSLConfig struct {
	PathToCert string
	PathToKey  string
}

type StorageConfig struct {
	PathTo string
}

type Config struct {
	App     AppConfig
	DB      DBConfig
	Env     EnvConfig
	Logs    LogsConfig
	SSL     SSLConfig
	Storage StorageConfig
}
