﻿using Lesson5__WebCalc_.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Lesson5__WebCalc_.Pages
{
	public class IndexModel : PageModel
	{
		[BindProperty]
		public Calculator? Calculator { get; set; }
		public String Message { get; set; } = "";

		public void OnGet( String message )
		{
			Message = message;
		}

		public IActionResult OnPost()
		{
			return RedirectToPage( "Result", new Calculator
			{
				FirstNumber = Calculator.FirstNumber,
				Operation = Calculator.Operation,
				SecondNumber = Calculator.SecondNumber
			});
		}
	}
}