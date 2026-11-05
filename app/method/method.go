package main

import "fmt"
//如果类名首字母大写，则是公有的，其他包可以访问
type Hero struct {
	// Name、Ad、Level 首字母大写，外部包可以访问，否则只能在当前包访问
	Name  string
	Ad    int
	Level int
}



/*
// 值接收者版本：拿到的是对象的副本，SetName 改不掉原对象
func (t Hero) Show() {
	fmt.Println("Name = ", t.Name)
	fmt.Println("Ad = ", t.Ad)
	fmt.Println("Level = ", t.Level)
}

func (t Hero) GetName() string {
	return t.Name
}

func (t Hero) SetName(newName string) {
	// t 是调用该方法的对象的一个副本（拷贝）
	t.Name = newName
}
*/



// Show 打印 Hero 的字段
func (t *Hero) Show() {
	fmt.Println("Name = ", t.Name)
	fmt.Println("Ad = ", t.Ad)
	fmt.Println("Level = ", t.Level)
}

func (t *Hero) GetName() string {
	return t.Name
}

func (t *Hero) SetName(newName string) {
	// t 是指向调用对象的指针，修改会影响原对象
	t.Name = newName
}


func main() {
	// 创建一个对象
	hero := Hero{Name: "zhang3", Ad: 100, Level: 1}

	hero.Show()

	hero.SetName("li4")

	hero.Show()
}
