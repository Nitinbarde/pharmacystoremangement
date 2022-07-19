function ordertable(data) {

  $("#orderCount").text(data.length);
  data = data.sort(function(a, b){
    return sortingArr.indexOf(a.orderStatus) - sortingArr.indexOf(b.orderStatus);
  });

    var table = document.getElementById("orderdatatable");
    $("#orderdatatable tr").remove(); 
    for (i = 0; i < data.length; i++) {
      var row = `<tr>
  
          <td>   ${data[i].id} </td>
          <td>   ${data[i].customerName}  </td>
          <td>${data[i].orderDate} </br> ${data[i].orderTime}  </td>
          <td> $  ${ data[i].amount} </td>
          <td>   ${data[i].orderStatus} </td>
          </tr>`;

          
      table.innerHTML += row;
    }
  }
         
  //checkbox functionality
 var orders = [];
 var filteredArray = [];

 var sortingArr = [
  'New',
  'Packed',
  'InTransit',
  'Delivered'
]


//login functionality
  $(document).ready(function() {
    const loggedInUser = localStorage.getItem("User");
    if(!loggedInUser){
      window.location.href = "index.html"
    }

    getOrders();

    //checkbox functionality
    $("input[type='checkbox']").change(function() {
      
      const controlName = $(this).attr('name');
      const isChecked = $(this).is(':checked');
      
      var filteredLength = filteredArray.filter(x => x.orderStatus.toLowerCase() == controlName).length;
      var filteredNew = orders.filter(x => x.orderStatus.toLowerCase() == controlName);

      if(isChecked) {
        if(filteredLength === 0){
          for(var i = 0; i< filteredNew.length; i++) {
            let index = filteredArray.findIndex(x =>x.id === filteredNew[i].id);
            filteredArray.push(filteredNew[i]);
          }
        }
      }
      else {
        if(filteredLength > 0){
          for(var i = 0; i< filteredNew.length; i++){
            let index = filteredArray.findIndex(x =>x.id === filteredNew[i].id);
            filteredArray.splice(index, 1);
          }
        }
      }

      ordertable(filteredArray);

    })

    //logout funcyionality
    $(".menuitemLog").click(function(){
      localStorage.clear();
      window.location.href = "index.html";
    })
  })

  const getOrders = async () => {
    const response = await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders');
    orders = await response.json(); //extract JSON from the http response
    filteredArray = orders.slice();
    ordertable(orders);
  }



