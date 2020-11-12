let states = [
    // State @ t=1
    'xx.x.x.xDxx, xx.x.x.x.xx, xx.x.x.x.xx, xx.xBx.x.xx, xx.x.xCx.xx, xxAx.x.x.xx',
    // State @ t=2
    'xx.x.x.x.xx, xx.x.x.x.xx, xxAx.x.x.xx, xx.xBx.x.xx, xx.x.xCx.xx, xx.x.x.xDxx',
    // State @ t=3
    'xx.x.xCx.xx, xx.x.x.x.xx, xx.x.x.x.xx, xx.Ax.Bx.x.xx, xx.x.x.x.xx, xx.x.x.xDxx',
    // State @ t=4
    'xx.x.xCx.xx, xx.x.x.x.xx, xx.xBx.xDxx, xx.x.x.x.xx, xxAx.x.x.xx, xx.x.x.x.xx',
    // State @ t=5
    'xx.x.xCx.xx, xx.x.x.xDxx, xx.x.x.x.xx, xx.x.x.x.xx, xx.Ax.Bx.x.xx, xx.x.x.x.xx',
    // State @ t=6
    'xx.x.x.x.xx, xxAx.x.x.xx, xx.xBx.x.xx, xx.x.x.x.xx, xx.x.x.x.xx, xx.x.xCxDxx',
    // State @ t=7
    'xx.x.x.x.xx, xx.x.xCx.xx, xxAx.x.x.xx, xx.x.x.xDxx, xx.xBx.x.xx, xx.x.x.x.xx'
    ];
   
let newStates = [
    // State @ t=1
    'xx.x.x.xDx.xx, xx.x.x.x.x.xx, xx.x.x.x.x.Exx, xx.xBx.x.x.xx, xx.x.xCx.x.xx, xxAx.x.x.x.xx',
    // State @ t=2
    'xx.x.x.x.x.xx, xx.x.x.x.x.xx, xxAx.x.x.x.xx, xx.xBx.x.xExx, xx.x.xCx.x.xx, xx.x.x.xDx.xx',
    // State @ t=3
    'xx.x.xCx.x.xx, xx.x.x.x.x.xx, xx.x.x.x.x.xx, xxAxBx.x.x.xx, xx.x.x.x.xExx, xx.x.x.xDx.xx',
    // State @ t=4
    'xx.x.xCx.x.xx, xx.x.x.x.xExx, xx.xBx.xDx.xx, xx.x.x.x.x.xx, xxAx.x.x.x.xx, xx.x.x.x.x.xx',
    // State @ t=5
    'xx.x.xCx.x.xx, xx.x.x.xDx.xx, xx.x.x.x.x.xx, xx.x.x.x.x.xx, xxAxBx.x.x.xx, xx.x.x.x.xExx',
    // State @ t=6
    'xx.x.x.x.x.xx, xxAx.x.x.x.xx, xx.xBx.x.x.xx, xx.x.x.x.x.xx, xx.x.x.x.x.xx, xx.x.xCxDxExx',
    // State @ t=7
    'xx.x.x.x.xExx, xx.x.xCx.x.xx, xxAx.x.x.x.xx, xx.x.x.xDx.xx, xx.xBx.x.x.xx, xx.x.x.x.x.xx'
    ]

