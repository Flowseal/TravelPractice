using System.Text;

Encoding.RegisterProvider( CodePagesEncodingProvider.Instance );
Console.OutputEncoding = Encoding.GetEncoding( 1251 );
Console.InputEncoding = Encoding.GetEncoding( 1251 );

Console.WriteLine( "Введите следующую информацию о себе:" );

Console.Write( "Имя: " );
string firstName = Console.ReadLine();

Console.Write( "Фамилия: " );
string lastName = Console.ReadLine();

Console.Write( "Отчество: " );
string middleName = Console.ReadLine();

string rawAge = String.Empty;
int age = -1;
bool firstReadingAge = true;

while ( !int.TryParse( rawAge, out age ) || age < 0 )
{
    if ( !firstReadingAge )
        Console.WriteLine( "Ошибка при чтении возраста! Введите положительное число." );

    Console.Write( "Возраст: " );
    rawAge = Console.ReadLine();

    firstReadingAge = false;
}

Console.Write( "Email: " );
string email = Console.ReadLine();

Console.Write( "Github: " );
string github = Console.ReadLine();

Console.Clear();

string username = String.Empty;
if ( lastName != String.Empty ) username += lastName;
if ( firstName != String.Empty ) username += $" {firstName[ 0 ]}.";
if ( middleName != String.Empty ) username += $" {middleName[ 0 ]}.";

Console.WriteLine( $"Информация о пользователе {username}" );

Console.WriteLine( "Личная информация:" );
Console.WriteLine( $"\tИмя: {firstName}" );
Console.WriteLine( $"\tФамилия: {lastName}" );
Console.WriteLine( $"\tОтчество: {middleName}" );
Console.WriteLine( $"\tВозраст: {age}" );

Console.WriteLine( "Контактная информация:" );
Console.WriteLine( $"\tEmail: {email}" );
Console.WriteLine( $"\tGithub: {github}" );