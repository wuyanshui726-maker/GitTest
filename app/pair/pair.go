package main
import (
	"fmt"
)

type Reader interface {
	ReadBook()
}

type Writer interface {
	WriteBook()
}

type Book struct {
}

func (c *Book) ReadBook() {
	fmt.Println("ReadBook")
}

func (c *Book) WriteBook() {
	fmt.Println("WriteBook")
}

func main() {
	//pair<type:string,value:"hello">
	var a string = "hello"
	var b interface{} = a //将string类型赋值给interface{}类型
	fmt.Println("b:", b)
	v1,_ := b.(string) //类型断言
	fmt.Println("v1:", v1)
	//c: pair<type:Book,value:Book{}地址>  Book类型的指针
	c:= &Book{}
	//d: pair<type:Reader,value:Book{}地址>  Reader接口类型的指针
    var d Reader = c //将Book类型的指针赋值给Reader接口类型
	fmt.Println("d:", d)
	var e Writer = c //将Book类型的指针赋值给Writer接口类型
	fmt.Println("e:", e)

}