with open('data.txt') as f:
    lines = f.readlines()


# print(lines[0])

currMax = 0
currSum = 0



# Only need total calories (rn), not elf ID or anything
for line in lines:
    # if at a number (calories), add to currSum

    if not line.isspace(): 
        currSum += int(line)

    # if at a empty space or end, we're done with 1 elf
    # compare currSum to currMax, if >, then update max
    # regardless, reset currSum to 0 before moving on

    else:
        if currSum > currMax:
            currMax = currSum
        
        currSum = 0

# might not have empty line at end of file, could be an elf done
if currSum > currMax:
    currMax = currSum

print(currMax)

