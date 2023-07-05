using NUnit.Framework;
namespace Shapes.Tests;

[TestFixture]
public class CircleTests
{
    [Test]
    public void Circle_CalculateArea_Radius3_CorrectAnswer()
    {
        //Arrange
        Circle circle = new( 3 );

        //Act
        double area = circle.CalculateArea();

        //Assert
        Assert.AreEqual( 28.2743, area, 0.0001 );
    }

    [Test]
    public void Circle_CalculatePerimeter_Radius3_CorrectAnswer()
    {
        //Arrange
        Circle circle = new( 3 );

        //Act
        double perimeter = circle.CalculatePerimeter();

        //Assert 
        Assert.AreEqual( 18.8495, perimeter, 0.0001 );
    }
}
