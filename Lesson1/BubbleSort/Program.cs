List<T> BubbleSort<T>( List<T> list ) where T : IComparable<T>
{
    List<T> sortedList = new( list );

    for ( int i = 0; i < sortedList.Count - 1; i++ )
    {
        for ( int j = 0; j < sortedList.Count - i - 1; j++ )
        {
            if ( sortedList[ j ].CompareTo( sortedList[ j + 1 ] ) > 0 )
            {
                T tempElement = sortedList[ j ];
                sortedList[ j ] = sortedList[ j + 1 ];
                sortedList[ j + 1 ] = tempElement;
            }
        }
    }

    return sortedList;
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

List<int> sortedListOfIntegers = BubbleSort( listOfIntegers );
Console.WriteLine( "Sorted list of integers:" );
Console.WriteLine( string.Join( " ", sortedListOfIntegers ) );

List<char> listOfChars = new()
{
    'a',
    'c',
    'b',
    'd',
    'j',
    'e'
};

List<char> sortedListOfChars = BubbleSort( listOfChars );
Console.WriteLine( "Sorted list of chars:" );
Console.WriteLine( string.Join( " ", sortedListOfChars ) );
