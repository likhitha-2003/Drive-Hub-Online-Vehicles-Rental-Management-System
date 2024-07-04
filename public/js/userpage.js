//parameter passed from button (Parameter same as category)
function filterProduct(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if(element.classList.contains("Available"))
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".product-name");
  let cards = document.querySelectorAll(".card");

  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});

//Initially display all products
window.onload = () => {
  filterProduct("all");
};






  
  
  
  
  

  
  
  
  
  /*//parameter passed from button (Parameter same as category)
  function filter(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    //select all cards
    let elements = document.querySelectorAll(".card");
    //loop through all cards
    elements.forEach((element) => {
      //display all cards on 'all' button click
      if (value == "all") {
        element.classList.remove("hide");
      } else {
        //Check if element contains category class
        if (element.classList.contains(value)) {
          //display element based on category
          element.classList.remove("hide");
        } else {
          //hide other elements
          element.classList.add("hide");
        }
      }
    });
  }
  //-----------------------------------------------------

 /* function toggleButton(button) {
    button.classList.toggle('active');
}

function filterProduct(filterType) {
// Get all active buttons
var activeButtons = document.querySelectorAll('.button-value.active');

// Get all cards
var cards = document.querySelectorAll('.card');

// If filterType is 'filter', filter the vehicles
if (filterType === "all") {
  card.classList.remove('hide');
} 
if (filterType === 'filter') {
cards.forEach(function(card) {
    var shouldShow = true;

    // Check if the card should be displayed based on active buttons
    activeButtons.forEach(function(button) {
        var filterValue = button.textContent.toLowerCase();
        if (!card.classList.contains(filterValue)) {
            shouldShow = false;
        }
    });

    // Show or hide the card based on filtering criteria
    if (shouldShow) {
        card.classList.remove('hide');
    } 
});
} 
// If filterType is 'Reset', remove active class from all buttons and show all vehicles
else if (filterType === 'Reset') {
activeButtons.forEach(function(button) {
    button.classList.remove('active');
});

cards.forEach(function(card) {
    card.classList.remove('hide');
});
}
}


function toggleButton(button) {
  button.classList.toggle('active');
}

function filterProduct(action) {
  var selectedFilters = document.querySelectorAll('.active');
  var vehicles = document.querySelectorAll('.card');

  if (action === 'filter') {
      vehicles.forEach(function (vehicle) {
          var showVehicle = true;
          selectedFilters.forEach(function (filter) {
              if (!vehicle.classList.contains(filter.textContent)) {
                  showVehicle = false;
              }
          });
          if (showVehicle) {
              vehicle.classList.remove('hide');
          } else {
              vehicle.classList.add('hide');
          }
      });
  } else if (action === 'Reset') {
      vehicles.forEach(function (vehicle) {
          vehicle.classList.remove('hide');
      });
      selectedFilters.forEach(function (filter) {
          filter.classList.remove('active');
      });
  }
}
  //Search button click
  document.getElementById("search").addEventListener("click", () => {
    //initializations
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll(".product-name");
    let cards = document.querySelectorAll(".card");
  
    //loop through all elements
    elements.forEach((element, index) => {
      //check if text includes the search value
      if (element.innerText.includes(searchInput.toUpperCase())) {
        //display matching card
        cards[index].classList.remove("hide");
      } else {
        //hide others
        cards[index].classList.add("hide");
      }
    });
  });
  
  function showAllVehicles() {
    var vehicles = document.querySelectorAll('.card');
    vehicles.forEach(function (vehicle) {
        vehicle.classList.remove('hide');
    });
}
  //Initially display all products
  window.onload = function () {
    showAllVehicles();
};*/




  


  