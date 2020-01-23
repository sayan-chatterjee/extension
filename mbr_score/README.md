# MBR Annual Score and Goal Rating Calculator

1.	For integration of auto-calculation we need to check below logic;
    a.	Whether Target for rating “4” is defined or not
    b.	If target is increasing or decreasing
        Note :
        Increasing = If (outstanding – budget) = Positive(+)
        Decreasing= if (outstanding – budget) = Negative (-)
    c.	Function identification
    
2.	Calculation
    a.	In case of only Budget and Outstanding template
        i.	Increasing:
            -	If Budget is 5 and outstanding is 10 then rating will be as below
            -	Achievement below 5 - Rating = 0
            -	Achievement is 5 - Rating = 1
            -	Achievement is 10 - Rating = 3
            -	Achievement is above 10 - Rating = 4
            -	Achievement in between 5 - 10 then the calculation will be:
                Rating = 1 + 2 (Actual – Budget / Outstanding – Budget)
        ii.	Decreasing:
            -	If Budget is 10 and outstanding is 5 then rating will be as below
            -	Achievement above 10 - Rating = 0
            -	Achievement is 10 - Rating = 1
            -	Achievement is 5 - Rating = 3
            -	Achievement is below 5 - Rating = 4
            -	Achievement in between 5 - 10 then the calculation will be:
                Rating = 1 + 2 (Actual – Budget / Outstanding – Budget)


    b.	In case of Budget, Outstanding and Target of rating “4” template
        i.	Increasing:
        -	If Budget is 5 and outstanding is 10 and Target defined for Rating of “4” is 15 then rating will be as below
        -	Achievement below 5 - Rating = 0
        -	Achievement is 5 - Rating = 1
        -	Achievement is 10 - Rating = 3
        -	Achievement is equal to or above 15 - Rating = 4
        -	Achievement in between 5 - 10 then the calculation will be:
            Rating = 1 + 2 (Actual – Budget / Outstanding – Budget)
        -	Achievement is between 10 and 15 (Target for rating “4”) then the calculation will be
            Rating = 3 + (Actual – Outstanding / Target for rating “4” – Outstanding)
    ii.	Decreasing:
        -	If Budget is 10 and outstanding is 5 and Target defined for Rating of “4” is 2 then rating will be as below
        -	Achievement above 10 - Rating = 0
        -	Achievement is 10 - Rating  =1
        -	Achievement is 5 - Rating = 3
        -	Achievement is below or equal to  2 - Rating = 4
        -	Achievement in between 5 - 10 then the calculation will be:
            Rating = 1 + 2 (Actual – Budget / Outstanding – Budget)
        -	Achievement is between 5 and 2(Target for rating “4”) then the calculation will be
        	Rating = 3 + (Actual – Outstanding / Target for rating “4” – Outstanding)

3.	MBR Annual Overall Score - The overall score depends on the weightage of the goals. For instance, if the Goal 1 has a weightage of 40% and a rating of 3 while Goal 2 has a weightage of 60% and a rating of 4 then the calculation will be as below;
    a.	Overall Score = (3 * 40%) + (4 * 60%) = 3.6
