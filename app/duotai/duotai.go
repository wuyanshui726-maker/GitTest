package main

import (
	"fmt"
)
// AnimalIF 定义一个接口(本质指针)
type AnimalIF interface {
	Sleep()
	GetColor() string//获取颜色
	GetType() string//获取类型
}
// Cat 定义一个猫类
type Cat struct {
	Color string
}
func (c *Cat) Sleep() {
	fmt.Println("Cat Sleep")
}
func (c *Cat) GetColor() string {
	return c.Color
}
func (c *Cat) GetType() string {
	return "Cat"
}
type Dog struct {
	Color string
}
func (d *Dog) Sleep() {
	fmt.Println("Dog Sleep")
}
func (d *Dog) GetColor() string {
	return d.Color
}
func (d *Dog) GetType() string {
	return "Dog"
}

func showAnimal(animal AnimalIF) {
	animal.Sleep()
	fmt.Println("Color:", animal.GetColor())
	fmt.Println("Type:", animal.GetType())
}

func main() {
	var animal AnimalIF  //定义一个接口类型的变量，父类的指针可以指向子类的对象
	animal = &Cat{Color: "Black"}
	animal.Sleep()//调用子类Cat的Sleep方法,多态的现象
	fmt.Println("Color:", animal.GetColor())
	fmt.Println("Type:", animal.GetType())
	animal = &Dog{Color: "White"}
	animal.Sleep()//调用子类Dog的Sleep方法
	fmt.Println("Color:", animal.GetColor())
	fmt.Println("Type:", animal.GetType())
	println("==================================")
	cat := &Cat{Color: "Red"}
	dog := &Dog{Color: "Blue"}
	showAnimal(cat)
	showAnimal(dog)
}