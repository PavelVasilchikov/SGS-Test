using Microsoft.AspNetCore.Mvc;
using SGS_Server.Models;
using SGS_Server.Services;

namespace SGS_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyListController : ControllerBase
    {
        private readonly CurrencyService _currencyService;

        public CurrencyListController(CurrencyService currencyService)
        {
            _currencyService = currencyService;
        }

        [HttpGet("currencies")]
        public async Task<IActionResult> GetCurrencies(int page = 1 , int pageSize = 5)
        {
            var currencies = await _currencyService.GetCurrenciesAsync((page - 1) * pageSize, pageSize);
            return Ok(currencies);
        }

        [HttpGet("currency/{charCode}")]
        public async Task<IActionResult> GetCurrency(string charCode)
        {
            var currency = await _currencyService.GetCurrencyAsync(charCode);
            return currency != null ? Ok(currency) : NotFound();
        }
    }
}