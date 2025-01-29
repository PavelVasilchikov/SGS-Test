using static SGS_Server.Models.CurrencyListModel;
using System.Text.Json;

namespace SGS_Server.Services
{
    public class CurrencyService
    {
        private readonly HttpClient _httpClient;

        public CurrencyService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Currency>> GetCurrenciesAsync(int start, int count)
        {
            var response = await _httpClient.GetStringAsync("https://www.cbr-xml-daily.ru/daily_json.js");
            var data = JsonSerializer.Deserialize<RootObject>(response);

            
            return data.Valute.Values.Skip(start).Take(count).ToList();
        }

        public async Task<List<Currency>> GetCurrencyAsync(string charCode)
        {
            var response = await _httpClient.GetStringAsync("https://www.cbr-xml-daily.ru/daily_json.js");
            var data = JsonSerializer.Deserialize<RootObject>(response);


            return data.Valute.Values
                .Where(c => c.CharCode.Contains(charCode, StringComparison.OrdinalIgnoreCase))
                .ToList(); 
        }
    }
}
