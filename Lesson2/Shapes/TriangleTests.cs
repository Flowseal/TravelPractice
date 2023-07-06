using NUnit.Framework;
namespace Shapes.Tests;

[TestFixture]
public class TriangleTests
{
    [Test]
    public void Triangle_Constructor_NegativeSide_ThrowException()
    {
        Assert.That( () => new Triangle( -1, 1, 1 ), Throws.TypeOf<ArgumentOutOfRangeException>() );
    }

    [Test]
    public void Triangle_Constructor_InvalidSides_ThrowException()
    {
        Assert.That( () => new Triangle( 1, 1, 100 ), Throws.TypeOf<ArgumentException>() );
    }

    [Test]
    public void Triangle_CalculateArea_Sides_3_4_5_CorrectAnswer()
    {
        // Arrange
        Triangle triangle = new( 3, 4, 5 );

        // Act
        double area = triangle.CalculateArea();

        // Assert
        Assert.That( area, Is.EqualTo( 6 ) );
    }

    [Test]
    public void Triangle_CalculatePerimeter_Sides_3_4_5_CorrectAnswer()
    {
        // Arrange
        Triangle triangle = new( 3, 4, 5 );

        // Act
        double perimeter = triangle.CalculatePerimeter();

        // Assert
        Assert.That( perimeter, Is.EqualTo( 12 ) );
    }
}
