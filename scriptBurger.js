let burgerShopName =[]
let burgerData = []
let burgerQueenData = []
let burgerKingData = []
let shopNameFilter= []
var selectedRow = null





fetch('/data.json')
.then((response) =>{
  return response.json() 
})
.then((json) => {
burgerData = json
burgerKingData = json[0].foodItems
burgerQueenData = json[1].foodItems
shopNameFilter = json[0].foodItems
setShopName(json)
setProductTable(json[0].foodItems)
setFilterProduct(json)
})



function setShopName (json){
let shopName = document.getElementById("shopName")
shopName.innerHTML=""


    json.forEach(item => {
        burgerShopName.push(item.restaurant)
     });   

     burgerShopName.forEach((items, index) =>{
        if(index == 0) {
            shopName.innerHTML += `<option value='${0}' selected> ${items}</option>`
        }else {
            shopName.innerHTML += `<option value='${1}'>${items}</option>`
        }      
     })

     shopName.onchange=nameChange

}


function nameChange(e){
    e.preventDefault()

if(e.target.value == 0){
    shopNameFilter = burgerKingData
}
else{
    shopNameFilter = burgerQueenData
}

setProductTable(shopNameFilter)
}




function setFilterProduct (json){
    let filterP = document.getElementById("filterProduct")
    filterP.onchange=filterChange
   
    }


    function filterChange(e){
        e.preventDefault()
    let productFilter = shopNameFilter
if(e.target.value==0){
    productFilter = shopNameFilter
}
else if(e.target.value==1){
    productFilter = shopNameFilter.filter(ele=>{
        return ele.foodType=="Burger"
    })}

    else if(e.target.value==2){
        productFilter = shopNameFilter.filter(ele=>{
            return ele.foodType=="Chicken"
        })   
}
else{
    productFilter = shopNameFilter.filter(ele=>{
        return !ele.foodType
    })   
}
setProductTable(productFilter)
}


        

        

// Set ตารางเมนูสินค้า

function setProductTable(items){
    let tbody = document.getElementById("menuList")
    tbody.innerHTML=""

    items.forEach((item,index)=>{
    let foodType = (item.foodType)? item.foodType:"Other"
    let foodDetail = (item.correctedTerm)? item.correctedTerm:""


        tbody.innerHTML +=   `<tr class="text-center border-collapse: separate"  style= background-color:#e2dfd7 >

        <td class="checkStyle"> <input type="checkbox" class="custom-control-input" id="customCheck2"> </td>
        
        <td class="text-start menuList "> ${item.foodName} <br> <span style="color: rgb(170, 86, 17); font-size: 13px;">${foodDetail}</span>
        </td>

        <td > ${foodType} </td>
        <td > ${item.price} </td>
        <td > <a href="#">  <img src="/public/edit.svg" style="width: 30px;"></a>
           <a href="#"> <img src="/public/delete.svg" style="width: 30px;"> </a>             
        </td>
      </tr> `
    })

}
function closeAdd(){
    document.getElementById("popupAdd").classList.add("closePopup")
}

function showAdd(){
    document.getElementById("popupAdd").classList.remove("closePopup")
}



function submitAdd() { 
        var formData = readFormData();
        shopNameFilter.push(formData)
    
}


function checkbox() { 
    console.log(formData)
}

function readFormData() {
    var formData = {};
    formData["foodName"] = document.getElementById("NameMenu").value;
    formData["foodType"] = document.getElementById("price").value;
    formData["price"] = document.getElementById("productType").value;
    return formData;
}
