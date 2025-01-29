$(document).ready(function () {
    let currentPage = 1;
    let currentValutesOnPage = 1;
    let currentValutesOnPageSize = 1;

    let pageSize = document.getElementById('pageSize').value;
    document.getElementById("pageNumber").innerHTML = currentPage;

    function loadCurrencies(page, pageSize) {
        $.ajax({
            url: `https://localhost:7259/CurrencyList/currencies?page=${page}&pageSize=${pageSize}`,
            type: 'GET',
            success: function (data) {
                displayCurrencies(data);
            },
            error: function () {
                $('#currencies-container').html('<p>Ошибка при загрузке данных.</p>');
            }
        });
    }

    function displayCurrencies(currencies) {
        let html = '';
        currentValutesOnPage = 0;
        currencies.forEach(currency => {
            html += `<tr>
                <td>${currency.numCode}</td>
                <td>${currency.charCode}</td>
                <td>${currency.nominal}</td>
                <td>${currency.name}</td>
                <td>${currency.value}</td>
                <td>${currency.previous}</td>
              </tr>`;
            currentValutesOnPage++;
        });
        document.getElementById("currencyList").innerHTML = html;

    }

    $('#nextPage').on('click', function () {
        if (currentValutesOnPageSize == currentValutesOnPage) { currentPage++; }
        loadCurrencies(currentPage, document.getElementById('pageSize').value);
        document.getElementById("pageNumber").innerHTML = currentPage;
    });

    $('#prevPage').on('click', function () {
        if (currentPage != 1) { currentPage-- };

        loadCurrencies(currentPage, document.getElementById('pageSize').value);
        document.getElementById("pageNumber").innerHTML = currentPage;
    });

    $('#pageSize').on('change', function () {
        loadCurrencies(currentPage, document.getElementById('pageSize').value);
        document.getElementById("pageNumber").innerHTML = currentPage;
        currentValutesOnPageSize = document.getElementById('pageSize').value;
    });

    $("[type='number']").keypress(function (evt) {
        evt.preventDefault();
    });

    loadCurrencies(currentPage, pageSize);
});