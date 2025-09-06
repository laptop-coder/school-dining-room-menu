package database

import (
	. "backend/config"
	. "backend/logger"
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
)

var initialQueries = `
CREATE TABLE IF NOT EXISTS dish (
    dish_id VARCHAR(36) PRIMARY KEY,
	dish_category VARCHAR(36) NOT NULL,
    dish_name TEXT NOT NULL,
    dish_description TEXT NOT NULL,
    dish_available INTEGER NOT NULL DEFAULT 1,
	FOREIGN KEY(dish_category) REFERENCES category(category_name)
);

CREATE TABLE IF NOT EXISTS category (
    category_name VARCHAR(36) PRIMARY KEY
);
`

func initDB() *sql.DB {
	db, err := sql.Open("sqlite3", Cfg.DB.PathTo)
	if err != nil {
		Logger.Error("Error. Can't open database file: " + err.Error())
		return nil
	} else {
		Logger.Info("The database file is open")
	}
	if err := db.Ping(); err != nil {
		Logger.Error("Error. Can't connect to the database: " + err.Error())
		return nil
	} else {
		Logger.Info("Pinged successfully. Can connect to the database")
	}
	if _, err := db.Exec(initialQueries); err != nil {
		Logger.Error("Error in running initial SQL queries")
		return nil
	} else {
		Logger.Info("Initial SQL queries completed")
	}

	return db
}

var DB = initDB()
