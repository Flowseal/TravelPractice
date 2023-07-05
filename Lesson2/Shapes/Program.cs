using Shapes;

Triangle triangle = new( 3, 4, 5 );
Square square = new( 5 );
Circle circle = new( 2 );

List<IShape> shapes = new()
{
    triangle, square, circle
};

shapes.ForEach( shape => Console.WriteLine( $"{shape}: Area={shape.CalculateArea()} Perimeter={shape.CalculatePerimeter()}" ) );