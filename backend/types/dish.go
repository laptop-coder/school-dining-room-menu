package types

type Dish struct {
	DishId          string
	DishCategory    string
	DishName        string
	DishDescription string
	DishAvailable   int
}

type DishTVMenu struct {
	DishCategory string
	DishName     string
}