// Primary function call
function findElevatorPath(elevatorStates,startingElevator,finalDestination) {
    // Trimming the data to get a simplified list format
    const b = 'x.\n'
    let i = 0
    if (elevatorStates[i] !== states) {
        while (i < elevatorStates.length) {
            for (let char = 0; char < b.length; char++) {
                elevatorStates[i] = elevatorStates[i].replace(char," ")
            elevatorStates[i] = elevatorStates[i].split(" ")
            i+=1

            console.log(elevatorStates)
            // Displays the trimmed data
            }
        }
    }
    

    // Calculates the top floor of the "building"
    function top(stateTime) {
        topFloor = 0
        for (let str = 0; str < elevatorStates[0].length; str++)
            topFloor+=1
        return topFloor
    }

    // Takes in a state at t=n and an elevator string to find
    // the floor index of the elevator
    function floor(stateTime,elevatorStr) {
        i = 0
        for (let str =0; str < stateTime.length; str++)
            if (str.find(elevatorStr) > -1) {
                return i
                i+=1
            } 
    }
    // Instantiating initial variables for the function
    starting = startingElevator
    final = finalDestination
    finalTimeInd = int(final[2])-1
    finalFloorInd = top(elevatorStates[0]) - int(final[0])
    finalPos = (finalTimeInd,finalFloorInd)

    // Takes in a state at t=n and a floor index to find the
    // elevators currently on the floor
    function elevators(stateTime, floorIndex) {
        elevators = []
        for (let str = 0; str < stateTime[floorIndex];) {
            match = re.findall(r`[A-Z]`,str)
            elevators += match
        }
        return elevators
    }
    // Creating the initial root directory and populating it with the t = 0 values, global variable instantiation not ideal
    root = Node("root")
    function newNodes(stateTime) {
        time = 0
        for (let str = 0; str < stateTime;) {
            if (str != "") {
                globals()[str+time.__str__()] = Node(stateTime[floor(stateTime,str)],parent=root,pos = (time,floor(stateTime,str)))
                
                 // This line of code instantiates new global variables in the form of "A0" (elevator+time)
                // The Node created has a parent attribute of the root directory and a position attribute
            }
        }
    }
    newNodes(elevatorStates[0])

    // Populates the nodes based on the states input, once again global variables not ideal (hacker-fix)
    function addNodes(state,time) {
        for (let str = 0; str < state[time];) {
            // If statement for floor with only one elevator
            if (str != "" && len(str) == 1) {
                    globals()[str+time.__str__()] =  Node(state[time][floor(state[time],str)],parent=globals()[str+(time-1).__str__()],pos = (time,floor(state[time],str)))
            // If statement for floor with 2+ elevators
            }else if (str != "" && len(str) > 1) {
                    elevator = elevators(elevatorStates[time],floor(elevatorStates[time],str))
                    console.log(elevator)
                    for (let i = 0; i < elevator;) {
                            // Random number generation to iterate through all possible paths of the tree, kills performance but increases precision
                            x = random.uniform(0,len(elevator)).__int__()
                            globals()[i+time.__str__()] =  Node(i,parent=globals()[str[x]+(time-1).__str__()],pos = (time,floor(state[time],i)))
                    }
                        }                }
    }
    function printResult(attempts) {
    i = 0
    path = ""
    while (i < attempts) {
        // Populates the nodes into the tree data structure
        time = 1
        }
        while (time < len(elevatorStates)) {
            // If statements are due to overwrite of node variables (e.g. A2) depending on the string
            // index of the elevators on floors with 2+ elevators, probably will not scale well with additional elevator shafts
            addNodes(elevatorStates,time)
            time+=1
        }
        // Renders the tree for easier readability
            console.log(RenderTree(root))
        result = anytree.search.findall_by_attr(root, finalPos, "pos")
         console.log("result = ", result)
        if (result != result()) {
            for (let i = 0; i < result.length;) {
                match = re.findall(r`/[A-Z]`,result[i].__str__())
                console.log("match = ", match)
                }
            }
            x=""
            for (let str = 0; i < match; i++) {
                x += str[1]
            }
            if (starting == x[0]) {
                console.log(x)
                path = x
        i+=1
        }
    if (path != "") {
        console.log(path)
        console.log(RenderTree(root))
    } else if (path == "") {
        console.log("Path not found, please run script again if you believe this to be incorrect")
}
    }
//Arbitrary number passed into the function, higher number means more iterations, higher likelihood of retrieving the path
printResult(425)

}

findElevatorPath(states,"A","5-5") //Expected = AABDD
findElevatorPath(states,"B","6-5") //Expected = Path not found
findElevatorPath(states,"D","1-2") //Expected = DD
findElevatorPath(states,"C","3-7") //Added t = 7 case to test, Expected = CCCCCDD
findElevatorPath(newStates,"A","6-7") //Added new elevator shaft, E, Expected = AABDDEE
