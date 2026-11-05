package main

import (
	"fmt"

	"GitTest/app/lib1"
	"GitTest/app/lib2"
)
//传参
func printArr(Arr [8]int) {
	fmt.Println("传参")
}

func main() {
	lib1.Lib1test()
	lib2.Lib2test()
	fmt.Println("=== 开始测试 defer 与 return 的顺序 ===")
	result := DeferDemo()
	fmt.Println("5. main 收到返回值:", result)
	fmt.Println("=== 结束 ===")

    //数组
	var arr1 [10]int
	arr2 := [8] int{1,2,3,4}
	for i := 0; i < len(arr1); i++ {
		fmt.Println(arr1[i])
	}
	for i, v := range arr2 {
		fmt.Println("序号:", i, "值:", v)
	}
	//查看数据类型
	fmt.Printf("arr1的类型是:%T\n", arr1)
	fmt.Printf("arr2的类型是:%T\n", arr2)

    //printArr(arr1) //报错：cannot use arr1 (variable of type [10]int) as [8]int value in argument to
	printArr(arr2)
}
