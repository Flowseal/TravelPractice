﻿using Lesson5__WebCalc_.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Primitives;

namespace Lesson5__WebCalc_.Pages
{
	public class ResultModel : PageModel
	{
		private Calculator Calculator { get; set; }
		public List<string> multiplyStrings = new();
		public String[]? hintLine;
		public String firstLine = "";
		public String secondLine = "";
		public String result = "";
		public String operation = "";

		public void OnGet( Calculator calculator )
		{
			Calculator = calculator;
			ProceedData();
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

		public void AppendResult( ref string dest, int number )
		{
			string numberStringRepr = number.ToString();

			// Since we are appending from right to left,
			// we need to reverse if we have more than two chars
			if ( numberStringRepr.Length > 1 )
				numberStringRepr = new string( numberStringRepr.Reverse().ToArray()! );

			dest += numberStringRepr;
		}

		public string LinesAdding( List<string> _lines )
		{
			List<string> lines = new List<string>( _lines );
			int maxLineWidth = lines.Max( s => s.Length );

			// Fill smaller length lines with zeroes for simplicity
			for ( int i = 0; i < lines.Count; i++ )
			{
				if ( operation == "+" )
					lines[ i ] = lines[ i ].PadLeft( maxLineWidth, '0' );
				else
					lines[ i ] = lines[ i ].PadLeft( maxLineWidth - i, '0' ).PadRight( maxLineWidth, '0' );
			}

			// Hints (in mind operations above first line)
			hintLine = new string[ lines[ 0 ].Length ];

			// Initialize arrray
			for ( int i = 0; i < lines[ 0 ].Length; i++ )
				hintLine[ i ] = "";

			string linesSumResult = "";

			for ( int i = 0; i < lines[ 0 ].Length; i++ )
			{
				// Get the digit index from the right edge
				int digitIndex = lines[ 0 ].Length - i - 1; ;

				// Add all column digits
				List<int> columnDigits = new List<int>();
				for ( int lineNum = 0; lineNum < lines.Count; lineNum++ )
					columnDigits.Add( lines[ lineNum ][ digitIndex ] - '0' );

				// Raw sum of digits in current column
				int columnResult = columnDigits.Sum();

				// If we have '1' in mind above column
				if ( hintLine[ digitIndex ].Contains( "1" ) )
					columnResult += hintLine[ digitIndex ].Count( c => c == '1' );

				// Should we add '1' in mind above next column
				if ( columnResult >= 10 && i != lines[ 0 ].Length - 1 )
				{
					hintLine[ digitIndex - 1 ] = hintLine[ digitIndex - 1 ].PadLeft( columnResult / 10, '1' );
					columnResult %= 10;
				}

				AppendResult( ref linesSumResult, columnResult );
			}

			// Remove leading zeroes
			if ( result.Length > 1 )
				result = result.TrimEnd( '0' );

			return linesSumResult;
		}

		public void Addition()
		{
			// Swap lines to make the longer number come first
			if ( firstLine.Length < secondLine.Length )
			{
				(firstLine, secondLine) = (secondLine, firstLine);
			}

			List<string> linesToAdd = new List<string>()
			{
				firstLine, secondLine
			};

			result = LinesAdding( linesToAdd );
		}

		public void Substraction()
		{
			// Swap numbers in case if Operation is '-' and First number smaller than Second number
			bool swapLines = false;
			if ( CompareStringsAsIntegers( firstLine, secondLine ) == 2 )
			{
				(firstLine, secondLine) = (secondLine, firstLine);
				swapLines = true;
			}

			hintLine = new string[ firstLine.Length ];

			// Initialize arrray
			for ( int i = 0; i < firstLine.Length; i++ )
				hintLine[ i ] = "";

			// Fill smaller length line with zeroes for simplicity
			string internalFirstLine = firstLine;
			string internalSecondLine = secondLine.PadLeft( internalFirstLine.Length, '0' );

			for ( int i = 0; i < internalFirstLine.Length; i++ )
			{
				// Get the digit index from the right edge
				int digitIndex = internalFirstLine.Length - i - 1;

				int topDigit = internalFirstLine[ digitIndex ] - '0';
				int botDigit = internalSecondLine[ digitIndex ] - '0';

				// Substract 1 in mind
				if ( hintLine[ digitIndex ].Contains( "●" ) )
				{
					topDigit -= 1;
				}

				// Should we add '10' or 'dot' in mind on next digit
				if ( topDigit < botDigit )
				{
					topDigit += 10;
					hintLine[ digitIndex ] += "10";

					if ( i != internalFirstLine.Length - 1 )
					{
						hintLine[ digitIndex - 1 ] += "●";
					}
				}

				AppendResult( ref result, topDigit - botDigit );
			}

			// Remove leading zeroes
			if ( result.Length > 1 )
				result = result.TrimEnd( '0' );

			// Swap operation signs after calculation in case of negative result swap
			if ( swapLines )
			{
				firstLine = firstLine.Insert( 0, "-" );
				operation = "+";
				result += "-";
			}
		}

		public void Multiplication()
		{
			// Swap lines to make the longer number come first
			if ( firstLine.Length < secondLine.Length )
			{
				(firstLine, secondLine) = (secondLine, firstLine);
			}

			// Prepare multiplied lines for adding
			for ( int bot = 0; bot < secondLine.Length; bot++ )
			{
				int botDigit = secondLine[ secondLine.Length - bot - 1 ] - '0';
				string line = "";
				int remains = 0;

				for ( int top = 0; top < firstLine.Length; top++ )
				{
					int topDigit = firstLine[ firstLine.Length - top - 1 ] - '0';
					int multipliedResult = topDigit * botDigit + remains;
					remains = ( top == firstLine.Length - 1 ) ? 0 : ( multipliedResult / 10 );
					AppendResult( ref line, multipliedResult - remains * 10 );
				}

				multiplyStrings.Add( line );
			}

			// Calculate result
			result = LinesAdding( multiplyStrings );

			// We don't want to show hint line in this case
			hintLine = Array.Empty<string>();
		}

		public void ProceedData()
		{
			firstLine = Calculator.FirstNumber;
			secondLine = Calculator.SecondNumber;
			operation = Calculator.Operation;

			// Strip extra zeroes
			if ( firstLine.Length == firstLine.Count( c => c == '0' ) )
				firstLine = "0";
			if ( secondLine.Length == secondLine.Count( c => c == '0' ) )
				secondLine = "0";

			// Remove leading zeroes
			if ( firstLine.Length > 1 )
				firstLine = firstLine.TrimStart( '0' );
			if ( secondLine.Length > 1 )
				secondLine = secondLine.TrimStart( '0' );

			switch ( operation )
			{
				case "+":
					Addition();
					break;
				case "-":
					Substraction();
					break;
				case "x":
					Multiplication();
					break;
			}
		}
	}
}