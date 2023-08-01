﻿namespace Shapes;

public class Circle : IShape
{
    private double _radius;

    public double Radius
    {
        get => _radius;
        private set
        {
            if ( value < 0 )
                throw new ArgumentOutOfRangeException( "Radius can't be negative" );

            _radius = value;
        }
    }

    public Circle( double radius )
    {
        Radius = radius;
    }

    public double CalculateArea()
    {
        return Math.PI * Math.Pow(Radius, 2);
    }

    public double CalculatePerimeter()
    {
        return 2 * Math.PI * Radius;
    }
}