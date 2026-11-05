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


func printArr2(Arr []int) {
	//_匿名变量，不关心，只关心返回的v
	for _, v := range Arr {
		fmt.Println("v=", v)
	}
	Arr [0]= 100
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


    //动态数组
	fmt.Println("====== 动态数组 ======")
	arr3:=[]int{1,2,3,4}
	fmt.Printf("type is %T\n",arr3)
	printArr2(arr3)
	//切片传递
	fmt.Println("====== 动态数组切片传递 ======")
	for _, v := range arr3 {
		fmt.Println("v=", v)
	}
    //声名slice1是切片，并初始化，slice2是切片但并未初始化，未分配空间，若赋值slice2[0]=1会报错
	slice1 := []int{1, 2, 3, 4}
	var slice2 []int
	//开辟空间默认值为0
	slice2 = make([]int, 10)
	fmt.Printf("len=%d,slece=%v\n",len(slice1), slice1)
	fmt.Printf("len=%d,slece=%v\n",len(slice2), slice2)
	if slice1 == nil {
		fmt.Println("slice1是nil")
	} else {
		fmt.Println("slice1不是nil")
	}
}
