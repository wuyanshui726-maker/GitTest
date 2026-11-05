package main

import "fmt"

func f1() {
	fmt.Println("  [defer] f1 执行")
}
func f2() {
	fmt.Println("  [defer] f2 执行")
}
func f3() {
	fmt.Println("  [defer] f3 执行")
}

// DeferDemo 验证：defer 在 return 之后才执行
// 并且是先进后出（栈结构）
func DeferDemo() string {
	fmt.Println("1. 注册 defer f1")
	defer f1()
	fmt.Println("2. 注册 defer f2")
	defer f2()
	fmt.Println("3. 注册 defer f3")
	defer f3()

	fmt.Println("4. 准备 return")
	return "我是返回值" // ← return 语句先执行
	// 然后才依次弹出 defer 执行
}

// TestDefer 独立运行入口

