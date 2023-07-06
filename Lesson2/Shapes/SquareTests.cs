using NUnit.Framework;
namespace Shapes.Tests;

[TestFixture]
public class SquareTests
{
    [Test]
    public void Triangle_Constructor_NegativeSize_ThrowException()
    {
        Assert.That( () => new Square( -1 ), Throws.TypeOf<ArgumentOutOfRangeException>() );
    }

    [Test]
    public void Square_CalculateArea_Size3_CorrectAnswer()
    {
        // Arrange
        Square square = new( 3 );

        // Act
        double area = square.CalculateArea();

        // Assert
        Assert.That( area, Is.EqualTo( 9 ) );
    }

    [Test]
    public void Square_CalculatePerimeter_Size3_CorrectAnswer()
    {
        // Arrange
        Square square = new( 3 );

        // Act
        double perimeter = square.CalculatePerimeter();

        // Assert
        Assert.That( perimeter, Is.EqualTo( 12 ) );
    }
}
