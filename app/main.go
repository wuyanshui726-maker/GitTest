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

	//切片追加
	fmt.Println("====== 切片追加 ======")
    //切片长度len=3和容量cap=5，长度是已经有的元素，现在numbers为{0，0，0}
	var numbers = make([]int, 3, 5)
    fmt.Printf("len=%d,cap=%d,slice=%v\n", len(numbers), cap(numbers), numbers)
    //向numbers切片中添加元素1,2,3,4，3个元素已经有了，添加4个元素后，超过了容量5，所以会重新分配内存，容量变为10,扩容一倍
	numbers = append(numbers, 1, 2, 3, 4)
    fmt.Printf("len=%d,cap=%d,slice=%v\n", len(numbers), cap(numbers), numbers)
    numbers = append(numbers, 5)    
	fmt.Printf("len=%d,cap=%d,slice=%v\n", len(numbers), cap(numbers), numbers)
    numbers = append(numbers, 6)
    fmt.Printf("len=%d,cap=%d,slice=%v\n", len(numbers), cap(numbers), numbers)

	//切片截取,s2:=s:[start:end],左闭右开,从start到end-1的元素，如果s2:=s:[:]则表示截取整个切片
	fmt.Println("====== 切片截取 ======")
	s:= []int{1, 2, 3, 4, 5}
	s1 := s[2:4] //截取索引2到4的元素，左闭右开
	fmt.Printf("s1=%v\n", s1)
	//切片copy,copy(dst,src),把src的元素复制到dst中，返回复制的元素个数，dst和src可以是不同长度的切片，复制的元素个数为min(len(dst),len(src))
	fmt.Println("====== 切片copy ======")
	dst := make([]int, 5)
	src := []int{1, 2, 3}
	n := copy(dst, src)
	fmt.Printf("dst=%v,src=%v,n=%d\n", dst, src, n)
	
	//map是哈希表，无序的，且key是唯一的，value可以重复
	fmt.Println("====== map ======")
	//声明map1是map类型，在这还没分配空间用不了，key是string类型，value是string类型
	var map1 map[string]string
	map1 = make(map[string]string,10)//分配空间，容量为10
	map1["name"] = "张三"
	map1["age"] = "18"
	map1["number"] = "2024337621321"
	map1["address"] = "北京市"
	map1["id"] = "250" 
	fmt.Printf("map1=%v\n", map1)
	//声明map2是map类型，key是string类型，value是int类型，并初始化
	map2 := map[string]int{"a": 1, "b": 2}
	fmt.Printf("map2=%v\n", map2)
	//删除map中的元素，delete(map, key)
	delete(map1, "age")
	fmt.Printf("删除后map1=%v\n", map1)

	//遍历map，for key, value := range map
	for k, v := range map2 {
		fmt.Printf("key=%s,value=%d\n", k, v)
	}
}
