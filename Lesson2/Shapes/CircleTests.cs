using NUnit.Framework;
namespace Shapes.Tests;

[TestFixture]
public class CircleTests
{
    [Test]
    public void Circle_Constructor_NegativeRadius_ThrowException()
    {
        Assert.That( () => new Circle( -1 ), Throws.TypeOf<ArgumentOutOfRangeException>() );
    }

    [Test]
    public void Circle_CalculateArea_Radius3_CorrectAnswer()
    {
        // Arrange
        Circle circle = new( 3 );

        // Act
        double area = circle.CalculateArea();

        // Assert
        Assert.That( area, Is.EqualTo( 28.2743 ).Within( 0.0001 ) );
    }

    [Test]
    public void Circle_CalculatePerimeter_Radius3_CorrectAnswer()
    {
        // Arrange
        Circle circle = new( 3 );

        // Act
        double perimeter = circle.CalculatePerimeter();

        // Assert 
        Assert.That( perimeter, Is.EqualTo( 18.8495 ).Within( 0.0001 ) );
    }
}
