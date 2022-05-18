let productName = document.getElementById('productName')
let productPrice = document.getElementById('productPrice')
let productCategory = document.getElementById('productCategory')
let productDesc = document.getElementById('productDesc')
let addbtn = document.getElementById('addBtn')
let Products ;
let currentindex=0
if (localStorage.getItem('productsList')==null){
Products=[]
}else{
    Products=JSON.parse(localStorage.getItem('productsList'))
    display()
}
addBtn.onclick=function()
{
  if(addBtn.innerHTML=="add product") //add mode
  {
    addProduct();
  }
  else{   //update mode
    updateProduct()
  }

  display();
  clear()
}
function addProduct (){
    let Product ={
        Name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }
    Products.push(Product)
    localStorage.setItem("productsList",JSON.stringify(Products))
    clear()
    display()
    console.log(Products)
}

function clear(){
    productName.value =""
    productPrice.value =""
    productCategory.value =""
    productDesc.value =""
}
function display(){
    var cartona =""
    for(var i=0;i<Products.length;i++ ){
     
            cartona+=`<tr>
                        <td>${Products[i].Name}</td>
                        <td>${Products[i].price}</td>
                        <td>${Products[i].category}</td>
                        <td>${Products[i].desc}</td>
                        <td><button onclick="deleteProduct(${i})"  class='btn btn-danger'>delete</button></td>
                        <td><button onclick="getproductinfo(${i})" class='btn btn-warning'>update</button></td>
                      </tr>`
          }
          document.getElementById("tableBody").innerHTML=cartona

    }
    function deleteProduct(index){
    Products.splice(index,1)
    localStorage.setItem("productsList",JSON.stringify(Products))

        display()
    }
    function search(searchTxt){
        var cartona= ''
        for( var i =0;i<Products.length;i++){
          if(Products[i].Name.toLowerCase().includes(searchTxt.toLowerCase())){
            cartona+=`<tr>
            <td>${Products[i].Name}</td>
            <td>${Products[i].price}</td>
            <td>${Products[i].category}</td>
            <td>${Products[i].desc}</td>
            <td><button onclick="deleteProduct(${i})"  class='btn btn-danger'>delete</button></td>
            <td><button class='btn btn-warning'>update</button></td>
          </tr>`
}
document.getElementById("tableBody").innerHTML=cartona
          
        }
    }
    function getproductinfo(index){

         currentindex =index
        let product =Products[index]
        productName.value =product.Name
        productPrice.value = product.price
        productCategory.value =product.category
        productDesc.value =product.desc
        addbtn.innerHTML='update Product'

    }
  
    function updateProduct(){
        let Product ={
            Name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            desc:productDesc.value,
        }
        Products[currentindex].Name=Product.Name
        Products[currentindex].price=Product.price
        Products[currentindex].category=Product.category
        Products[currentindex].desc=Product.desc
        localStorage.setItem("productsList",JSON.stringify(Products))
        display()
    }

    var nameAlert=document.getElementById("nameAlert");

    productName.onkeyup=function(){
      var nameRejex=/^[A-Z][a-z]{2,8}$/;
      if(nameRejex.test(productName.value)) //7lw(valid)
      {
         addBtn.removeAttribute("disabled") ; 
         productName.classList.add("is-valid");
         productName.classList.remove("is-invalid");
         productName.classList.remove("disabled");
         nameAlert.classList.add("d-none")
    
      }
      else                 //w74(in-valid)
      {
         addBtn.disabled="true";
         productName.classList.add("is-invalid");
         productName.classList.remove("is-valid");
         nameAlert.classList.remove("d-none")
      }
    }
    