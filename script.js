'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500.32, 250, -300.92, 5000, -850, -110.18, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2023-09-02T14:43:31.074Z',
    '2023-09-29T11:24:19.761Z',
    '2023-10-15T10:45:23.907Z',
    '2023-10-22T12:17:46.255Z',
    '2023-11-12T15:14:06.486Z',
    '2023-11-09T11:42:26.371Z',
    '2023-11-21T07:43:59.331Z',
    '2023-11-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseNickname = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// форматирование дат
const formatTransactionDate = function(date, locale) {
  const getDaysBetween2Dates = (date1, date2) => Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  const daysPassed = getDaysBetween2Dates(new Date(), date);
  // console.log(daysPassed);
  if(daysPassed === 0) return "Сегодня";
  if(daysPassed === 1) return "Вчера";
  if(daysPassed <= 7) return `${daysPassed} дней назад`;
  else{
    // const day = `${date.getDate()}`.padStart(2, "0"); // если день состоит из 1 цифры то строке добавится 0 вначале
    // const month = `${date.getMonth() + 1}`.padStart(2, "0"); // если месяц состоит из 1 цифры то строке добавится 0 вначале // + 1 т.к. месяца начинаются с 0
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date)
  }
}

// форматирование цифр и валюты
const formatCurrency = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

