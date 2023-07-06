namespace Shapes;

public class Square : IShape
{
    private double _size;
    public double Size
    {
        get => _size;
        set
        {
            if ( value < 0 )
                throw new ArgumentOutOfRangeException( "Size can't be negative" );

            _size = value;
        }
    }

    public Square( double size )
    {
        Size = size;
    }

    public double CalculateArea()
    {
        return Math.Pow(Size, 2);
    }

    public double CalculatePerimeter()
    {
        return Size * 4;
    }
}