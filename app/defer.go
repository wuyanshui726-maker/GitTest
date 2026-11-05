package main
import "fmt"

func f1() {
	fmt.Println("a")
}
func f2() {
	fmt.Println("b")
}
func f3() {
	fmt.Println("c")
}
func main() {
    defer f1()
	defer f2()
	defer f3()
}