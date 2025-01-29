$(document).ready(function () {
    function loadCurrencies(charCode) {     
        $.ajax({
            url: `https://localhost:7259/CurrencyList/currency/${charCode}`,
            type: 'GET',
            success: function (data) {
                displayCurrencies(data);                
            },
            error: function () {          
                
            }
        });
    }

    function displayCurrencies(currencies) {
        let html = '';
        currencies.forEach(currency => {
            html += `<tr>
                <td>${currency.numCode}</td>
                <td>${currency.charCode}</td>
                <td>${currency.nominal}</td>
                <td>${currency.name}</td>
                <td>${currency.value}</td>
                <td>${currency.previous}</td>
              </tr>`;
        });
        document.getElementById("currencySearchList").innerHTML = html;
    }

    $('#charCodeSearchId').on('change', function () {
        loadCurrencies(document.getElementById('charCodeSearchId').value);
    });

});