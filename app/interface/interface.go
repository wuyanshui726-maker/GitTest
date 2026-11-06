package main
import (
	"fmt"
)
//interface{}是万能类型，任何类型都可以赋值给interface{}类型的变量
func f1(manba interface{}) {
	fmt.Println("f1 is called with:", manba)
	fmt.Println(manba)
	//类型断言
	v, ok := manba.(string)
	if ok {
		fmt.Println("manba is a string:", v)
	} else {
		fmt.Println("manba is not a string")
	}
}

type Book struct {
	Title  string
	Author string
	Price  float64
}

type English struct {
	Letter string
}

func main() {
	book1 := Book{"golong", "li4", 39.9}
	english1 := English{"A"}
	f1(book1)
	f1(english1)
	f1(english1.Letter)
}