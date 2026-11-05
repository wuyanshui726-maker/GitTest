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

// DeferDemo 演示 defer 压栈先进后出
func DeferDemo() {
	defer f1()
	defer f2()
	defer f3()
	fmt.Println("--- defer 示例开始 ---")
}