// вывод всех транзакций пользователя 
const displayTransactions = function(account, sort = false) {

  containerTransactions.innerHTML = ""; // очищаем блок с транзакциями 

  // поумолчанию sort = false, при клике на кнопку сортировки sort становится = true
  // если sort = false - отображаем транзакции в обычном состоянии, если sort = true - т.е. мы нажали на кнопку сортровки - транзакции сортируются по убыванию 
  // мы не можем написать transactions.sort() для сортировки т.к. .sort() меняет исходный массив 
  //- для корректной работы, мы создаем копию transactions через .slice() и применям .sort() к этой копии
  // .sort((x, y) => x - y) - сортировка массива по возрастанию - самая маленькое число будет внизу
  const transacs = sort ? account.transactions.slice().sort((x, y) => x - y) : account.transactions

  // добавляем верстку для блока каждой транзакции 
  transacs.forEach((trans, index) => {
    const transType = trans > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.transactionsDates[index]);
    const transDate = formatTransactionDate(date, account.locale);
    const formatedTrans = formatCurrency(trans, account.locale, account.currency)

    const transactionsRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">${index + 1} ${transType}</div>
      <div class="transactions__date">${transDate}</div>
      <div class="transactions__value">${formatedTrans}</div>
    </div>
    `;
    // вставляем новую верстку в контейнер транзакций через insertAdjacentHTML
    containerTransactions.insertAdjacentHTML("afterbegin", transactionsRow);
   // containerTransactions.insertAdjacentHTML("beforeend", transactionsRow) - прост посмотреть как работает (транзакции отображаются с последнего)
  });
}

// displayTransactions(account1.transactions); // тестим на ак1 пока нет авторизации 

// Вычисление никнейма пользователя - первые буквы имени и фамили в нижнем регистре 
const createNicknames = function(accs) {
  accs.forEach(acc => {
    acc.nickName = acc.userName // для каждого пользователя добавляем свойство userName и присвоиваем ему значение 
    .toLocaleLowerCase()
    .split(" ")
    .map(item => item[0])
    .join("");
  })
}

createNicknames(accounts);
// console.log(accounts) // Проверяем, что объектам добавилось новое свойство nickName


// Вычисление баланса 
const displayBalance = function(account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0) // складываем все транзакции 
  account.balance = balance // добавляем пользователю новое свойство баланс
  labelBalance.textContent = formatCurrency(balance, account.locale, account.currency);
}

//displayBalance(account1.transactions) // тестим на ак1 пока нет авторизации 

// вывод всех положительных операций и всех отрицательных (под выводом всех операций)
const displayTotal = function (account) {
  const depositesTotal = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = formatCurrency(depositesTotal, account.locale, account.currency);

  const withdrawalTotal = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent =  formatCurrency(withdrawalTotal, account.locale, account.currency);

  // доход с пополнений у юзера 1 = 1.1 (из изначального объекта)
  // банк начисляет процент, только если он больше 5 долларов 
  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(depos => (depos * account.interest) / 100) // новый массив с начисляемыми процентами на каждую операцию пополнения
    .filter(interest => interest >=5) // убираем все проценты меньше 5$
    .reduce((acc, interest) => acc + interest, 0)
  labelSumInterest.textContent = formatCurrency(interestTotal, account.locale, account.currency);
}

// displayTotal(account1.transactions) // тестим на ак1 пока нет авторизации 

// функция обновляющая интерфейс, который отображается пользователю
const updateUi = function(account) {
  // отображаем операции 
  displayTransactions(account);
  // отображаем баланс 
  displayBalance(account)
  // отображаем итого 
  displayTotal(account)
}
// Имплементация Login
let currentAccount; // текущий пользователь 
let currentLogoutTimer // текущий таймер 

// только для разработки, чтоб каждый раз не логиниться
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

// таймер для автоматического выхода из аккаунта
const startLogoutTimer = function(){

  const logoutTimerCallback = function(){
    const minute = String(Math.trunc(time / 60)).padStart(2, "0"); // перевод в минуты + округление минут + если число из одной цифры, добавляем 0 вначале
    const secons = String(time % 60).padStart(2, "0"); // перевод в секунды + если число из одной цифры, добавляем 0 вначале
    // в каждом вызове таймера отображаем изменение на странице 
    labelTimer.textContent = `${minute}:${secons}`;
    // после истечения времени останавливаем таймер и выбрасываем пользователя 
    if(time === 0) {
      clearTimeout(logoutTimer); // останавливаем таймер 
      containerApp.style.opacity = 0; // скрываем интерфейс 
      labelWelcome.textContent = `Вийдите в свой аккаунт`; // меняем надпись 
    }
    time-- // уменьшаем time на 1 
  }
  // устанавливаем время через которое будет произведен автоматический выход 
  let time = 300;
  logoutTimerCallback()
  // вызов таймера каждую секунду 
  const logoutTimer = setInterval(logoutTimerCallback, 1000)

  return logoutTimer // необходимо для проверки запушен ли еще один таймер из другого аккаунта 
}

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  currentAccount = accounts.find(acount => acount.nickName === inputLoginUsername.value);
  //console.log(currentAccount)
  if(currentAccount?.pin === +inputLoginPin.value) { // ?. - проверка на существование currentAccount, если currentAccount == true все выполнится
    // приветсвие пользователя, подтверждение что вход выполнен
    labelWelcome.textContent = `Рады, что вы с нами, ${currentAccount.userName.split(" ")[0]}!`;
    // отображаем скрытый интерфейс
    containerApp.style.opacity = 100;

    // устанавлияваем текущую дату 

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, "0"); // если день состоит из 1 цифры то строке добавится 0 вначале
    // const month = `${now.getMonth() + 1}`.padStart(2, "0"); // если месяц состоит из 1 цифры то строке добавится 0 вначале // + 1 т.к. месяца начинаются с 0
    // const year = now.getFullYear()
    // labelDate.textContent = `${day}/${month}/${year}`;  

    const now = new Date();
    const options = { // дополнительные параметры
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    // const locale = navigator.language; // определяем язык из браузера 
    // labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);


    //очищаем данные ввовда логина
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur(); // убираем фокус с поля пин при нажатии на энтер 
    inputLoginUsername.blur(); // убираем фокус с поля .юсер при нажатии на энтер 

    // проыеряем запущен ли уже таймер и если да останавливаем его 
    if(currentLogoutTimer) clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer(); // запускаем таймер 

    updateUi(currentAccount); // вызываем функцию обновляющую интерфейс для пользователя
  }
})

// Имплементация переводов между аккаунтами
btnTransfer.addEventListener("click", (e) => {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value; // сколько переводим
  const recipientNickname = inputTransferTo.value; // получатель 
  const recipientAccaunt =  accounts.find(account => account.nickName === recipientNickname);
  // перевод должен быть больше нуля + у текущего пользователя баланс должен быть больше или равен переводу 
  // + проверка, что юзер не переводиь на свой же счет + существует ли пользователь, которому переводим деньги
  if(transferAmount > 0 && 
    transferAmount <= currentAccount.balance && 
    recipientNickname !== currentAccount.nickName && 
    recipientAccaunt) {
    currentAccount.transactions.push(-transferAmount); // добавляем отрицательную операцию текщему пользователю 
    recipientAccaunt.transactions.push(transferAmount); // добавляем положительную операцию пользователю, которому перевели деньги
    // добавляем дату транзакции у отправителя и получателя 
    currentAccount.transactionsDates.push(new Date().toISOString());
    recipientAccaunt.transactionsDates.push(new Date().toISOString());
    updateUi(currentAccount); // вызываем функцию обновляющую интерфейс для пользователя
    //перезапуск таймера 
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
    // очищаем поля инпута 
    inputTransferTo.value = "";
    inputTransferAmount.value ="";
    inputTransferTo.blur();
    inputTransferAmount.blur();
  }
})

// Закрытие счета (удаление объекта из массива)
btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  if(currentAccount.nickName === inputCloseNickname.value && currentAccount.pin === +inputClosePin.value) {
    inputCloseNickname.value = "";
    inputClosePin.value = "";
    inputCloseNickname.blur();
    inputClosePin.blur();
    // определяем индекс объекта, который нужно удалить 
    const currentAccountIndex = accounts.findIndex(account => account.nickName === currentAccount.nickName)
    // console.log(currentAccountIndex);
    accounts.splice(currentAccountIndex, 1) // удаляем объект из массива 
    containerApp.style.opacity = 0; // скрываем интерфейс 
    labelWelcome.textContent = `Вийдите в свой аккаунт`; 
  }
})

// Запрос займа
btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const loanAmounr = Math.floor(inputLoanAmount.value); // получаем сумму запрошенного займа - здесь можно не переводить строку в число через +, т.к. метод Math.floor() и так переведет строку в число 
  // проверка на возможность выдачи займа - один из депозитов должен быть больше 10% займа
  if(loanAmounr > 0 && currentAccount.transactions.some(trans => trans >= loanAmounr * 10 / 100 )) {
    setTimeout(function(){ // ожидание одобрения банка в 5 сек
      currentAccount.transactions.push(loanAmounr); // добавляем запрошенный депозит 
      currentAccount.transactionsDates.push(new Date().toISOString()); // добавляем дату операции 
      updateUi(currentAccount) // обновляем визуал
    }, 5000);
    inputLoanAmount.value = "";
    inputLoanAmount.blur();
    //перезапуск таймера 
    clearInterval(currentLogoutTimer);
    currentLogoutTimer = startLogoutTimer();
  }
})

// создаем переменную за пределами колбэк функции именно let т. к. она будет постоянно меняться
// изначально переменная = false
// и каждый раз при клике на кнопку сортировки значение будет меняться на противоположное 
let transactionsSorted = false;

// изменение состояния кнопки сортировать (поумолчанию она false)
btnSort.addEventListener("click", (e) => {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
})


const logoImage = document.querySelector(".logo")
logoImage.addEventListener("click", function() {
  [...document.querySelectorAll(".transactions__row")].forEach(function(row, i){
    if(i % 2 === 0) {
      row.style.backgroundColor = "#d4d0d0"
    }
  })
});

