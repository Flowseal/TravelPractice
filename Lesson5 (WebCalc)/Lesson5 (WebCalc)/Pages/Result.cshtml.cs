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

		public int CompareStringsAsIntegers( String s1, String s2 )
		{
			if ( s1.Length > s2.Length )
			{
				return 1;
			}
			else if ( s2.Length > s1.Length )
			{
				return 2;
			}
			else
			{
				for ( int i = 0; i < s1.Length; i++ )
				{
					if ( ( s1[ i ] - '0' ) > ( s2[ i ] - '0' ) )
						return 1;
					else if ( ( s1[ i ] - '0' ) < ( s2[ i ] - '0' ) )
						return 2;
				}

				// Equals
				return 0;
			}
		}

		public void AppendResult( int value )
		{
			string numberStringRepr = value.ToString();

			// Since we are appending from right to left,
			// we need to reverse if we have more than two chars
			if ( numberStringRepr.Length > 1 )
				numberStringRepr = new string(numberStringRepr.Reverse().ToArray()!);

			result += numberStringRepr;
		}

		public void ProcessData()
		{
			firstLine = Calculator.FirstNumber;
			secondLine = Calculator.SecondNumber;
			operation = Calculator.Operation;

			// Swap numbers in case if Operation is '+' and FirstNumber.Length smaller than SecondNumber.Length
			if ( operation == "+" && Calculator.FirstNumber.ToString().Length < Calculator.SecondNumber.ToString().Length )
			{
				(firstLine, secondLine) = (secondLine, firstLine);
			}

			// Swap numbers in case if Operation is '-' and FirstNumber smaller than SecondNumber
			bool negativeSwap = false;
			if ( operation == "-" && CompareStringsAsIntegers( Calculator.FirstNumber, Calculator.SecondNumber ) == 2 )
			{
				(firstLine, secondLine) = (secondLine, firstLine);
				negativeSwap = true;
			}

			// hintLine is a List of strings: <"1", "1", "", "1"> etc
			hintLine = new string[ firstLine.Length ];

			for ( int i = 0; i < firstLine.Length; i++ )
			{
				// Prevent NullReference exception
				if ( hintLine[ firstLine.Length - i - 1 ] is null )
					hintLine[ firstLine.Length - i - 1 ] = "";

				// Subtract 'zero char' to get real digit as int (easy cast char to int)
				int topDigit = firstLine[ firstLine.Length - i - 1 ] - '0';

				// In case if no digits under top digit
				if ( i >= secondLine.Length )
				{
					if ( operation == "-" && hintLine[ firstLine.Length - i - 1 ].Contains( "●" ) )
					{
						topDigit -= 1;
					}
					else if ( operation == "+" && hintLine[ firstLine.Length - i - 1 ].Contains( "1" ) )
					{
						topDigit += 1;
					}

					AppendResult( topDigit );
					continue;
				}

				int botDigit = secondLine[ secondLine.Length - i - 1 ] - '0';

				if ( operation == "+" )
				{
					// One in mind
					if ( hintLine[ firstLine.Length - i - 1 ].Contains( "1" ) )
					{
						topDigit += 1;
					}

					// Should we add 'one in mind' on next digit
					if ( topDigit + botDigit >= 10 && i != firstLine.Length - 1 )
					{
						topDigit -= 10;
						hintLine[ firstLine.Length - i - 2 ] = "1";
					}

					AppendResult( topDigit + botDigit );
				}
				else if ( operation == "-" )
				{
					// Substract 1 in mind
					if ( hintLine[ firstLine.Length - i - 1 ].Contains( "●" ) )
					{
						topDigit -= 1;
					}

					// Should we add '10' or 'dot' in mind on next digit
					if ( topDigit < botDigit )
					{
						topDigit += 10;
						hintLine[ firstLine.Length - i - 1 ] += "10";

						if ( i != firstLine.Length - 1 )
						{
							hintLine[ firstLine.Length - i - 2 ] += "●";
						}
					}

					AppendResult( topDigit - botDigit );
				}
			}

			// Remove leading zeroes
			while ( result[result.Length - 1] == '0' )
			{
				result = result.Remove(result.Length - 1);
			}

			// Swap operation signs after calculation in case of negative result swap
			if ( negativeSwap )
			{
				firstLine = firstLine.Insert( 0, "-" );
				operation = "+";
				result += "-";
			}
		}
	}
}