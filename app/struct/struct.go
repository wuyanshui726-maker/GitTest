package main
import "fmt"

type myint int

type Book struct {
	Name string
	Author string
	Price float64
}

func changeBook(book Book) {
	//传递的是副本，book.Name的修改不会影响main函数中的book1
	book.Name = "C语言"
}

func changeBook2(book *Book) {
	//传递的是指针，book.Name的修改会影响main函数中的book1
	book.Name = "C语言"
}

func main() {
	var book1 Book
	book1.Name = "Go语言"
	book1.Author = "张三"
	book1.Price = 99.9
	fmt.Printf("Book1: %+v\n", book1)
	changeBook(book1)
	fmt.Printf("Book1: %+v\n", book1)
	changeBook2(&book1)
	fmt.Printf("Book1: %+v\n", book1)
}