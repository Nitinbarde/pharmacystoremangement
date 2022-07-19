function productTable(data) {

  $("#productCount").text(data.length);
  
  var table = document.getElementById("productTable");
  $("#productTable tr").remove();

  
  for (i = 0; i <= data.length; i++) {
    if(data[i] == undefined){
      continue;
    }
    var row = `<tr>

        <td>${  data[i].id  }</td>

        <td>${  data[i].medicineName  }</td>
        
        <td>${  data[i].medicineBrand }</td>
        
        <td>${  data[i].expiryDate  }</td>
        
        <td>${  data[i].unitPrice }</td>
        
        <td>${  data[i].stock }</td>
        
        
        </tr>
        `;
    table.innerHTML += row;
  }
}

//login functionality

var products = [];
var filteredArray = [];

$(document).ready(function () {
  const loggedInUser = localStorage.getItem("User");
  if (!loggedInUser) {
    window.location.href = "index.html";
  }

  getProducts();

  $("input[type='checkbox']").change(function () {
  const controlName = $(this).attr("name");
  const isChecked = $(this).is(":checked");

  var filteredLength = 0;
  var filteredProducts = [];
  
  var currentDate = new Date();

  if(controlName === 'expired') {
    filteredLength = filteredArray.filter(x => new Date(x.expiryDate) < currentDate).length;
    filteredProducts = products.filter(x => new Date(x.expiryDate) < currentDate);
  }

  else if(controlName === 'lowStock') {
    filteredLength = filteredArray.filter(x => x.stock < 100).length;
    filteredProducts = products.filter(x => x.stock < 100);
  }


  if (isChecked) {
    for (var i = 0; i < filteredProducts.length; i++) {
      filteredArray.push(filteredProducts[i]);
    }
  }else {
    for(var i=0;i<filteredProducts.length;i++){
      let index = filteredProducts.findIndex(x =>x.id === filteredProducts[i].id);
      filteredArray.splice(index, 1);
    }
  }

  productTable(filteredArray);
});

  //logout functionality
  $(".menuitemLog").click(function () {
    localStorage.clear();
    window.location.href = "index.html";
  });
});

const getProducts = async () => {
  const response = await fetch(
    "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products"
  );
  products= await response.json(); //extract JSON from the http response  //const data
  console.log(products);
  filteredArray = products.slice();
  productTable(products);
};
