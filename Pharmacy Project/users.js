function userTable(data) {
    $("#user-data-table tr").remove();
    var table = document.getElementById("user-data-table");
  
    for (i = 0; i < data.length; i++) {
      var row = `<tr>
      <td>${data[i].id}</td>
      <td><img src="${data[i].profilePic}"/></td>
      <td>${data[i].fullName} </td>
      <td>${data[i].dob}</td>
      <td>${data[i].gender}</td>
      <td>${data[i].currentCity}  , ${data[i].currentCountry} </td>
      </tr>`;
    table.innerHTML += row;
  }
}
  

  $(document).ready(function() {
    const loggedInUser = localStorage.getItem("User");
    if(!loggedInUser){
      window.location.href = "index.html"
    }

    
    getUsers().then(function(data){
      userTable(data);
    });

    //logout funcyionality

    $(".menuitemLog").click(function(){
      localStorage.clear();
      window.location.href = "index.html";
    })


    $('input[type=search]').on('search', function () {
      getUsers().then(function(data){
        userTable(data);
      });
    });
  })


  const getUsers = async (fullName) => {
   
    let url = 'https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users';
    if(fullName != undefined && fullName != '') {
      url +='?fullName='+fullName+'';
    }
    const response = await fetch(url);
    const data = await response.json(); //extract JSON from the http response
    return data;
  }
  

  const searchFun = ()=>{
    let filter = document.getElementById('user-search').value;
    
    if(filter.length < 2){
      alert('Please enter at least 2 characters.');
      return;
    }

    getUsers(filter.trim()).then(function(data){
      userTable(data);
    });
  }

  function Reset(){
    $("#user-search").val("");
    getUsers().then(function(data){
      userTable(data);
    });
  }
