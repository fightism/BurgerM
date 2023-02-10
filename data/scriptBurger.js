let allBurgerData = [];
let burgerShopName = [];

let filterBurger= []
let typeValue = ''

let shopName = document.getElementById("shopName");
let tbody =document.getElementById("menuList")

let popup = document.getElementById("popupAdd");
let popupEdit = document.getElementById("popupEdit")
let formEdit = document.getElementById("formEdit")

let burgerType = document.getElementById("filterProduct")
burgerType.onchange = typeChange


fetch("data/data.json")
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    allBurgerData = json;
    setShopName(allBurgerData);
    setTable(shopName.value)
  });



function setShopName(allBurgerData) {
  shopName.innerHTML = "";

  allBurgerData.forEach((element) => {
    burgerShopName.push(element.restaurant);
  });

  burgerShopName.forEach((element, index) => {
    if (index == 0) {
      shopName.innerHTML += `<option value='${0}' selected> ${element}</option>`;
    } else {
      shopName.innerHTML += `<option value='${1}'>${element}</option>`;
    }
  })
  shopName.onchange = nameChange
  
}

function nameChange(e){

setTable(e.target.value)

}


 


function setTable(shopNameValue){
tbody.innerHTML=""


filterBurger = allBurgerData[shopNameValue].foodItems.filter(ele=>{
  
  if(typeValue==0){
    return ele
  }
  else if(typeValue==1){
    return ele.foodType=='Burger'
  }
  else if(typeValue==2){
    return ele.foodType=='Chicken'
  }
  else if(typeValue==3){
    return ele.foodType==null
  
  }
  
})

filterBurger.forEach((item,index)=>{  
    let foodType = (item.foodType)? item.foodType:"Other"
    let foodDetail = (item.correctedTerm)? item.correctedTerm:""
    let items = JSON.stringify(item)
    tbody.innerHTML+=

    `<tr key="${index}" class="text-center border-collapse: separate"  style= background-color:#e2dfd7 >

        <td class="checkStyle"> <input type="checkbox" class="custom-control-input" id="customCheck2"  value='${index}' name="checkBox" > </td>

        <td class="text-start menuList "> ${item.foodName} <br> <span style="color: rgb(170, 86, 17); font-size: 13px;">${foodDetail}</span>
        </td>

        <td > ${foodType} </td>
        <td > ${item.price} </td>
        <td > <a href="#" onclick='showEdit(${items},${index})'>  <img src="/public/edit.svg" style="width: 30px;"></a> 
           <a href="#"  onclick="removeData(${index})"> <img src="/public/delete.svg" style="width: 30px;"> </a>
        </td>
      </tr> `

})}







    function typeChange(e){
        
        if(e.target.value==0)
        {
          typeValue = 0
        }
        else if(e.target.value==1)
        {
          typeValue = 1
        }
        else if(e.target.value==2)
        {
          typeValue = 2
        }
        else if(e.target.value==3)
        {
          typeValue = 3
        }

        setTable(shopName.value)
    }


function showAdd(){
  popup.classList.remove("closePopup");
}

function closeAdd()
{
  popup.classList.add("closePopup");
  popupEdit.classList.add("closePopup");
}

function showEdit(e,index){
  popupEdit.classList.remove("closePopup");
  let foodTypeEdit = (e.foodType)? e.foodType:"Other"
  let foodDetailEdit = (e.correctedTerm)? e.correctedTerm:""

  formEdit.key=index
  formEdit.editNameMenu.value = e.foodName
  formEdit.editDetailMenu.value = foodDetailEdit
  formEdit.editPriceMenu.value = e.price
  formEdit.edittypeMenu.value = foodTypeEdit
  
}

function closeEdit()
{
  popupEdit.classList.add("closePopup");
}

function submitEdit(e){
const foodName = e.editNameMenu.value
const correctedTerm = e.editDetailMenu.value
const price = e.editPriceMenu.value
const foodType = e.edittypeMenu.value

const dataEdit = {
  foodName,
  price,
  foodType,
  correctedTerm
}

allBurgerData[shopName.value].foodItems[e.key] = dataEdit
setTable(shopName.value)
closeAdd()
}





function submitAdd(e){
  const foodName = e.nameMenu.value
  const correctedTerm = e.detailMenu.value
  const price = e.priceMenu.value
  const foodType = e.typeMenu.value

  const data = {
    foodName,
    price,
    foodType,
    correctedTerm
  }

  allBurgerData[shopName.value].foodItems.push(data)
  setTable(shopName.value)
  e.nameMenu.value=''
  e.priceMenu.value=''
  e.typeMenu.value=''
  closeAdd()
}



function checkbox() {
    console.log(tbody)
}


function removeData(e){
  allBurgerData[shopName.value].foodItems.splice(e,1)
  setTable(shopName.value)
}