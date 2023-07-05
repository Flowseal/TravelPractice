using NUnit.Framework;
namespace Shapes.Tests;

[TestFixture]
public class TriangleTests
{
    [Test]
    public void Triangle_CalculateArea_Sides_3_4_5_CorrectAnswer()
    {
        //Arrange
        Triangle triangle = new( 3, 4, 5 );

        //Act
        double area = triangle.CalculateArea();

        //Assert
        Assert.That( area, Is.EqualTo( 6 ) );
    }

    [Test]
    public void Triangle_CalculatePerimeter_Sides_3_4_5_CorrectAnswer()
    {
        //Arrange
        Triangle triangle = new( 3, 4, 5 );

        //Act
        double perimeter = triangle.CalculatePerimeter();

        //Assert
        Assert.That( perimeter, Is.EqualTo( 12 ) );
    }
}
