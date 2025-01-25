using System.Collections.Generic;

namespace SGS_Server.Models
{
    public class CurrencyListModel
    {
        public class RootObject
        {
            public DateTime Date { get; set; }
            public DateTime PreviousDate { get; set; }
            public string PreviousURL { get; set; }
            public DateTime Timestamp { get; set; }
            public Dictionary<string, Currency> Valute { get; set; }
        }

        public class Currency
        {
            public string ID { get; set; }
            public string NumCode { get; set; }
            public string CharCode { get; set; }
            public int Nominal { get; set; }
            public string Name { get; set; }
            public decimal Value { get; set; }
            public decimal Previous { get; set; }
        }
    }
}