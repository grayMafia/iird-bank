// smoothing number displaying function 

function numberTransition(className, interval, duration){
    let valueDisplays = document.getElementsByClassName(className);
        Array.from(valueDisplays).forEach((valueDisplay) => {
            let startValue = 0;
            let endValue = parseFloat(valueDisplay.textContent);
            let increment = endValue / (interval / duration);
            let counter = setInterval(function () {
                startValue += increment;
                valueDisplay.textContent = Math.round(startValue);
                if (startValue >= endValue){
                    clearInterval(counter);
                    valueDisplay.textContent = endValue.toFixed(2);
                }
            }, duration);
        });
}



// Login button event handler

const loginBtn = document.getElementById("login");

loginBtn.addEventListener("click", function(){
    const emailValue = document.getElementById('email').value.trim();
    const passwordValue = document.getElementById('password').value.trim();
    if (emailValue == '' || passwordValue == ''){
        document.getElementById('loginError').style.display = 'block';
    }
    else{
        document.getElementById("loginContent").style.display = "none";
        document.getElementById("accountContent").style.display = "block";

        numberTransition('digits', 1500, 20); // smoothing number displaying
    }
});

// deposit button event handler

function spanTextUpdate(id, transactionAmount){
    let totalTransaction = parseFloat(document.getElementById(id).innerText);
    totalTransaction = totalTransaction + transactionAmount;
    document.getElementById(id).innerText = totalTransaction.toFixed(2);
}

const depositBtn = document.getElementById("depositBtn");
depositBtn.addEventListener('click', function(){
    const depositAmountStr = document.getElementById("depositValue").value.trim();
    const depositAmount = parseFloat(depositAmountStr);
    if (depositAmountStr == "" || depositAmount <= 0){
        document.getElementById('dipositeError').style.display = 'block';
    }
    else{
        spanTextUpdate('depositAmount', depositAmount);
        spanTextUpdate('balanceAmount', depositAmount);
        numberTransition('digits', 300, 10); // smoothing number displaying
        document.getElementById('dipositeError').style.display = 'none';  
    }
    document.getElementById("depositValue").value = "";
});

// withdraw button event handler

const withdrawBtn = document.getElementById('withdrawBtn');
withdrawBtn.addEventListener('click', function(){
    const withdrawAmountStr = document.getElementById('withdrawValue').value.trim();
    const withdrawAmount = parseFloat(withdrawAmountStr);
    if (withdrawAmountStr == "" || withdrawAmount <= 0){
        document.getElementById('withdrawError').style.display = 'block';
        document.getElementById('insufficientWithdrawError').style.display = 'none';
    }
    else if (withdrawAmount > parseFloat(document.getElementById('balanceAmount').innerText)){
        document.getElementById('insufficientWithdrawError').style.display = 'block';
        document.getElementById('withdrawError').style.display = 'none';
    }
    else{
        spanTextUpdate('withdrawAmount', withdrawAmount);
        spanTextUpdate('balanceAmount', -1 * withdrawAmount);
        numberTransition('digits', 300, 10);  // smoothing number displaying
        document.getElementById('insufficientWithdrawError').style.display = 'none';
        document.getElementById('withdrawError').style.display = 'none';
    }
    document.getElementById('withdrawValue').value = "";
});

