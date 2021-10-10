var productName= document.getElementById("name");
var productPrice= document.getElementById("price");
var productCategory= document.getElementById("category");
var productDesc= document.getElementById("desc");
var updateIndex;
if(localStorage.getItem("productList")==null){
   var productContainer=[];
}
else{
    productContainer=JSON.parse(localStorage.getItem("productList"));
    displayAllProducts();
}


function addProduct(){
    var product= {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    }

    if(!validateProduct(product)){
        return;
    }
    productContainer.push(product);
    clearForm();
    localStorage.setItem("productList",JSON.stringify(productContainer));
    console.log(productContainer);
    displayProduct(product,productContainer.length-1);

}
function validateProduct(product){
    // alert("validation");
    let nameRegex=/^[A-Za-z]{3,}$/;
    let priceRegex=/^[1-9][0-9]*$/;
    let categoryRegex=/^[A-Za-z]{1,50}$/;
    let validForm=true;
    
    // alert(priceRegex.test(product.price));
    if(!nameRegex.test(product.name)){
        // alert("in Name");
        document.getElementById( "invalidName").innerHTML="invalid name ";
        validForm= false;
    }else {
        document.getElementById( "invalidName").innerHTML="";
    }
    if(!priceRegex.test(product.price)){
        // alert("in price")
        document.getElementById( "invalidPrice").innerHTML="invalid price ";
        validForm= false;
    }else {
        document.getElementById( "invalidPrice").innerHTML="";    }
    if(!categoryRegex.test(product.category)){
        // alert("in category")
        document.getElementById( "invalidCate").innerHTML="invalid category Name";
        validForm= false;
    }else {
        document.getElementById( "invalidCate").innerHTML="";
    }
 
    
return validForm;
}
function clearForm(){
    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDesc.value="";
}

function displayProduct(product,index){
    document.getElementById("tableBody").innerHTML+=`
    <tr class="my-4"> 
    <td>
      `+index+`
    </td>
    <td>`+product.name+`</td>
    <td>`+product.price+`</td>
    <td>`+product.category+`</td>
    <td>`+product.desc+`</td>
    <td><button class=" btn btn-outline-warning" onclick="updateButton(`+index+`)">Update</button></td>
    <td><button class=" btn btn-outline-danger" onclick="deleteProduct(`+index+`)">Delete</button></td>
</tr>`
}
// updateProduct(0);
function updateButton(index){
    // alert("hello");
    // console.log("Hello");
    productName.value= productContainer[index].name;    
    productPrice.value= productContainer[index].price;
    productCategory.value= productContainer[index].category;
    productDesc.value= productContainer[index].desc;
    document.getElementById("cancelButton").style="display: inline-block !important;";
    document.getElementById("addButton").disabled=true;

    
    document.getElementById("updateButton").style="display: inline-block !important; ";
    updateIndex=index;
    // console.log("Hello2");
}

function cancelUpdate (){
    document.getElementById("cancelButton").style="display: none;";

    document.getElementById("updateButton").style="display: none;";
    document.getElementById("addButton").disabled=false;

    updateIndex=null;
    clearForm();

}
 function updateProduct(){
    //  alert("Hello fOM UPDATE");
    productContainer[updateIndex].name=productName.value;
    productContainer[updateIndex].price=productPrice.value;
    productContainer[updateIndex].category=productCategory.value;
    productContainer[updateIndex].desc=productDesc.value ;
    localStorage.setItem("productList",JSON.stringify(productContainer));   
    clearForm();
    cancelUpdate();
    displayAllProducts();
 }
function displayAllProducts(){

    var cartoona='';
    document.getElementById("tableBody").innerHTML='';
    for(var i=0;i<productContainer.length;i++){
        displayProduct(productContainer[i], i);
    }
}


function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem("productList",JSON.stringify(productContainer));   
    displayAllProducts();
}

function searchProducts(temp){
    var cartoona='';
    for(var i=0;i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(temp.toLowerCase() )){
            var product=productContainer[i];
            cartoona+=`
    <tr class="my-4"> 
    <td>
      `+i+`
    </td>
    <td>`+product.name+`</td>
    <td>`+product.price+`</td>
    <td>`+product.category+`</td>
    <td>`+product.desc+`</td>
    <td><button class=" btn btn-outline-warning" onclick="updateButton(`+i+`)">Update</button></td>
    <td><button class=" btn btn-outline-danger" onclick="deleteProduct(`+i+`)">delete</button></td>
</tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=cartoona;

    
}