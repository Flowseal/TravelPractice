namespace Shapes;

public class Triangle : IShape
{
    private double _side1, _side2, _side3;
    public double Side1
    {
        get => _side1;
        private set
        {
            ValidateSide( value );
            _side1 = value;
        }
    }
    public double Side2
    {
        get => _side2;
        private set
        {
            ValidateSide( value );
            _side2 = value;
        }
    }
    public double Side3
    {
        get => _side3;
        private set
        {
            ValidateSide( value );
            _side3 = value;
        }
    }

    public Triangle( double side1, double side2, double side3 )
    {
        Side1 = side1;
        Side2 = side2;
        Side3 = side3;

        if ( Side1 >= Side2 + Side3
            || Side2 >= Side1 + Side3
            || Side3 >= Side1 + Side2 )
        {
            throw new ArgumentException( "Triangle with such sides does not exist" );
        }
    }

    public double CalculateArea()
    {
        double halfPm = CalculatePerimeter() / 2;
        return Math.Sqrt( halfPm * ( halfPm - Side1 ) * ( halfPm - Side2 ) * ( halfPm - Side3 ) );
    }

    public double CalculatePerimeter()
    {
        return Side1 + Side2 + Side3;
    }

    private void ValidateSide( double side )
    {
        if ( side < 0 )
            throw new ArgumentOutOfRangeException( "Side can't be negative" );
    }
}