package main

import (
	"fmt"

	"GitTest/app/lib1"
	"GitTest/app/lib2"
)

func main() {
	lib1.Lib1test()
	lib2.Lib2test()
	fmt.Println("=== 开始测试 defer 与 return 的顺序 ===")
	result := DeferDemo()
	fmt.Println("5. main 收到返回值:", result)
	fmt.Println("=== 结束 ===")
}
