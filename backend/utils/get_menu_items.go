package utils

import (
	. "backend/database"
	"backend/types"
)

// TODO: maybe add other code to get menu items here, in one place (file)
func GetMenuItemsTV() ([]types.DishTVMenu, error) {
	rows, err := DB.Query("SELECT dish_category, dish_name FROM dish ORDER BY dish_name;")
	if err != nil {
		return nil, err
	}
	defer rows.Close() // TODO: make in other places like here
	var items []types.DishTVMenu
	for rows.Next() {
		var item types.DishTVMenu
		err := rows.Scan(&item.DishCategory, &item.DishName)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}
