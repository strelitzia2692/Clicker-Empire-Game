const config = {
  initialPage: document.getElementById("initialPage"),
  mainPage: document.getElementById("mainPage"),
};

class UserAccount {
  constructor(username, age, money, days, items) {
    this.username = username;
    this.age = age;
    this.money = money;
    this.days = days;
    this.clickCount = 0;
    this.incomePerClick = 25;
    this.incomePerSec = 0;
    this.stock = 0;
    this.items = items;
  }
}

class Items {
  constructor(
    itemName,
    type,
    currentAmonut,
    maxAmount,
    perMoney,
    perRate,
    price,
    url
  ) {
    this.itemName = itemName;
    this.type = type;
    this.currentAmonut = currentAmonut;
    this.maxAmount = maxAmount;
    this.perMoney = perMoney;
    this.perRate = perRate;
    this.price = price;
    this.url = url;
  }
}

function createInitalPage() {
  let container = document.createElement("div");
  container.classList.add(
    "vh-100",
    "d-flex",
    "justify-content-center",
    "align-items-center"
  );
  container.innerHTML = `
  <div class="bg-white text-center p-4">
      <h2 class="pb-3">Clicker Empire Game</h2>
      <form>
          <div class="form-row pb-3">
              <div class="col">
                  <input type="text" class="form-control" placeholder="Your name">
              </div>
          </div>
      </form>
      <div class="d-flex justify-content-between">
          <div class="col-6 pl-0">
              <button type="submit" class="btn btn-primary col-12" id="newGame">New</button>
          </div>
          <div class="col-6 pr-0">
              <button type="submit" class="btn btn-primary col-12" id="login">Login</button>
          </div>
      </div>
  </div>
  `;

  return config.initialPage.append(container);
}

function startGame() {
  createInitalPage();
  const newGameBtn = config.initialPage.querySelectorAll("#newGame")[0];
  newGameBtn.addEventListener("click", function () {
    const username = config.initialPage.querySelectorAll("input")[0].value;
    if (username == "") {
      alert("Please put your name");
    } else {
      const user = createInitialUserAccount(username);
      console.log(user);

      config.initialPage.classList.add("d-none");
      config.mainPage.append(mainGamePage(user));
      startTimer(user);
    }
  });

  const loginBtn = config.initialPage.querySelectorAll("#login")[0];
  loginBtn.addEventListener("click", function () {
    const username = config.initialPage.querySelectorAll("input")[0].value;
    if (username == "") {
      alert("Please put your name");
    } else {
      const user = JSON.parse(localStorage.getItem(username));
      if (user == null) alert("There is no data.");
      else {
        config.initialPage.classList.add("d-none");
        config.mainPage.append(mainGamePage(user));
        startTimer(user);
      }
    }
  });
}

