using Lesson5__WebCalc_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Lesson5__WebCalc_.Pages
{
	public class ResultModel : PageModel
	{
		private Calculator Calculator { get; set; }
		public String[] hintLine;
		public String firstLine = "";
		public String secondLine = "";
		public String result = "";
		public String operation = "";

		public void OnGet( Calculator calculator )
		{
			Calculator = calculator;
			ProcessData();
		}

		public void ProcessData()
		{
			int Result = 0;

			switch ( Calculator!.Operation )
			{
				case "+":
					Result = Calculator.FirstNumber + Calculator.SecondNumber;
					break;
				case "-":
					Result = Calculator.FirstNumber - Calculator.SecondNumber;
					break;
			}

			// Swap numbers in case if Operation is '+' and FirstNumber.Length smaller than SecondNumber.Length
			if ( Calculator.Operation == "+" && Calculator.FirstNumber.ToString().Length < Calculator.SecondNumber.ToString().Length )
			{
				(Calculator.FirstNumber, Calculator.SecondNumber) = (Calculator.SecondNumber, Calculator.FirstNumber);
			}

			firstLine = Calculator.FirstNumber.ToString();
			secondLine = Calculator.SecondNumber.ToString();
			operation = Calculator.Operation.ToString();
			result = Result.ToString();

			// hintLine is Array of strings: <"1", "1", "", "1"> etc
			hintLine = new string[ firstLine.Length ];

			for ( int i = 0; i < firstLine.Length; i++ )
			{
				if ( i == secondLine.Length )
					break;

				// Subtract 'zero char' to get real digit as int (easy cast char to int)
				int topDigit = firstLine[ firstLine.Length - i - 1 ] - '0';
				int botDigit = secondLine[ secondLine.Length - i - 1 ] - '0';

				if ( Calculator.Operation == "+" && i != firstLine.Length - 1 )
				{
					// Should we add 'one in mind'
					if ( topDigit + botDigit >= 10 )
						hintLine[ firstLine.Length - i - 2 ] = "1";
				}
				else if ( Calculator.Operation == "-" )
				{
					// We should add either '10' or 'dot' in mind
					if ( topDigit < botDigit )
					{
						hintLine[ firstLine.Length - i - 1 ] += "10";

						if ( i != firstLine.Length - 1 )
							hintLine[ firstLine.Length - i - 2 ] += "●";
					}
				}
			}
		}
	}
}