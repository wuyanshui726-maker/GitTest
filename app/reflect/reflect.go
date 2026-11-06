package main
import (
	"fmt"
	"reflect"
)

type User struct {
	Name string
	Age  int
	Id   int
}

func reflectNum(arg interface{}) {
	fmt.Println("value:", reflect.ValueOf(arg))
	fmt.Println("type:", reflect.TypeOf(arg))
}
func main() {
	var num int = 100
	reflectNum(num)
    user:=User{"li5",45,250123}
	FieldMethod(user)
}
func (t *User) Call(){
	fmt.Println("User is called")
	fmt.Printf("%v\n", t)
}

func FieldMethod(input interface{}) {
	//获取input的类型
	inputType := reflect.TypeOf(input)
	fmt.Println("inputType:", inputType.Name())
	//inputType.Name()仅返回类型标识符User，若是fmt.Println("inputType:", inputType)则返回的还有包名main.User
	inputValue := reflect.ValueOf(input)
	fmt.Println("inputValue:", inputValue)

    //通过type获取里面的字段
	//1.获取interface的reflect.Type,通过Type得到NumField,进行遍历
	//2.得到每个field的数据类型
	//3.通过field有一个Interface()方法得到对应的value
	for i:=0;i<inputNumField();i++{
		field:=inputType.Field(i)
		value:=inputValue.Field(i).Interface()
		fmt.Printf("%s:%v=%v\n",field.Name,field.Type,value)
	}

	//通过type获取里面的方法并调用
	for i:=0;i<inputNumMethod();i++{
		m:=inputType.Method(i)
		fmt.printf("%s:%v\n",m.Name,m.Type)
	}

}