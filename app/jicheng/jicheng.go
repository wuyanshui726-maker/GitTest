package main

import (
	"fmt"
)
type Human struct {
	Name string
	Sex string
	Age int
}
func (t *Human) Eat() {
	fmt.Println("人吃饭")
}
func (t *Human) Walk() {
	fmt.Println("人走路")
}

type SuperMan struct {
	Human//SuperMan类继承Human类的属性和方法
	level int
	FlySpeed int
}
//重新定义父类Human的方法Eat()
func (t *SuperMan) Eat() {
	fmt.Println("超人吃饭")
}

//定义子类SuperMan的新的方法Fly()
func (t *SuperMan) Fly() {
	fmt.Println("超人飞行")
}


func (t *SuperMan) Show() {
	fmt.Println("Name = ", t.Name)
	fmt.Println("Sex = ", t.Sex)
	fmt.Println("Age = ", t.Age)
	fmt.Println("level = ", t.level)
}

func main() {
	h:= Human{Name: "张三", Sex: "男", Age: 20}
	h.Eat()
	h.Walk()
    //定义子类SuperMan的对象s，并初始化父类Human的属性
	s:= SuperMan{Human: h, level: 10}
	s.Eat()
	s.Walk()
	s.Fly()
	s.Show()
}