function createInitialUserAccount(username) {
  let itemsList = [
    new Items(
      "Flip machine",
      "ability",
      0,
      500,
      25,
      0,
      15000,
      "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"
    ),
    new Items(
      "ETF Stock",
      "investment",
      0,
      -1,
      0,
      0.1,
      300000,
      "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    ),
    new Items(
      "ETF Bonds",
      "investment",
      0,
      -1,
      0,
      0.07,
      300000,
      "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"
    ),
    new Items(
      "Lemonade Stand",
      "realState",
      0,
      1000,
      30,
      0,
      30000,
      "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"
    ),
    new Items(
      "Ice Cream Truck",
      "realState",
      0,
      500,
      120,
      0,
      100000,
      "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"
    ),
    new Items(
      "House",
      "realState",
      0,
      100,
      32000,
      0,
      20000000,
      "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"
    ),
    new Items(
      "TownHouse",
      "realState",
      0,
      100,
      64000,
      0,
      40000000,
      "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"
    ),
    new Items(
      "Mansion",
      "realState",
      0,
      20,
      500000,
      0,
      250000000,
      "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"
    ),
    new Items(
      "Industrial Space",
      "realState",
      0,
      10,
      2200000,
      0,
      1000000000,
      "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"
    ),
    new Items(
      "Hotel Skyscraper",
      "realState",
      0,
      5,
      25000000,
      0,
      10000000000,
      "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"
    ),
    new Items(
      "Bullet-Speed Sky Railway",
      "realState",
      0,
      1,
      30000000000,
      0,
      10000000000000,
      "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png"
    ),
  ];

  return new UserAccount(username, 20, 500000000000000, 0, itemsList);
}

function mainGamePage(user) {
  let container = document.createElement("div");
  container.innerHTML = `
    <div class="d-flex justify-content-center p-md-5 pb-5" style='height:100vh;'>
      <div class="bg-navy p-2 d-flex col-md-11 col-lg-10">

        <div class="bg-dark p-2 col-4" id="burgerStatus">
        </div>

        <div class= "col-8">

          <div class= "p-1 bg-navy" id="userInfo">  
          </div>

          <div class="bg-dark mt-2 p-1 overflow-auto flowHeight" id="displayItems">
          </div>
          
          <div class="d-flex justify-content-end mt-2">
            <div class="border p-2 mr-2 hover" id="reset">
              <i class="fas fa-undo fa-2x text-white"></i>
            </div>
            <div class="border p-2 hover" id="save">
              <i class="fas fa-save fa-2x text-white"></i>
            </div>
          </div>

        </div>
      </div>
    </div>
    `;

  container
    .querySelectorAll("#burgerStatus")[0]
    .append(createBurgerStatus(user));
  container.querySelectorAll("#userInfo")[0].append(createUserInfo(user));
  container.querySelectorAll("#displayItems")[0].append(createItemPage(user));

  const resetButton = container.querySelectorAll("#reset")[0];
  resetButton.addEventListener("click", function () {
    if (window.confirm("Reset All Data?")) {
      const userName = user.username;
      user = createInitialUserAccount(userName);
      stopTimer();
      updateMainPage(user);
      startTimer(user);
    }
  });

  const saveButton = container.querySelectorAll("#save")[0];
  saveButton.addEventListener("click", function () {
    localStorage.setItem(user.username, JSON.stringify(user));
    alert("Saved your data. Please put the same name when you login.");
    stopTimer();
    initializePage();
  });

  return container;
}

function createBurgerStatus(user) {
  const container = document.createElement("div");

  container.innerHTML = `
  <div class="bg-navy text-white text-center">
    <h5>${user.clickCount} Burgers</h5>
    <p>one click ￥${user.incomePerClick} </p>
  </div>
  <div class="p-2 pt-5 d-flex justify-content-center">
    <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" width=80% class="py-2 hover img-fuid" id="burger">
  </div>    
  `;

  let burgerClick = container.querySelectorAll("#burger")[0];
  burgerClick.addEventListener("click", function () {
    user.clickCount++;
    user.money += user.incomePerClick;
    updateBurgerStatus(user);
    updateUserInfo(user);

    console.log(user);
  });

  return container;
}

function createUserInfo(user) {
  const container = document.createElement("div");
  container.classList.add("d-flex", "flex-wrap", "p-1");

  container.innerHTML = `
    <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
        <p>${user.username}</p>
    </div>
    <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
        <p>${user.age} years old</p>
    </div>
    <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
        <p>${user.days} days</p>
    </div>
    <div class="text-white text-center col-12 col-sm-6 userInfoBorder">
        <p>￥${user.money}</p>
    </div>
    `;

  return container;
}

function createItemPage(user) {
  const container = document.createElement("div");

  for (let i = 0; i < user.items.length; i++) {
    container.innerHTML += `
      <div>
      <div class="text-white d-sm-flex align-items-center m-1 selectItem">
        <div class="d-none d-sm-block p-1 col-sm-3">
            <img src=${user.items[i].url}  class="img-fluid">
        </div>
        <div class="col-sm-9">
            <div class="d-flex justify-content-between">
                <h4>${user.items[i].itemName}</h4>
                <h4>${user.items[i].currentAmonut}</h4>
            </div>
            <div class="d-flex justify-content-between">
                <p>￥${user.items[i].price}</p>
                <p class="text-success">￥${displayItemIncome(
                  user.items[i],
                  user.items[i].type
                )}</p>
            </div>
        </div>                      
      </div>
    `;
  }

  const select = container.querySelectorAll(".selectItem");

  for (let i = 0; i < select.length; i++) {
    select[i].addEventListener("click", function () {
      config.mainPage.querySelectorAll("#displayItems")[0].innerHTML = "";
      config.mainPage
        .querySelectorAll("#displayItems")[0]
        .append(createPurchasePage(user, i));
    });
  }

  return container;
}

function createPurchasePage(user, index) {
  const container = document.createElement("div");
  container.innerHTML = `
  <div class="bg-navy p-2 m-1 text-white">
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h4>${user.items[index].itemName}</h4>
                <p>Max purchases: ${displayMaxPurchase(
                  user.items[index].maxAmount
                )}</p>
                <p>Price: ￥${user.items[index].price}</p>
                <p>Get ￥${displayItemIncome(
                  user.items[index],
                  user.items[index].type
                )}</p>
        </div>
        <div class="p-2 d-sm-block col-sm-5">
            <img src="${user.items[index].url}" class="img-fluid">
        </div>
    </div>
    <p>How many would you like to buy?</p>
    <input type="number" placeholder="0" class="col-12 form-control">
    <p class="text-right" id="totalPrice">total: ￥0</p>
    <div class="d-flex justify-content-between pb-3">
        <button class="btn btn-outline-primary col-5 bg-light" id="back">Go Back</buttone>
        <button class="btn btn-primary col-5" id="purchase">Purchase</buttone>
    </div>
</div>
  `;

  const inputCount = container.querySelectorAll("input")[0];
  inputCount.addEventListener("input", function () {
    container.querySelectorAll("#totalPrice")[0].innerHTML = `
    total: ${totalPrice(inputCount.value, user.items[index].price)}
    `;
  });

  const backButton = container.querySelectorAll("#back")[0];
  backButton.addEventListener("click", function () {
    updateMainPage(user);
  });

  const purchaseButton = container.querySelectorAll("#purchase")[0];
  purchaseButton.addEventListener("click", function () {
    updatePurchase(user, index, inputCount.value);
    updateMainPage(user);
    console.log(user);
  });

  return container;
}

function updateBurgerStatus(user) {
  let burgerStatus = config.mainPage.querySelectorAll("#burgerStatus")[0];
  burgerStatus.innerHTML = "";
  burgerStatus.append(createBurgerStatus(user));
}

function updateUserInfo(user) {
  let userInfo = config.mainPage.querySelectorAll("#userInfo")[0];
  userInfo.innerHTML = "";
  userInfo.append(createUserInfo(user));
}

function displayMaxPurchase(maxAmount) {
  if (maxAmount == -1) return "infinity";
  return maxAmount;
}

function displayItemIncome(item, type) {
  if (type == "ability") return item.perMoney + " /click";
  else if (type == "investment") return item.perRate + " /sec";
  else return item.perMoney + " /sec";
}

function totalPrice(amount, price) {
  let total = amount * price;
  return total;
}

function updatePurchase(user, index, count) {
  if (user.money < totalPrice(count, user.items[index].price))
    return alert("You don't have enough money.");

  if (count <= 0) {
    alert("Invalid Number");
    mainGamePage(user);
    return;
  }

  if (
    user.items[index].currentAmonut >= user.items[index].maxAmount &&
    user.items[index].type != "investment"
  ) {
    alert("You can't buy anymore.");
    return;
  }

  user.money -= totalPrice(count, user.items[index].price);
  user.items[index].currentAmonut += Number(count);
  if (user.items[index].itemName == "ETF Stock") {
    user.stock = totalPrice(count, user.items[index].price);
    user.items[index].price = parseInt(
      user.items[index].price * Math.pow(1 + user.items[index].perRate, count)
    );
  }
  if (user.items[index].itemName == "ETF Bonds") {
    user.stock = totalPrice(count, user.items[index].price);
  }

  updateUserIncome(user, index, count);
  updateUserInfo(user);
  updateMainPage(user);
}

function updateUserIncome(user, index, count) {
  const type = user.items[index].type;
  if (type == "ability")
    return (user.incomePerClick += user.items[index].perMoney * Number(count));
  else if (type == "investment")
    user.incomePerSec += user.stock * user.items[index].perRate;
  else return (user.incomePerSec += user.items[index].perMoney * Number(count));
}

function updateMainPage(user) {
  config.mainPage.innerHTML = "";
  config.mainPage.append(mainGamePage(user));
}

function startTimer(user) {
  timer = setInterval(function () {
    user.days++;
    user.money += user.incomePerSec;

    if (user.days % 365 == 0) {
      user.age++;
      updateUserInfo(user);
    } else {
      updateUserInfo(user);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function initializePage() {
  config.initialPage.classList.remove("d-none");
  config.initialPage.innerHTML = "";
  config.mainPage.innerHTML = "";
  startGame();
}

startGame();
