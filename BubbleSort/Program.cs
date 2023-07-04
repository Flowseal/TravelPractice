void BubbleSort<T>( List<T> list ) where T : IComparable<T>
{
    for ( int i = 0; i < list.Count - 1; i++ )
    {
        for ( int j = 0; j < list.Count - i - 1; j++ )
        {
            if ( list[ j ].CompareTo( list[ j + 1 ] ) > 0 )
            {
                T tempElement = list[ j ];
                list[ j ] = list[ j + 1 ];
                list[ j + 1 ] = tempElement;
            }
        }
    }
}

List<int> listOfIntegers = new()
{
    15,
    3,
    1,
    5,
    22,
    7
};

BubbleSort( listOfIntegers );
Console.WriteLine( "Sorted list of integers:" );
listOfIntegers.ForEach( num => Console.WriteLine( num ) );

List<char> listOfChars = new()
{
    'a',
    'c',
    'b',
    'd',
    'j',
    'e'
};

BubbleSort( listOfChars );
Console.WriteLine( "\nSorted list of chars:" );
listOfChars.ForEach( ch => Console.WriteLine( ch ) );
