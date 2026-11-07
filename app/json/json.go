package main
import (
	"fmt"
	"encoding/json"
)
type Movie struct{
	Title string `json:"title"`
	Year int `json:"year"`
	Price int `json:"rmb"`
	Actors []string `"json:actors"`
}
func main(){
	m:=Movie{"奔跑吧",2016,10,[]string{"dengchao","zhengkai"}}
	
	//编码的过程，结构体--->json
	jsonstr,err:=json.Marshal(m)
	if err!=nil{
		fmt.Println("json marshal error",err)
		return
	}
	fmt.Printf("jsonstr=%s\n",jsonstr)
    
	//解码的过程，json--->结构体
	//jsonstr={"title":"奔跑吧","year":2016,"rmb":10,"actors":["dengchao","zhengkai"]}
    m2:=Movie{}
	err=json.Unmarshal(jsonstr,&m2)
	if err!=nil{
		fmt.Println("json unmarshal error",err)
		return
	}
	fmt.Printf("%v\n",m2)
}